<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\Port;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortController extends Controller
{
    public function index()
    {
        $ports = Port::with('device')->orderBy('id', 'DESC')->get();
        return Inertia::render('Ports/Ports', [
            'ports' => $ports,
            'show_data'   => 'list',
        ]);
    } // index

    public function create()
    {
        return Inertia::render('Ports/Ports', [
            'devices' => Device::all(),
            'show_data'  => 'add_form',
        ]);
    } // create

    public function store(Request $request)
    {
        $request->validate([
            'device_id' => 'required',
            'port_name' => 'required|string',
        ]);

        $port = Port::create([
            'device_id' => $request->device_id,
            'port_name' => $request->port_name,
            'port_number' => $request->port_number,
            'port_type' => $request->port_type,
            'no_of_clients' => $request->no_of_clients,
            'notes' => $request->notes
        ]);

        return redirect()->route('ports')->with('status', 201);
    } // store

    public function edit($id)
    {
        return Inertia::render('Ports/Ports', [
            'show_data'  => 'edit_form',
            'port' => Port::findOrFail($id),
            'devices' => Device::all(),
        ]);
    } // edit

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $request->validate([
            'device_id' => 'required',
            'port_name' => 'required|string',
        ]);
        $data = Port::findOrFail($id);
        $data->update($input);

        return redirect()->route('ports')->with('status', 200);
    } // update
}
