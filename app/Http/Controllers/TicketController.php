<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use App\Http\Requests\StoreTicketRequest;
use Inertia\Inertia;
use App\Models\Ticket;
use App\Models\Customer;
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

        if ($request->hasAny(['customer_user_id', 'ticket_source', 'topic', 'ticket_status', 'level_of_importance', 'ticket_number'])) {
            $data = $request->all();      
            $tickets_query = Ticket::join('customers', 'customers.id', '=', 'tickets.user_id')                 
                    ->when(request('user_id') != '', function ($q) {
                        return $q->where('tickets.user_id', request('user_id'));
                    })->when(request('ticket_source') != '', function ($q) {
                        return $q->where('tickets.ticket_source', request('ticket_source'));
                    })->when(request('topic') != '', function ($q) {
                        return $q->where('tickets.topic', request('topic'));
                    })->when(request('ticket_status') != '', function ($q) {
                        return $q->where('tickets.ticket_status', request('ticket_status'));
                    })->when(request('level_of_importance') != '', function ($q) {
                        return $q->where('tickets.level_of_importance', request('level_of_importance'));
                    })->when(request('ticket_number') != '', function ($q) {
                        return $q->where('tickets.ticket_number', request('ticket_number'));
                    });
                    // ->whereNull('customers.user_group_id')

            $show_data = 'filter_list';
        } else {
            $tickets_query = Ticket::join('customers', 'customers.id', '=', 'tickets.user_id');
                            // ->whereNull('customers.user_group_id')
            $show_data = 'list';
        }  
        
        if(count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)){
            $tickets = $tickets_query->get(['tickets.*', 'customers.customer_user_id']);            
            $filter_customers = Customer::all();
        } else {
            $tickets = $tickets_query->orWhereIn('customers.user_group_id', $user_has_groups_idArr)
                        ->get(['tickets.*', 'customers.customer_user_id']);
            $filter_customers = Customer::whereIn('customers.user_group_id', $user_has_groups_idArr)
                        ->get();
        }       

        return Inertia::render('Tickets/Tickets', [
            'tickets' =>  $tickets, 
            'users'   => User::all(),
            'customers' => Customer::all(),
            'filter_customers' => $filter_customers,
            'remarks'   => Ticket_remark::all(),
            'show_data' => $show_data
        ])->with([
            'ticket_source'        => config('constants.ticket_source'), //Config::get('constants.ticket_source'),
            'topic'                => config('constants.topic'),
            'level_of_importance'  => config('constants.level_of_importance')
        ]);
        
    } // index

    public function create() {
        $token = $this->getSavedToken();
        $user_has_groups_idArr = $this->getLoggedInUserGroup();
        $count_user_groups = User_group::count();

        if(count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)){
            $customers = Customer::all();            
        } else {
            $customers = Customer::whereIn('customers.user_group_id', $user_has_groups_idArr)
                        ->get();
        }
        
        return Inertia::render('Tickets/Tickets', [
            'show_data'  => 'add_form',
            'customers' => $customers,
            'apitoken' => $token,
        ]);
    } // create

    public function store(StoreTicketRequest $request) { 
        $token = $this->getSavedToken();       
        $data = $request->validated();      

        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'attach_file' => 'nullable|mimes:doc,docx,pdf,csv,xlx,xls|max:2048',
        ]);
        $imageFileName = '';
        if($request->hasFile('image')) {
            $imageFileName = time() . '_'. $request->image->getClientOriginalName(); 
            $request->image->move(public_path('uploads'), $imageFileName);
        }
        
        $attachFileName = '';
        if( $request->hasFile('attach_file') ) {
            $attachFileName = time() . '_'. $request->attach_file->getClientOriginalName(); 
            $request->image->move(public_path('uploads/others'), $attachFileName);
        }        

        // return response(compact('fileName')); 

        Ticket::create([
            'user_id' => $request->user_id,
            'ticket_source' => $request->ticket_source,             
            'topic'=> $request->topic,
            'ticket_address'=> $request->ticket_address,
            'level_of_importance'=> $request->level_of_importance,
            'ticket_number'=> $request->ticket_number,
            'image' => $imageFileName,
            'attach_file' => $attachFileName,
        ]);
        return redirect()->route('tickets')->with('status', 201);   
    } // store

    public function edit($id) {
        $token = $this->getSavedToken(); 
        
        return Inertia::render('Tickets/Tickets', [
            'show_data'  => 'edit_form',
            'ticket' => Ticket::findOrFail($id),
            'customers' => Customer::all(),
            'updated_by_loggedin_user' => Auth::id()
        ]);
    } // edit

    public function update(StoreTicketRequest $request, $id) 
    {
		$input = $request->all();
        // return response(compact('input'));  
        $data = $request->validated(); 
        $ticket = Ticket::findOrFail($id);        
		
        if($request->file('image')){            
            if(file_exists(public_path('uploads/'.$ticket->image))){                
                unlink(public_path('uploads/'.$ticket->image));
            } 
            $image = $request->file('image');
            $image_name = time() . '_'. $image->getClientOriginalName();
            $request->image->move(public_path('uploads'), $image_name);            
        } else {
            $image_name = $ticket->image;
        }
        $ticket->update([
            'user_id' => $request->user_id,
            'ticket_source' => $request->ticket_source,             
            'topic'=> $request->topic,
            'ticket_address'=> $request->ticket_address,
            'level_of_importance'=> $request->level_of_importance,
            'ticket_number'=> $request->ticket_number,
            'ticket_status' => $request->ticket_status,
            'updated_by_loggedin_user' => $request->updated_by_loggedin_user,
            'image' => $image_name
        ]);
		
        return redirect()->route('tickets')->with('status', 200); 
	} // update

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        if($ticket->image){
            if(file_exists(public_path('uploads/'.$ticket->image))){                
                unlink(public_path('uploads/'.$ticket->image));
            }                     
        } 
        // return response(compact('ticket'));
        $ticket->delete();
        return redirect()->route('tickets')->with('status', 204); 
    } // destroy

    public function store_remark(Request $request) { 
        $input = $request->all();     
        // return response(compact('input')); 
        // $ticket = Ticket_remark::create($data);
        Ticket_remark::insert([
            'ticket_id' => $request->ticket_id,
            'remarks'   => $request->remarks,
            'remark_by' =>  Auth::id()         
        ]); 
        return redirect()->route('tickets')->with('status', 201);   
    } // store_remark

    public function destroy_remark($id)
    {
        Ticket_remark::findOrFail($id)->delete();
        return redirect()->route('tickets')->with('status', 204); 
    } // destroy_remark   

}
