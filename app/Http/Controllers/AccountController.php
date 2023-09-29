<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function accounts()
    {
        $token = $this->GetApiToken();
        $apiURL = 'https://rapi.earthlink.iq/api/reseller/accounts/all' ;      
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        $api_response = Http::withHeaders($headers)->get($apiURL);  
        $accounts     = json_decode($api_response->getBody(), true);

        return response(compact('accounts'));        
        // return Inertia::render('Accounts/Accounts', $accounts);
    } // accounts
}
