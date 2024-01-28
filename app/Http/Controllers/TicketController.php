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
use App\Models\Ticket;
use App\Models\Customer;
use App\Models\Ticket_issue;
use App\Models\User;
use App\Models\Ticket_remark;
use App\Models\User_group;
use Config;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $user_has_groups_idArr = $this->getLoggedInUserGroup();
        $count_user_groups = User_group::count();

        if ($request->hasAny(['user_id', 'display_name', 'topic', 'ticket_status', 'level_of_importance', 'ticket_number', 'search_value'])) {
            $data = $request->all();
            $tickets_query = Ticket::join('customers', 'customers.id', '=', 'tickets.user_id')
                ->leftjoin('ticket_remarks', 'ticket_remarks.ticket_id', '=', 'tickets.id')
                ->when(request('user_id') != '', function ($q) {
                    return $q->where('tickets.user_id', request('user_id'));
                })->when(request('display_name') != '', function ($q) {
                    return $q->orWhere('tickets.user_id', request('display_name'));
                })->when(request('topic') != '', function ($q) {
                    return $q->where('tickets.topic', request('topic'));
                })->when(request('ticket_status') != '', function ($q) {
                    return $q->where('tickets.ticket_status', request('ticket_status'));
                })->when(request('level_of_importance') != '', function ($q) {
                    return $q->where('tickets.level_of_importance', request('level_of_importance'));
                })->when(request('ticket_number') != '', function ($q) {
                    return $q->where('tickets.ticket_number', request('ticket_number'));
                })->when(request('search_value') != '', function ($q) {
                    return $q->where('tickets.ticket_number', 'LIKE', request('search_value') . '%')
                        ->orWhere('tickets.title', 'LIKE', request('search_value') . '%')
                        ->orWhere('ticket_remarks.remarks', 'LIKE', request('search_value') . '%');
                });
            // ->whereNull('customers.user_group_id')

            $show_data = 'filter_list';
        } else {
            $tickets_query = Ticket::join('customers', 'customers.id', '=', 'tickets.user_id');
            // ->whereNull('customers.user_group_id')
            $show_data = 'list';
        }

        if (count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)) {
            $tickets = $tickets_query->orderBy('tickets.id', 'DESC')->groupBy('tickets.id')
                ->get(['tickets.*', 'customers.customer_user_id', 'customers.display_name', 'customers.user_group_id']);
            $filter_customers = Customer::all();
        } else {
            $tickets = $tickets_query->orWhereIn('customers.user_group_id', $user_has_groups_idArr)
                ->orderBy('tickets.id', 'DESC')->groupBy('tickets.id')
                ->get(['tickets.*', 'customers.customer_user_id', 'customers.display_name', 'customers.user_group_id']);
            $filter_customers = Customer::whereIn('customers.user_group_id', $user_has_groups_idArr)
                ->get();
        }

        return Inertia::render('Tickets/Tickets', [
            'tickets' =>  $tickets,
            'users'   => User::all(),
            'customers' => Customer::all(),
            'filter_customers' => $filter_customers,
            'remarks'   => Ticket_remark::all(),
            'user_groups' => User_group::all(),
            'issues' => Ticket_issue::all(),
            'show_data' => $show_data
        ])->with([
            'ticket_source'        => config('constants.ticket_source'), //Config::get('constants.ticket_source'),
            'topic'                => config('constants.topic'),
            'level_of_importance'  => config('constants.level_of_importance')
        ]);
    } // index

    public function tickets_by_user($user_id)
    {
        $user_has_groups_idArr = $this->getLoggedInUserGroup();
        $count_user_groups = User_group::count();

        $tickets_query = Ticket::join('customers', 'customers.id', '=', 'tickets.user_id');
        $show_data = 'list';

        if (count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)) {
            $tickets = $tickets_query->where('tickets.user_id', $user_id)
                ->get(['tickets.*', 'customers.customer_user_id', 'customers.display_name', 'customers.user_group_id']);
            $filter_customers = Customer::all();
        } else {
            $tickets = $tickets_query->orWhereIn('customers.user_group_id', $user_has_groups_idArr)
                ->get(['tickets.*', 'customers.customer_user_id', 'customers.display_name', 'customers.user_group_id']);
            $filter_customers = Customer::whereIn('customers.user_group_id', $user_has_groups_idArr)
                ->get();
        }

        return Inertia::render('Tickets/Tickets', [
            'tickets' =>  $tickets,
            'users'   => User::all(),
            'customers' => Customer::all(),
            'filter_customers' => $filter_customers,
            'remarks'   => Ticket_remark::all(),
            'user_groups' => User_group::all(),
            'issues' => Ticket_issue::all(),
            'show_data' => $show_data
        ])->with([
            'topic'                => config('constants.topic'),
            'level_of_importance'  => config('constants.level_of_importance')
        ]);
    } // tickets_by_user

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

        return Inertia::render('Tickets/Tickets', [
            'show_data'  => 'add_form',
            'customers' => $customers,
            'issues' => Ticket_issue::all(),
            'user_index' => '',
            'apitoken' => $token,
        ]);
    } // create

    public function create_ticket_by_user($cus_id)
    {
        $token = $this->getSavedToken();
        $user_has_groups_idArr = $this->getLoggedInUserGroup();
        $count_user_groups = User_group::count();

        if (count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)) {
            $customers = Customer::where('id', $cus_id)->get();
        } else {
            $customers = Customer::whereIn('customers.user_group_id', $user_has_groups_idArr)->where('id', $cus_id)->get();
        }

        return Inertia::render('Tickets/Tickets', [
            'show_data'  => 'add_form',
            'customers' => $customers,
            'issues' => Ticket_issue::all(),
            'customer_id' => $cus_id,
            'apitoken' => $token,
        ]);
    } // create_ticket_by_user

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

        $ticket_number =  'TKN' . mt_rand(1000, 9999);

        Ticket::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'topic' => $request->topic,
            'level_of_importance' => $request->level_of_importance,
            'ticket_number' => $ticket_number,
            'attach_file' => $fileName,
            'description' => $request->description,
            'issue_id' => $request->issue_id,
        ]);
        return redirect()->route('tickets')->with('status', 201);
    } // store

    public function edit($id)
    {
        $token = $this->getSavedToken();

        // dd(Ticket_remark::where('ticket_id', $id)->get());

        return Inertia::render('Tickets/Tickets', [
            'show_data'  => 'edit_form',
            'ticket' => Ticket::findOrFail($id),
            'customers' => Customer::all(),
            'users' => User::all(),
            'updated_by_loggedin_user' => Auth::id(),
            'remarks' => Ticket_remark::where('ticket_id', $id)->get(),
            'issues' => Ticket_issue::all(),
        ]);
    } // edit

    public function update(UpdateTicketRequest $request, $id)
    {
        $input = $request->all();
        // return response(compact('input'));  
        $data = $request->validated();
        $ticket = Ticket::findOrFail($id);

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

        return redirect()->route('tickets')->with('status', 200);
    } // update
    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
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
        return redirect()->route('tickets')->with('status', 204);
    } // destroy   

    public function destroy_attachFile(Request $request, $id)
    {
        // $input = $request->all();
        $delete_fileName = $request->attachfile_name;

        $ticket = Ticket::findOrFail($id);
        if ($ticket->attach_file) {
            $update_attach_file = '';
            if (Str::contains($ticket->attach_file, ',')) {
                $exp_file = explode(',', $ticket->attach_file);
                $update_attach_file = '';
                for ($i = 0; $i < count($exp_file); $i++) {
                    $exp_file_length = count($exp_file);
                    if ($exp_file[$i] == $delete_fileName) {
                        if (file_exists(public_path('uploads/others/' . $exp_file[$i]))) {
                            unlink(public_path('uploads/others/' . $exp_file[$i]));
                        }
                        $exp_file_length -= 1;
                    } else {
                        if ($i < $exp_file_length) {
                            $update_attach_file .= $exp_file[$i] . ',';
                        } else {
                            $update_attach_file .= $exp_file[$i];
                        }
                    }
                }
            } else {
                if (file_exists(public_path('uploads/others/' . $ticket->attach_file))) {
                    unlink(public_path('uploads/others/' . $ticket->attach_file));
                }
                $update_attach_file = '';
            }

            $ticket->update([
                'attach_file' => $update_attach_file,
            ]);
        }

        return redirect()->route('tickets')->with('message', 'Attached file deleted successfully.');
    } // destroy_attachFile

    public function store_remark(Request $request)
    {
        $input = $request->all();
        // return response(compact('input'));
        // $ticket = Ticket_remark::create($data);
        if ($request->ticket_status) {
            $ticket = Ticket::findOrFail($request->ticket_id);
            $ticket->update([
                'ticket_status' => $request->ticket_status,
            ]);
        }

        $fileName = '';
        if ($request->hasFile('rm_attach_file')) {
            $fileName = time() . '_' . $request->rm_attach_file->getClientOriginalName();
            $request->rm_attach_file->move(public_path('uploads/others'), $fileName);
        }

        if ($request->remarks || $request->rm_attach_file) {
            Ticket_remark::insert([
                'ticket_id' => $request->ticket_id,
                'remarks'   => $request->remarks,
                'rm_attach_file' => $fileName,
                'remark_by' =>  Auth::id()
            ]);
        }

        return redirect()->route('tickets')->with('status', 201);
    } // store_remark

    public function update_remark(Request $request, $rmId)
    {
        $input = $request->all();
        // return response(compact('input'));  
        $ticket_remark = Ticket_remark::findOrFail($rmId);

        $ticket_remark->update([
            'remarks' => $request->remarks,
            'remark_by' =>  Auth::id()
        ]);

        return redirect()->back()->with('status', 200);
    } // update_remark

    public function destroy_remark($id)
    {
        Ticket_remark::findOrFail($id)->delete();
        return redirect()->route('tickets')->with('status', 204);
    } // destroy_remark   

    public function open($id)
    {
        $ticket = Ticket::findOrFail($id);

        $ticket->update([
            'ticket_status' => 0, // 0 => open, 1 => close
            'updated_by_loggedin_user' => Auth::id(),
        ]);

        return redirect()->back()->with('status', 200);
    } // open

    public function close($id)
    {
        $ticket = Ticket::findOrFail($id);

        $ticket->update([
            'ticket_status' => 1, // 0 => open, 1 => close
            'updated_by_loggedin_user' => Auth::id(),
        ]);

        return redirect()->back()->with('status', 200);
    } // close

}
