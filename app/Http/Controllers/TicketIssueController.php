<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Ticket_issue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketIssueController extends Controller
{
    public function index()
    {
        $issues = Ticket_issue::orderBy('id', 'DESC')->get();

        return Inertia::render('Ticketissues/Ticketissues', [
            'issues' => $issues,
            'show_data'   => 'list',
        ]);
    } // index

    public function create()
    {
        return Inertia::render('Ticketissues/Ticketissues', [
            'show_data'  => 'add_form',
        ]);
    } // create

    public function store(Request $request)
    {
        $request->validate([
            'issue_type' => 'required|string',
        ]);

        $issue = Ticket_issue::create([
            'issue_type' => $request->issue_type,
        ]);

        return redirect()->route('ticket.issues')->with('status', 201);
    } // store

    public function edit($id)
    {
        return Inertia::render('Ticketissues/Ticketissues', [
            'show_data'  => 'edit_form',
            'issue' => Ticket_issue::findOrFail($id),
        ]);
    } // edit

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $request->validate([
            'issue_type' => 'required|string',
        ]);
        $data = Ticket_issue::findOrFail($id);
        $data->update($input);

        return redirect()->route('ticket.issues')->with('status', 200);
    } // update

    public function destroy($id)
    {
        $ticket_used_issue = Ticket::where('issue_id', $id)->pluck('id');
        if (count($ticket_used_issue) > 0) {
            return redirect()->route('ticket.issues')->with('error_message', 'Data can\'t delete! That is used in ticket list.');
        } else {
            Ticket_issue::findOrFail($id)->delete();
            return redirect()->route('ticket.issues')->with('message', 'Data is successfully deleted!');
        }
    } // destroy
}
