<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Account;

class AccountController extends Controller
{
    public function index()
    {
        return Inertia::render('Accounts/Accounts', [
            'accounts' => Account::all()
        ]);
    } // index

    public function store() { // insert API data to db
        $token = $this->getSessionToken();
        
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];

        $resellerPriceApiURL = 'https://rapi.earthlink.iq/api/reseller/prepaycard/prices/forreseller' ;      
        $resellerPrice_api_response = Http::withHeaders($headers)->get($resellerPriceApiURL);  
        $resellerPrice     = json_decode($resellerPrice_api_response->getBody(), true); 
        
        $userPriceApiURL = 'https://rapi.earthlink.iq/api/reseller/prepaycard/prices/foruser' ;      
        $userPrice_api_response = Http::withHeaders($headers)->get($userPriceApiURL);  
        $userPrice     = json_decode($userPrice_api_response->getBody(), true); 

        $accountApiURL = 'https://rapi.earthlink.iq/api/reseller/accounts/all' ;     
        $account_api_response = Http::withHeaders($headers)->get($accountApiURL);  
        $accounts_data     = json_decode($account_api_response->getBody(), true);       
        
        $collection = collect($accounts_data['value']);
        $accountIndex = $collection->pluck("accountIndex");
        $accountIndex->all(); 
        $account = Account::whereIn('account_index', $accountIndex)->first();

        $accounts = Account::all();

        if(!is_null($account)){ 

            return redirect()->route('accounts')->with('status', 422);      
           
        } else {
            foreach ($accounts_data['value'] as $acc) {

                $account_price = '';
                foreach ($resellerPrice['value'] as $rep) {
                    if($rep['accountIndex'] == $acc['accountIndex']){
                        $account_price = $rep['accountPrice']['value'];
                    }
                }

                $end_user_account_price = '';
                foreach ($userPrice['value'] as $usrp) {
                    if($usrp['accountIndex'] == $acc['accountIndex']){
                        $end_user_account_price = $rep['sellingEndUserAccountPrice']['value'];
                    }
                }

                Account::insert([
                    'account_index' => $acc['accountIndex'],
                    'account_name'  => $acc['accountName'],
                    'is_max_account'     => $acc['isMAXAccount'],
                    'account_description' => $acc['accountDescription'],
                    'account_image_path'  => $acc['accountImagePath'],
                    'account_thumbnail'   => $acc['accountThumbnail'],
                    'end_user_account_price' => $end_user_account_price,
                    'account_price'          => $account_price
                ]);          
            }            
           
            return redirect()->route('accounts')->with('status', 201);
        }            

    } // store
}
