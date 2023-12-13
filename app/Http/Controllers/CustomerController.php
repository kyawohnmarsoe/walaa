<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Affiliate;
use App\Models\Account;
use App\Models\Sub_account;
use App\Models\Deposit_pass;
use App\Http\Requests\StoreCustomerRequest;
use App\Models\User_group;

class CustomerController extends Controller
{
    public function get_totalcount() {
        $token   = $this->getSavedToken();
        $apiURL  = 'https://rapi.earthlink.iq/api/reseller/user/all' ;  
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        $post_data = [
            "Rowcount"   => 1,
            "OrderBy"    => 'Account Name',
            
        ]; 
        $all_users_api = Http::withHeaders($headers)->post($apiURL, $post_data);
        $all_users_response  = json_decode($all_users_api->getBody(), true);
        
        $totalCount = 0;
        if ($all_users_response){
            if($all_users_response['isSuccessful'] === true) { 
                $totalCount = $all_users_response['value']['totalCount'];
            }
        }
        return $totalCount;     
       
    } // get_totalcount

    // public function get_deposit_password() {

    //     $all_data = Deposit_pass::all();
    //     if($all_data->count() > 0) {
    //         $id = $all_data[0]['id'];
    //         $data = Deposit_pass::findOrFail($id);
    //         $deposit_password = $data->deposit_password;
    //         $deposit_password_id = $data->id;
    //         return [
    //             'id'=> $deposit_password_id,
    //             'deposit_password' => $deposit_password
    //         ];
    //     }      
    // } // get_deposit_password   
   
    public function index(Request $request)
    {
        $user_has_groups_idArr = $this->getLoggedInUserGroup();
        $count_user_groups = User_group::count();   
        
        // return response(compact('user_has_groups_idArr'));
        
        $token = $this->getSavedToken();  
        
        $totalCount = $this->get_totalcount(); 
        
        if ($request->hasAny(['account_index', 'sub_account_id', 'affiliate_index', 'customer_user_id', 'status', 'user_group_id'])) {
           
            $customers_query = Customer::leftJoin('affiliates', 'affiliates.affiliate_index', '=', 'customers.affiliate_index')
                ->leftJoin('accounts', 'accounts.account_index', '=', 'customers.account_index')
                ->when(request('account_index') != '', function ($q) {
                    return $q->where('customers.account_index', request('account_index'));
                })->when(request('sub_account_id') != '', function ($q) {
                    return $q->where('customers.sub_account_id', request('sub_account_id'));
                })->when(request('affiliate_index') != '', function ($q) {
                    return $q->where('customers.affiliate_index', request('affiliate_index'));
                })->when(request('customer_user_id') != '', function ($q) {
                    return $q->where('customers.customer_user_id', 'LIKE', '%'.request('customer_user_id').'%');
                })->when(request('active_status') != '', function ($q) {
                    return $q->where('customers.active_status', '=', request('active_status'));
                })->when(request('user_group_id') != '', function ($q) {
                    return $q->where('customers.user_group_id', request('user_group_id'));
                });
                // ->whereNull('customers.user_group_id')                

            $show_data = 'filter_list';
        } else {
            // select cus.*, aff.affiliate_name, acc.account_name from customers cus
            // left join affiliates aff on aff.affiliate_index=cus.affiliate_index
            // left join accounts acc on acc.account_index=cus.account_index
            // where cus.user_group_id in('1') OR cus.user_group_id IS NULL;
            
            $customers_query = Customer::leftJoin('affiliates', 'affiliates.affiliate_index', '=', 'customers.affiliate_index')
                ->leftJoin('accounts', 'accounts.account_index', '=', 'customers.account_index');
                // ->whereNull('customers.user_group_id')

            $show_data = 'list';
        } 

        if(count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)){
            $customers = $customers_query->get(['customers.*', 'affiliates.affiliate_name', 'accounts.account_name']);            
            $filter_user_groups = User_group::all();
        } else {
            $customers = $customers_query->whereIn('customers.user_group_id', $user_has_groups_idArr)
            ->get(['customers.*', 'affiliates.affiliate_name', 'accounts.account_name']);
            $filter_user_groups = User_group::whereIn('user_groups.id', $user_has_groups_idArr)
                        ->get();
        }

        // return response(compact('customers'));

