<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTicketRequest;
use Inertia\Inertia;
use App\Models\Ticket;
use App\Models\Customer;
use App\Models\User;
use App\Models\Ticket_remark;
use Config;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        if ($request->hasAny(['customer_user_id', 'ticket_source', 'topic', 'ticket_status', 'level_of_importance', 'ticket_number'])) {
            $data = $request->all();      
            $tickets = Ticket::join('customers', 'customers.id', '=', 'tickets.user_id')                 
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
                    })->get(['tickets.*', 'customers.customer_user_id']);

            $show_data = 'filter_list';
        } else {
            $tickets = Ticket::join('customers', 'customers.id', '=', 'tickets.user_id')
              ->get(['tickets.*', 'customers.customer_user_id']);
            $show_data = 'list';
        }    

        return Inertia::render('Tickets/Tickets', [
            'tickets' =>  $tickets, 
            'users'   => User::all(),
            'customers' => Customer::all(),
            'remarks'   => Ticket_remark::all(),
            'show_data' => $show_data
        ])->with([
            'ticket_source'        => Config::get('constants.ticket_source'),
            'topic'                => Config::get('constants.topic'),
            'level_of_importance'  => Config::get('constants.level_of_importance')
        ]);
        
    } // index

    public function create() {
        $token = $this->getSavedToken();
        
        return Inertia::render('Tickets/Tickets', [
            'show_data'  => 'add_form',
            'customers' => Customer::all(),
            'apitoken' => $token,
        ]);
    } // create

    public function store(StoreTicketRequest $request) { 
        $token = $this->getSavedToken();       
        $data = $request->validated();        
        // return response(compact('data')); 
        $ticket = Ticket::create($data);
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

    public function update(Request $request, $id) 
    {
		$input = $request->all();
		$data = Ticket::findOrFail($id);
        // return response(compact('input'));  
		$data->update($input);
        return redirect()->route('tickets')->with('status', 200); 
	} // update

    public function destroy($id)
    {
        Ticket::findOrFail($id)->delete();
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
