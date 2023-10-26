<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Ticket;
use App\Models\Customer;
use App\Http\Requests\StoreTicketRequest;
use Config;

class TicketController extends Controller
{
    public function index()
    {
        // $token = $this->getSessionToken();        
        // $headers = [
        //     'Authorization'=>'Bearer '.$token, 
        //     'Accept' => 'application/json'
        // ];
        // $post_data = [           
        //     "OrderBy" => 0,
        //     "OrderByDesc" => '',
        //     "IncludeReplies" => false,
        //     "StartIndex" => 0,
        //     "ItemCount" => 10
        // ];      

        // $ticketApiURL = 'https://rapi.earthlink.iq/api/reseller/ticket/all' ;      
        // $ticket_api_response = Http::withHeaders($headers)->post($ticketApiURL, $post_data);  
        // $ticket_api_data     = json_decode($ticket_api_response->getBody(), true); 
        // // return response(compact('ticket_api_data'));

        $tickets = Ticket::All();

        return Inertia::render('Tickets/Tickets', [
            'tickets' =>  $tickets, // $ticket_api_data['value']['itemsList']
            'show_data' => 'list'
        ])->with([
            'ticket_source'        => Config::get('constants.ticket_source'),
            'topic'                => Config::get('constants.topic'),
            'level_of_importance'  => Config::get('constants.level_of_importance')
        ]);
        
    } // index

    public function create() {
        $token = $this->getSessionToken();
        
        return Inertia::render('Tickets/Tickets', [
            'show_data'  => 'add_form',
            'customers' => Customer::all(),
            'apitoken' => $token,
        ]);
    } // create

    public function store(StoreTicketRequest $request) { 
        $token = $this->getSessionToken();       
        $data = $request->validated();        
        // return response(compact('data')); 
        $ticket = Ticket::create($data);
        return redirect()->route('tickets')->with('status', 201);   
    } // store

    public function edit($id) {
        $token = $this->getSessionToken();       
       
        return Inertia::render('Tickets/Tickets', [
            'show_data'  => 'edit_form',
            'ticket' => Ticket::findOrFail($id),
            'customers' => Customer::all()
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

}