        return Inertia::render('Customers/Customers', [
            'customers'    => $customers,
            'sub_accounts' => Sub_account::all(),              
            'accounts'    => Account::all(),
            'affiliates'  => Affiliate::all(),  
            'user_groups' => $filter_user_groups,// User_group::all(),
            'show_data'  => $show_data,
            'apitoken'   => $token, 
            'totalCount' => $totalCount,                 
        ]);
    } // index

    public function create() {
        $token = $this->getSavedToken();
        
        return Inertia::render('Customers/Customers', [
            'show_data'  => 'add_form',
            'accounts' => Account::all(),
            'sub_accounts' => Sub_account::all(),
            'affiliates' => Affiliate::all(),
            'user_groups' => User_group::all(),
            'apitoken' => $token,
        ]);
        
    } // create
    
    // public function change_deposit_password() {
    //     $token = $this->getSavedToken();
    //     $deposit_data = $this->get_deposit_password();
    //     return Inertia::render('Customers/Customers', [
    //         'show_data'  => 'deposit_form',
    //         'accounts' => Account::all(),
    //         'sub_accounts' => Sub_account::all(),
    //         'affiliates' => Affiliate::all(),
    //         'apitoken' => $token,
    //         'deposit_password' => $deposit_data['deposit_password'],  
    //         'deposit_id' => $deposit_data['id'],
    //     ]);
        
    // } // change_deposit_password

    // public function update_deposit_password(Request $request, $id) 
    // {       
    //     $input = $request->all();
	// 	$data = Deposit_pass::findOrFail($id);
	// 	$data->update($input);
    //     return redirect()->route('customers')->with('message', 'Deposit password is successfully updated!');  
    // }
    
    public function insert(StoreCustomerRequest $request) {
        $token   = $this->getSavedToken();
        
        $data = $request->validated();  

        $deposit_data = $this->get_deposit_password();

        $apiURL  = 'https://rapi.earthlink.iq/api/reseller/user/newuserdeposit' ;  
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        $post_data = [
            "DepositPassword"   => $deposit_data['deposit_password'], // 6666667
            "AgentIndex"        => 2199,
            "AffiliateIndex"    => $request->affiliate_index,
            "AccountIndex"      => $request->account_index,
            "UserID"            => $request->email,
            "UserPass"          => $request->user_password, // 1
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
                        'customer_user_id'  => $request->email,
                        'customer_user_index'   => $customer_user_index,
                        'mobile_number'         => $request->mobile_number,
                        'mobile_number2'        => $request->mobile_number2,
                        'address'               => $request->address,
                        'email'                 => $request->email,
                        'user_password'         => $request->user_password,
                        'city'                  => $request->city,
                        'company'               => $request->company,
                        'state'                => $request->state,
                        'display_name'         => $request->display_name,
                        'caller_id'            => '',
                        'customer_user_notes'  => $request->customer_user_notes,
                        'user_group_id'        => $request->user_group_id,
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
       
    } // insert       

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
                     
                    $affiliate_index = 0;
                    foreach ($affiliates as $aff) {                        
                        if ($aff['affiliate_name'] == $dt['affiliateName']) {
                            $affiliate_index = $aff['affiliate_index'];
                        }
                    }
                    $sub_account_id = 0; 
                    
                    // if existed data, update some fields
                    if (in_array($dt['userIndex'], $existed_userIndex)) {                        
                        $update_data = [
                            'caller_id' => $dt['callerID'],
                            'status' => $dt['onlineStatus'], 
                            'account_status' => $dt['accountStatus'], 
                            'account_package_type' => $dt['accountPackageType'],
                        ];                     
                        Customer::where('customer_user_index', $dt['userIndex'])->update($update_data); 
                        continue; // for skip duplicate index                       
                    }
                    $existed_userIndex[] = $dt['userIndex']; 

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
                        'user_password'         => 1,
                        'city'                  => '',
                        'company'               => '',
                        'state'                => '',
                        'display_name'         => $dt['displayName'],
                        'caller_id'            => $dt['callerID'],
                        'customer_user_notes'  => $dt['userNotes'],
                        'status'               => $dt['onlineStatus'],
                        'account_status'       => $dt['accountStatus'],
                        'account_package_type' =>  $dt['accountPackageType'],                          
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

    public function edit($index) {
        $token = $this->getSavedToken();     
        
        return Inertia::render('Customers/Customers', [
            'show_data'    => 'edit_form',
            'customer'     => Customer::where('customer_user_index', $index)->firstOrFail(),
            'accounts'     => Account::all(),
            'sub_accounts' => Sub_account::all(),
            'affiliates'   => Affiliate::all(),
            'user_groups'  => User_group::all(),
            'apitoken'     => $token,
        ]);
    } // edit

    public function update(StoreCustomerRequest $request, $index) 
    {
		$input = $request->all();
        $data = $request->validated(); 
		$data = Customer::where('customer_user_index', $index)->firstOrFail();
		$data->update($input);
        return redirect()->route('customers')->with('message', 'Data is successfully updated!'); 
	} // update

    public function destroy($index)
    {
        $input = [
            'active_status'=> 0,
        ];
		$data = Customer::where('customer_user_index', $index)->firstOrFail();
		$data->update($input);
        return redirect()->route('customers')->with('message', 'User is successfully disabled!');
    } // destroy    
   
}
