<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Account;
use App\Models\Sub_account;
use App\Http\Requests\StoreSubAccountRequest;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::join('sub_accounts', 'sub_accounts.account_index', '=', 'accounts.account_index')
              ->get(['accounts.account_price', 'sub_accounts.*']);
        return Inertia::render('Accounts/Accounts', [
            'accounts' => $accounts,
            'show_data' => 'list',
        ]);
    } // index
    
    public function api_list()
    {
        $accounts = Account::all();
        return Inertia::render('Accounts/Accounts', [
            'accounts' => $accounts,
            'show_data' => 'apilist',
        ]);
    } // api_list

    public function create() {
        $token = $this->getSessionToken();
        
        return Inertia::render('Accounts/Accounts', [
            'show_data'  => 'add_form',
            'accounts' => Account::all(),
        ]);
    } // create    

    public function insert(StoreSubAccountRequest $request) { 
        $token = $this->getSessionToken();       
        $data = $request->validated();        
        $sub_account = Sub_account::create($data);
        return redirect()->route('accounts')->with('status', 201);   
    } // insert

    public function edit($id) {
        $token = $this->getSessionToken();       
       
        return Inertia::render('Accounts/Accounts', [
            'show_data'  => 'edit_form',
            'account' => Sub_account::findOrFail($id),
            'accounts' => Account::all()
        ]);
    } // edit

    public function update(Request $request, $id) 
    {
		$input = $request->all();
		$data = Sub_account::findOrFail($id);
        // return response(compact('input'));  
		$data->update($input);
        return redirect()->route('accounts')->with('status', 200); 
	} // update

    public function destroy($id)
    {
        Sub_account::findOrFail($id)->delete();
        return redirect()->route('accounts')->with('status', 204); 
    } // destroy

    public function store_api() { // insert API data to db
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

    } // store_api
    
}
