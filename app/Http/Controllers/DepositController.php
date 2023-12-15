<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Deposit_pass;

class DepositController extends Controller
{
    public function get_deposit_password() {
        $all_data = Deposit_pass::all();
        if($all_data->count() > 0) {
            $id = $all_data[0]['id'];
            $data = Deposit_pass::findOrFail($id);
            $deposit_password = $data->deposit_password;
            $deposit_password_id = $data->id;
            return [
                'id'=> $deposit_password_id,
                'deposit_password' => $deposit_password
            ];
        }      
    } // get_deposit_password 

    public function change_deposit_password() {
        $token = $this->getSavedToken();
        $deposit_data = $this->get_deposit_password();
        return Inertia::render('Deposit/DepositForm', [            
            'apitoken' => $token,
            'deposit_password' => $deposit_data['deposit_password'],  
            'deposit_id' => $deposit_data['id'],
        ]);
        
    } // change_deposit_password

    public function update_deposit_password(Request $request, $id) 
    {       
        $input = $request->all();
		$data = Deposit_pass::findOrFail($id);
		$data->update($input);
        return redirect()->route('deposit')->with('message', 'Deposit password is successfully updated!');  
    }
}
