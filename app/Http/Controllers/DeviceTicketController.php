<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use Inertia\Inertia;
use App\Models\Device_ticket;
use App\Models\Customer;
use App\Models\Ticket_issue;
use App\Models\User;
use App\Models\Devticket_remark;
use App\Models\User_group;
use Config;

class DeviceTicketController extends Controller
{
    public function index(Request $request)
    {
        $user_has_groups_idArr = $this->getLoggedInUserGroup();
        $count_user_groups = User_group::count();

        if ($request->hasAny(['topic', 'filter_ticket_status', 'search_value'])) {
            $data = $request->all();
            $tickets_query = Device_ticket::join('customers', 'customers.id', '=', 'device_tickets.user_id')
                ->leftjoin('devticket_remarks', 'devticket_remarks.devticket_id', '=', 'device_tickets.id')
                ->when(request('topic') != '', function ($q) {
                    return $q->where('device_tickets.topic', request('topic'));
                })->when(request('filter_ticket_status') != '', function ($q) {
                    return $q->where('device_tickets.ticket_status', request('filter_ticket_status'));
                })->when(request('search_value') != '', function ($q) {
                    return $q->where('device_tickets.ticket_number', 'LIKE', request('search_value') . '%')
                        ->orWhere('device_tickets.title', 'LIKE', request('search_value') . '%')
                        ->orWhere('devticket_remarks.remarks', 'LIKE', request('search_value') . '%');
                });

            $show_data = 'filter_list';
        } else {
            $tickets_query = Device_ticket::join('customers', 'customers.id', '=', 'device_tickets.user_id');
            $show_data = 'list';
        }

        if (count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)) {
            $tickets = $tickets_query->orderBy('device_tickets.id', 'DESC')->groupBy('device_tickets.id')
                ->get(['device_tickets.*', 'customers.customer_user_id', 'customers.display_name', 'customers.user_group_id']);
            $filter_customers = Customer::all();
        } else {
            $tickets = $tickets_query->orWhereIn('customers.user_group_id', $user_has_groups_idArr)
                ->orderBy('device_tickets.id', 'DESC')->groupBy('device_tickets.id')
                ->get(['device_tickets.*', 'customers.customer_user_id', 'customers.display_name', 'customers.user_group_id']);
            $filter_customers = Customer::whereIn('customers.user_group_id', $user_has_groups_idArr)
                ->get();
        }

