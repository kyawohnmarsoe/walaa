<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Models\Apiusers; 
use Inertia\Inertia;

class ApiUserController extends Controller
{   
    public function change_api_user() {       
        // $password = Crypt::encrypt('@walaalink@');
        // Apiusers::insert([
        //     "username"   => "walaaim",
        //     "password"   => $password,
        //     "login_type"  => "1",
        //     "grant_type" => "password"           
        // ]); 
        // $decrypted_password = Crypt::decrypt($password);
        // return response(compact('decrypted_password')); 

        $api_user_data = $this->get_api_user();
        return Inertia::render('Apiuser/ApiUserEdit', [            
            'apiuser_data' => $api_user_data['apiuser_data'],
        ]);
        
    } // change_api_user

    public function update_api_user(Request $request, $id) 
    {    
        $input = $request->all();
        $data = Apiusers::findOrFail($id);        

        if($request->password == $data['password']) {
            $password = $data['password'];
        } else {
            $password = Crypt::encrypt($request->password);
        }        
        $new_data = [
            "username"   => $request->username,
            "password"   => $password,
        ];   
		$data->update($new_data);
        return redirect()->route('apiuser')->with('message', 'Api User is successfully updated!');  
    } // update_api_user
}
