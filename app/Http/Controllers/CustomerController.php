<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Affiliate;
use App\Models\Account;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('Customers/Customers', [
            'customers' => Customer::all(),
            'show_data' => 'list'            
        ]);
    } // index

    public function create() {
        $token = $this->getSessionToken();
        // $session_data = json_encode($token, true);
       
        return Inertia::render('Customers/Customers', [
            'show_data'  => 'add_form',
            'accounts' => Account::all(),
            'affiliates' => Affiliate::all(),
            // 'apitoken' => $session_data,
            'apitoken' => $token,
        ]);
    } // create
    
    public function store(Request $request) {
        $token   = $this->getSessionToken();
        $apiURL  = 'https://rapi.earthlink.iq/api/reseller/user/newuserdeposit' ;  
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        $post_data = [
            "DepositPassword"   => 'Elink3',
            "AgentIndex"        => 2199,
            "AffiliateIndex"    => $request->affiliate_index,
            "AccountIndex"      => $request->account_index,
            "UserID"            => $request->customer_user_id,
            "UserPass"          => 1,
            "EarthMaxMAC"       => '',
            "AffiliateTypeID"   => "",
            "FirstName"         => $request->first_name,
            "LastName"          => $request->last_name,
            "Company"           => $request->company,
            "Address"           => $request->address,
            "City"              => $request->city,
            "State"             => $request->state,
            "Country"           => '',
            "Zip"           => '',
            "Email"         => $request->email,
            "MobileNumber"  => $request->mobile_number,
            "MobileNumber2" => $request->mobile_number,
            "DisplayName"   => $request->display_name,
        ]; 
        $new_user_api = Http::withHeaders($headers)->post($apiURL, $post_data);
        $new_user_response  = json_decode($new_user_api->getBody(), true);

        // return response(compact('new_user_response'));

        if ($new_user_response) {
            if($new_user_response['value'] === false) {            
                return redirect()->route('customers.create')->with(
                    'message', $new_user_response['error']['message']
                );  
            }  
        }        

        return Inertia::render('Customers/Customers', [
            'new_user_response' => $new_user_response ?? 'NULL'
        ]);
    } // store
}
