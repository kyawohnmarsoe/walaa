<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\Tower;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index()
    {
        $devices = Device::with('tower')->orderBy('id', 'DESC')->get();
        return Inertia::render('Devices/Devices', [
            'devices' => $devices,
            'show_data'   => 'list',
        ]);
    } // index

    public function create()
    {
        return Inertia::render('Devices/Devices', [
            'towers' => Tower::all(),
            'show_data'  => 'add_form',
        ]);
    } // create

    public function store(Request $request)
    {
        $request->validate([
            'tower_id' => 'required',
            'device_name' => 'required|string',
        ]);

        $device = Device::create([
            'tower_id' => $request->tower_id,
            'device_name' => $request->device_name,
            'device_type' => $request->device_type,
            'ip_address' => $request->ip_address,
            'device_model' => $request->device_model,
            'no_of_ports' => $request->no_of_ports,
            'notes' => $request->notes
        ]);

        return redirect()->route('devices')->with('status', 201);
    } // store

    public function edit($id)
    {
        return Inertia::render('Devices/Devices', [
            'show_data'  => 'edit_form',
            'device' => Device::findOrFail($id),
            'towers' => Tower::all(),
        ]);
    } // edit

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $request->validate([
            'tower_id' => 'required',
            'device_name' => 'required|string',
        ]);
        $data = Device::findOrFail($id);
        $data->update($input);

        return redirect()->route('devices')->with('status', 200);
    } // update

}
