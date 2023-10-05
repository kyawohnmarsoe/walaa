<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Ticket;

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
        ]);
        
    } // index
}
