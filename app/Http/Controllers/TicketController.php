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
        $tickets = Ticket::All();

        return Inertia::render('Tickets/Tickets', [
            'tickets' => $tickets,
            'show_data' => 'list'            
        ]);
    } // index
}
