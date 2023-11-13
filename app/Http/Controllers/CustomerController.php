<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Affiliate;
use App\Models\Account;
use App\Models\Sub_account;
use App\Http\Requests\StoreCustomerRequest;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $token = $this->getSavedToken();       

        if ($request->hasAny(['account_index', 'sub_account_id', 'affiliate_index', 'customer_user_id', 'status'])) {
            // $data = $request->all();  
            // return response(compact('data')); 
            
            $customers = Customer::leftJoin('affiliates', 'affiliates.affiliate_index', '=', 'customers.affiliate_index')
                ->leftJoin('accounts', 'accounts.account_index', '=', 'customers.account_index')
                ->when(request('account_index') != '', function ($q) {
                    return $q->where('customers.account_index', request('account_index'));
                })->when(request('sub_account_id') != '', function ($q) {
                    return $q->where('customers.sub_account_id', request('sub_account_id'));
                })->when(request('affiliate_index') != '', function ($q) {
                    return $q->where('customers.affiliate_index', request('affiliate_index'));
                })->when(request('customer_user_id') != '', function ($q) {
                    return $q->where('customers.customer_user_id', 'LIKE', '%'.request('customer_user_id').'%');
                })->when(request('status') != '', function ($q) {
                    return $q->where('customers.status', 'LIKE', '%'.request('status').'%');
                })->get(['customers.*', 'affiliates.affiliate_name', 'accounts.account_name']);           

            $show_data = 'filter_list';
        } else {
            // select cus.*, aff.affiliate_name, acc.account_name from customers cus
            // left join affiliates aff on aff.affiliate_index=cus.affiliate_index
            // left join accounts acc on acc.account_index=cus.account_index;
            
            $customers = Customer::leftJoin('affiliates', 'affiliates.affiliate_index', '=', 'customers.affiliate_index')
                ->leftJoin('accounts', 'accounts.account_index', '=', 'customers.account_index')
                ->get(['customers.*', 'affiliates.affiliate_name', 'accounts.account_name']);

            $show_data = 'list';
        } 

        return Inertia::render('Customers/Customers', [
            'customers' => $customers,
            'sub_accounts' => Sub_account::all(),              
            'accounts' => Account::all(),
            'affiliates' => Affiliate::all(),  
            'show_data' => $show_data,
            'apitoken' => $token,        
        ]);
    } // index

    public function create() {
        $token = $this->getSavedToken();
        // $session_data = json_encode($token, true);      
        
        return Inertia::render('Customers/Customers', [
            'show_data'  => 'add_form',
            'accounts' => Account::all(),
            'sub_accounts' => Sub_account::all(),
            'affiliates' => Affiliate::all(),
            // 'apitoken' => $session_data,
            'apitoken' => $token,
        ]);
    } // create
    
    public function store(StoreCustomerRequest $request) {
        $token   = $this->getSavedToken();
        $apiURL  = 'https://rapi.earthlink.iq/api/reseller/user/newuserdeposit' ;  
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        $post_data = [
            "DepositPassword"   => $request->deposit_password, // 6666667
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
            if($new_user_response['value'] === false || $new_user_response['value'] === 0) { 
                $error_msg = $new_user_response['error']['message']; 
                if ($new_user_response['error']['validationErrors']) {
                    $error_msg = $new_user_response['error']['validationErrors'][0]['validationMessage'];
                }               
                return redirect()->route('customers.create')->with('error_message', $error_msg);  
            } else {

                if($new_user_response['isSuccessful'] === true) {
                    // Just for Testing insert into db   
                    $sub_account_id = 0;
                    if ($request->sub_account_id != '') {
                        $sub_account_id = $request->sub_account_id;
                    }  
                    $customer_user_index = $new_user_response['value'];          
                    Customer::insert([
                        'account_index'     => $request->account_index,
                        'sub_account_id'     => $sub_account_id,
                        'affiliate_index'   => $request->affiliate_index, 
                        'first_name'        => $request->first_name,
                        'last_name'         => $request->last_name,
                        'customer_user_id'  => $request->customer_user_id,
                        'customer_user_index'   => $customer_user_index,
                        'mobile_number'         => $request->mobile_number,
                        'mobile_number2'        => '',
                        'address'               => $request->address,
                        'email'                 => $request->email,
                        'city'                  => $request->city,
                        'user_active_manage'    => '',
                        'company'               => $request->company,
                        'state'                => $request->state,
                        'display_name'         => $request->display_name,
                        'caller_id'            => '',
                        'customer_user_notes'  => $request->customer_user_notes,
                        'status'               => 'Offline',
                        'account_status'       => 'Active',
                        'account_package_type' => 'MonthlyPrepaid'                 
                    ]);
                    return redirect()->route('customers')->with('message', $new_user_response['responseMessage']);
                } else {
                    return redirect()->route('customers.create')->with(
                        'error_message', $new_user_response['error']
                    );
                }           
            }           
        } // new_user_response
        
        return redirect()->route('customers')->with('status', 422);
       
    } // store   

    public function store_api(Request $request) {
        $row_count = $request->totalCount;
        $token   = $this->getSavedToken();
        $apiURL  = 'https://rapi.earthlink.iq/api/reseller/user/all' ;  
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        $post_data = [
            "Rowcount"   => $row_count,
            "OrderBy"    => 'Account Name',
            
        ]; 
        $all_users_api = Http::withHeaders($headers)->post($apiURL, $post_data);
        $all_users_response  = json_decode($all_users_api->getBody(), true);

        // return response(compact('all_users_response', 'row_count'));

        if ($all_users_response) {
            if($all_users_response['isSuccessful'] === true) {                 
                $affiliates = Affiliate::all();

                $existed_cusData = Customer::select('customer_user_index')->get(); 
                $existed_userIndex = [];
                foreach ($existed_cusData as $value) {
                    $existed_userIndex[] = $value['customer_user_index'];
                }            
                // return response(compact('existed_userIndex'));

                foreach ($all_users_response['value']['itemsList'] as $dt) {
                    
                    if (in_array($dt['userIndex'], $existed_userIndex)) {
                        continue;
                    }
                    $existed_userIndex[] = $dt['userIndex'];                   	

                    $affiliate_index = 0;
                    foreach ($affiliates as $aff) {                        
                        if ($aff['affiliate_name'] == $dt['affiliateName']) {
                            $affiliate_index = $aff['affiliate_index'];
                        }
                    }
                    $sub_account_id = 0;
                              
                    Customer::insert([
                        'account_index'     => $dt['accountIndex'],
                        'sub_account_id'     => $sub_account_id,
                        'affiliate_index'   => $affiliate_index,
                        'first_name'        => '',
                        'last_name'         => '',
                        'customer_user_id'  => $dt['userID'],
                        'customer_user_index'   => $dt['userIndex'],
                        'mobile_number'         => $dt['mobileNumber'],
                        'mobile_number2'        => $dt['mobileNumber2'],
                        'address'               => '',
                        'email'                 => $dt['userID'] ,
                        'city'                  => '',
                        'user_active_manage'    => '',
                        'company'               => '',
                        'state'                => '',
                        'display_name'         => $dt['displayName'],
                        'caller_id'            => $dt['callerID'],
                        'customer_user_notes'  => $dt['userNotes'],
                        'status'               => $dt['onlineStatus'],
                        'account_status'       => $dt['accountStatus'],
                        'account_package_type' =>  $dt['accountPackageType']                 
                    ]);   
                }     
                
                return redirect()->route('customers')->with('status', 201);
            } else {
                return redirect()->route('customers')->with(
                    'message', $all_users_response['responseMessage']
                );
            }           
        }
        
        return redirect()->route('customers')->with('status', 422);
       
    } // store_api
}
