<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Tower;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TowerController extends Controller
{
    public function index()
    {
        $towers = Tower::orderBy('id', 'DESC')->get();

        return Inertia::render('Towers/Towers', [
            'towers' => $towers,
            'show_data'   => 'list',
        ]);
    } // index

    public function create()
    {
        return Inertia::render('Towers/Towers', [
            'show_data'  => 'add_form',
        ]);
    } // create

    public function store(Request $request)
    {
        $request->validate([
            'tower_name' => 'required|string',
        ]);

        $tower = Tower::create([
            'tower_name' => $request->tower_name,
            'ip_address' => $request->ip_address,
            'rent_price' => $request->rent_price,
            'electric_price' => $request->electric_price,
            'line_price' => $request->line_price,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'owner_name' => $request->owner_name,
            'mobile_number' => $request->mobile_number,
            'mobile_number2' => $request->mobile_number2,
            'notes' => $request->notes
        ]);

        return redirect()->route('towers')->with('status', 201);
    } // store

    public function edit($id)
    {
        return Inertia::render('Towers/Towers', [
            'show_data'  => 'edit_form',
            'tower' => Tower::findOrFail($id),
        ]);
    } // edit

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $request->validate([
            'tower_name' => 'required|string',
        ]);
        $data = Tower::findOrFail($id);
        $data->update($input);

        return redirect()->route('towers')->with('status', 200);
    } // update

    public function destroy($id)
    {
        $customer_used_tower = Customer::where('tower_id', $id)->pluck('id');
        if (count($customer_used_tower) > 0) {
            return redirect()->route('towers')->with('error_message', 'Data can\'t delete! That is used in customer list.');
        } else {
            Tower::findOrFail($id)->delete();
            return redirect()->route('towers')->with('message', 'Data is successfully deleted!');
        }
    } // destroy
}