        return Inertia::render('Devtickets/Tickets', [
            'tickets' =>  $tickets,
            'users'   => User::all(),
            'customers' => Customer::all(),
            'filter_customers' => $filter_customers,
            'remarks'   => Devticket_remark::all(),
            'user_groups' => User_group::all(),
            'issues' => Ticket_issue::all(),
            'show_data' => $show_data
        ])->with([
            'ticket_source'        => config('constants.ticket_source'), //Config::get('constants.ticket_source'),
            'topic'                => config('constants.topic'),
            'level_of_importance'  => config('constants.level_of_importance')
        ]);
    } // index

    public function create()
    {
        $token = $this->getSavedToken();
        $user_has_groups_idArr = $this->getLoggedInUserGroup();
        $count_user_groups = User_group::count();

        if (count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)) {
            $customers = Customer::all();
        } else {
            $customers = Customer::whereIn('customers.user_group_id', $user_has_groups_idArr)
                ->get();
        }

        return Inertia::render('Devtickets/Tickets', [
            'show_data'  => 'add_form',
            'customers' => $customers,
            'issues' => Ticket_issue::all(),
            'user_index' => '',
            'apitoken' => $token,
        ]);
    } // create

    public function store(StoreTicketRequest $request)
    {
        $token = $this->getSavedToken();
        $data = $request->validated();

        $attachFileName = [];
        if ($request->hasFile('attach_file')) {
            foreach ($request->attach_file as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file_path = $file->move(public_path('uploads/others'), $fileName);

                array_push($attachFileName, $fileName);
            }
        }

        $fileName = '';
        if ($attachFileName) {
            for ($i = 0; $i < count($attachFileName); $i++) {
                if ($i < count($attachFileName) - 1) {
                    $fileName .= $attachFileName[$i] . ',';
                } else {
                    $fileName .= $attachFileName[$i];
                }
            }
        }

        $ticket_number =  'DTKN' . mt_rand(1000, 9999);

        Device_ticket::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'topic' => $request->topic,
            'level_of_importance' => $request->level_of_importance,
            'ticket_number' => $ticket_number,
            'attach_file' => $fileName,
            'description' => $request->description,
            'issue_id' => $request->issue_id,
        ]);
        return redirect()->route('device.tickets')->with('status', 201);
    } // store

    public function store_remark(Request $request)
    {
        $input = $request->all();

        // if ($request->ticket_status) {
        $ticket = Device_ticket::findOrFail($request->ticket_id);
        $ticket->update([
            'ticket_status' => $request->ticket_status,
        ]);
        // }

        $fileName = '';
        if ($request->hasFile('rm_attach_file')) {
            $fileName = time() . '_' . $request->rm_attach_file->getClientOriginalName();
            $request->rm_attach_file->move(public_path('uploads/others'), $fileName);
        }

        if ($request->remarks || $request->rm_attach_file) {
            Devticket_remark::insert([
                'devticket_id' => $request->ticket_id,
                'remarks'   => $request->remarks,
                'rm_attach_file' => $fileName,
                'remark_by' =>  Auth::id()
            ]);
        }

        return redirect()->route('device.tickets')->with('status', 201);
    } // store_remark

    public function destroy_remark($id)
    {
        Devticket_remark::findOrFail($id)->delete();
        return redirect()->route('device.tickets')->with('status', 204);
    } // destroy_remark  

    public function edit($id)
    {
        $token = $this->getSavedToken();
        return Inertia::render('Devtickets/Tickets', [
            'show_data'  => 'edit_form',
            'ticket' => Device_ticket::findOrFail($id),
            'customers' => Customer::all(),
            'users' => User::all(),
            'updated_by_loggedin_user' => Auth::id(),
            'remarks' => Devticket_remark::where('devticket_id', $id)->get(),
            'issues' => Ticket_issue::all(),
        ]);
    } // edit

    public function update(UpdateTicketRequest $request, $id)
    {
        $input = $request->all();
        // return response(compact('input'));  
        $data = $request->validated();
        $ticket = Device_ticket::findOrFail($id);

        if ($request->hasFile('attach_file')) {
            $request->validate([
                // 'attach_file' => 'nullable|mimes:doc,docx,pdf,csv,xlsx,xls|max:2048',
            ]);
        }

        if ($request->file('attach_file')) {

            $attachFileName = [];
            if ($request->hasFile('attach_file')) {
                foreach ($request->attach_file as $file) {
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $file_path = $file->move(public_path('uploads/others'), $fileName);

                    array_push($attachFileName, $fileName);
                }
            }

            $attach_file_name = $ticket->attach_file . ',';
            if ($attachFileName) {
                for ($i = 0; $i < count($attachFileName); $i++) {
                    if ($i < count($attachFileName) - 1) {
                        $attach_file_name .= $attachFileName[$i] . ',';
                    } else {
                        $attach_file_name .= $attachFileName[$i];
                    }
                }
            }
        } else {
            $attach_file_name = $ticket->attach_file;
        }

        $ticket->update([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'topic' => $request->topic,
            'level_of_importance' => $request->level_of_importance,
            'ticket_status' => $request->ticket_status,
            'updated_by_loggedin_user' => $request->updated_by_loggedin_user,
            'attach_file' => $attach_file_name,
            'description' => $request->description,
            'issue_id' => $request->issue_id
        ]);

        return redirect()->route('device.tickets')->with('status', 200);
    } // update

    public function update_remark(Request $request, $rmId)
    {
        $input = $request->all();
        // return response(compact('input'));  
        $ticket_remark = Device_ticket::findOrFail($rmId);

        $ticket_remark->update([
            'remarks' => $request->remarks,
            'remark_by' =>  Auth::id()
        ]);

        return redirect()->back()->with('status', 200);
    } // update_remark

    public function open($id)
    {
        $ticket = Device_ticket::findOrFail($id);

        $ticket->update([
            'ticket_status' => 0, // 0 => open, 1 => close
            'updated_by_loggedin_user' => Auth::id(),
        ]);

        return redirect()->back()->with('status', 200);
    } // open

    public function close($id)
    {
        $ticket = Device_ticket::findOrFail($id);

        $ticket->update([
            'ticket_status' => 1, // 0 => open, 1 => close
            'updated_by_loggedin_user' => Auth::id(),
        ]);

        return redirect()->back()->with('status', 200);
    } // close

    public function destroy($id)
    {
        $ticket = Device_ticket::findOrFail($id);
        if ($ticket->image) {
            if (file_exists(public_path('uploads/' . $ticket->image))) {
                unlink(public_path('uploads/' . $ticket->image));
            }
        }

        if ($ticket->attach_file) {
            if (Str::contains($ticket->attach_file, ',')) {
                $exp_file = explode(',', $ticket->attach_file);
                for ($i = 0; $i < count($exp_file); $i++) {
                    if (file_exists(public_path('uploads/others/' . $exp_file[$i]))) {
                        unlink(public_path('uploads/others/' . $exp_file[$i]));
                    }
                }
            } else {
                if (file_exists(public_path('uploads/others/' . $ticket->attach_file))) {
                    unlink(public_path('uploads/others/' . $ticket->attach_file));
                }
            }
        }
        // return response(compact('ticket'));
        $ticket->delete();
        return redirect()->route('device.tickets')->with('status', 204);
    } // destroy  
}
