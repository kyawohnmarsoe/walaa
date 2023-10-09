<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Affiliate;
use App\Models\Account;
use App\Http\Requests\StoreCustomerRequest;

class CustomerController extends Controller
{
    public function index()
    {
        // select cus.*, aff.affiliate_name, acc.account_name from customers cus
        // inner join affiliates aff on aff.affiliate_index=cus.affiliate_index
        // inner join accounts acc on acc.account_index=cus.account_index;

        $customers = Customer::join('affiliates', 'affiliates.affiliate_index', '=', 'customers.affiliate_index')
              ->join('accounts', 'accounts.account_index', '=', 'customers.account_index')
              ->get(['customers.*', 'affiliates.affiliate_name', 'accounts.account_name']);

        return Inertia::render('Customers/Customers', [
            'customers' => $customers,
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
    
    public function store(StoreCustomerRequest $request) {
        $token   = $this->getSessionToken();
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
                return redirect()->route('customers.create')->with('message', $error_msg);  
            } else {

                if($new_user_response['isSuccessful'] === true) {
                    // Just for Testing insert into db
                    // $data = $request->validated();
                    // $customer = Customer::create($data);
                    Customer::insert([
                        'account_index'     => $request->accountIndex,
                        'affiliate_index'   => $request->affiliate_index, 
                        'first_name'        => $request->first_name,
                        'last_name'         => $request->last_name,
                        'customer_user_id'  => $request->customer_user_id,
                        'customer_user_index'   => $new_user_response['value'],
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
                        'message', $new_user_response['error']
                    );
                }             
                
            }           
        }
        
        return redirect()->route('customers')->with('status', 422);
       
    } // store

    // not use because [maximum execution time]
    // public function store_api() {
    //     $token   = $this->getSessionToken();
    //     $apiURL  = 'https://rapi.earthlink.iq/api/reseller/user/all' ;  
    //     $headers = [
    //         'Authorization'=>'Bearer '.$token, 
    //         'Accept' => 'application/json'
    //     ];
    //     $post_data_toget_total_count = [           
    //         "OrderBy"    => 'Account Name',            
    //     ]; 
    //     $total_count_users_api = Http::withHeaders($headers)->post($apiURL, $post_data_toget_total_count);
    //     $total_count_users_response  = json_decode($total_count_users_api->getBody(), true);
    //     // return response(compact('total_count_users_response'));

    //     if ($total_count_users_response) {
    //         if($total_count_users_response['isSuccessful'] === true) {   
    //             $total_count = $total_count_users_response['value']['totalCount'];
    //             $page_count = ceil($total_count/50);

    //             for ($i=0; $i <= $page_count ; $i++) { 
    //                 $start_index = ($i * 50) % $total_count;
    //                 $post_data = [
    //                     "Startindex"  => $start_index,
    //                     "Rowcount"   => 50,
    //                     "OrderBy"    => 'Account Name',            
    //                 ]; 
    //                 $all_users_api = Http::withHeaders($headers)->post($apiURL, $post_data);
    //                 $all_users_response  = json_decode($all_users_api->getBody(), true);

    //                 if ($all_users_response) {
    //                     if($all_users_response['isSuccessful'] === true) {                 
    //                         $affiliates = Affiliate::all();
            
    //                         foreach ($all_users_response['value']['itemsList'] as $dt) {  
    //                             $affiliate_index = 0;
    //                             foreach ($affiliates as $aff) {                        
    //                                 $db_affiliate_name  = str_replace(' ', '', $aff['affiliate_name']);
    //                                 $api_affiliate_name = str_replace(' ', '', $dt['affiliateName']);
            
    //                                 if ($db_affiliate_name ==  $api_affiliate_name) {
    //                                     $affiliate_index = $aff['affiliate_index'];
    //                                 }
    //                             }            
    //                             Customer::insert([
    //                                 'account_index'     => $dt['accountIndex'],
    //                                 'affiliate_index'   => $affiliate_index, 
    //                                 'first_name'        => '',
    //                                 'last_name'         => '',
    //                                 'customer_user_id'  => $dt['userID'],
    //                                 'customer_user_index'   => $dt['userIndex'],
    //                                 'mobile_number'         => $dt['mobileNumber'],
    //                                 'mobile_number2'        => $dt['mobileNumber2'],
    //                                 'address'               => '',
    //                                 'email'                 => $dt['userID'] ,
    //                                 'city'                  => '',
    //                                 'user_active_manage'    => '',
    //                                 'company'               => '',
    //                                 'state'                => '',
    //                                 'display_name'         => $dt['displayName'],
    //                                 'caller_id'            => $dt['callerID'],
    //                                 'customer_user_notes'  => $dt['userNotes'],
    //                                 'status'               => $dt['onlineStatus'],
    //                                 'account_status'       => $dt['accountStatus'],
    //                                 'account_package_type' =>  $dt['accountPackageType']                 
    //                             ]);   
    //                         }  // end foreach                               
                            
    //                     } else {
    //                         return redirect()->route('customers')->with(
    //                             'message', $all_users_response['responseMessage']
    //                         );
    //                     }           
    //                 }
                    
    //             } // end for loop
    //             return redirect()->route('customers')->with('status', 201);
    //         }
    //     }             

    //     return redirect()->route('customers')->with('status', 422);
       
    // } // store_api

    public function store_api() {
        $token   = $this->getSessionToken();
        $apiURL  = 'https://rapi.earthlink.iq/api/reseller/user/all' ;  
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        $post_data = [
            "Rowcount"   => 4327,
            "OrderBy"    => 'Account Name',
            
        ]; 
        $all_users_api = Http::withHeaders($headers)->post($apiURL, $post_data);
        $all_users_response  = json_decode($all_users_api->getBody(), true);

        // return response(compact('all_users_response'));

        if ($all_users_response) {
            if($all_users_response['isSuccessful'] === true) {                 
                $affiliates = Affiliate::all();

                foreach ($all_users_response['value']['itemsList'] as $dt) {  
                    $affiliate_index = 0;
                    foreach ($affiliates as $aff) {                        
                        if ($aff['affiliate_name'] == $dt['affiliateName']) {
                            $affiliate_index = $aff['affiliate_index'];
                        }
                    }            
                    Customer::insert([
                        'account_index'     => $dt['accountIndex'],
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
