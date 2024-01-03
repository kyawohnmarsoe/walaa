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
use App\Models\Invoice;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class CustomerController extends Controller
{

    public function get_totalcount()
    {
        $token = $this->getSavedToken();          
        $apiURL = 'https://rapi.earthlink.iq/api/reseller/user/all';
        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json'
        ];
        $post_data = [
            "Rowcount" => 1,
            "OrderBy" => 'Account Name',

        ];
        $all_users_api = Http::withHeaders($headers)->post($apiURL, $post_data);
        $all_users_response = json_decode($all_users_api->getBody(), true);

        $totalCount = 0;
        if ($all_users_response) {
            return response(compact('all_users_response'));
            if ($all_users_response['isSuccessful'] === true) {
                $totalCount = $all_users_response['value']['totalCount'];
            } else {
                $totalCount = 0;
            }
        }
        return $totalCount;

    } // get_totalcount   

    public function index(Request $request)
    {
        $user_has_groups_idArr = $this->getLoggedInUserGroup();
        $count_user_groups = User_group::count();

        // return response(compact('user_has_groups_idArr'));

        $token = $this->getSavedToken();        

        $totalCount = $this->get_totalcount();

        $deposit_data = $this->get_deposit_password();

        if ($request->hasAny(['account_index', 'sub_account_id', 'affiliate_index', 'customer_user_id', 'display_name', 'mobile_number', 'status', 'user_group_id'])) {
            
            $customers_query = Customer::leftJoin('affiliates', 'affiliates.affiliate_index', '=', 'customers.affiliate_index')
                ->leftJoin('accounts', 'accounts.account_index', '=', 'customers.account_index')
                ->leftJoin('tickets', 'tickets.user_id', '=', 'customers.id')
                ->groupBy('customers.id')
                ->when(request('account_index') != '', function ($q) {
                    return $q->where('customers.account_index', request('account_index'));
                })->when(request('sub_account_id') != '', function ($q) {
                    return $q->where('customers.sub_account_id', request('sub_account_id'));
                })->when(request('affiliate_index') != '', function ($q) {
                    return $q->where('customers.affiliate_index', request('affiliate_index'));
                })->when(request('customer_user_id') != '', function ($q) {
                    return $q->where('customers.customer_user_id', 'LIKE', request('customer_user_id').'%');
                })->when(request('display_name') != '', function ($q) {
                    return $q->where('customers.display_name', 'LIKE', request('display_name').'%');
                })->when(request('mobile_number') != '', function ($q) {
                    return $q->where('customers.mobile_number', 'LIKE',request('mobile_number').'%')
                    ->orWhere('customers.mobile_number2', 'LIKE',request('mobile_number').'%');
                })->when(request('active_status') != '', function ($q) {
                    return $q->where('customers.active_status', '=', request('active_status'));
                })->when(request('user_group_id') != '', function ($q) {
                    return $q->where('customers.user_group_id', request('user_group_id'));
                });
            // ->whereNull('customers.user_group_id')             
            
            $show_data = 'filter_list';
        } else {
            // select cus.*, aff.affiliate_name, acc.account_name, t.id AS ticket_id from customers cus
            // left join affiliates aff on aff.affiliate_index=cus.affiliate_index
            // left join accounts acc on acc.account_index=cus.account_index
            // left join tickets t on t.user_id=cus.id GROUP BY cus.id
            // where cus.user_group_id in('1') OR cus.user_group_id IS NULL;

            $customers_query = Customer::leftJoin('affiliates', 'affiliates.affiliate_index', '=', 'customers.affiliate_index')
                ->leftJoin('accounts', 'accounts.account_index', '=', 'customers.account_index')
                ->leftJoin('tickets', 'tickets.user_id', '=', 'customers.id')
                ->groupBy('customers.id');
            // ->where(DB::raw("(STR_TO_DATE(customers.manual_expiration_date,'%d/%m/%Y'))"), ">=", Carbon::now())
            // ->where(DB::raw("(STR_TO_DATE(customers.manual_expiration_date,'%d/%m/%Y'))"), '=', today()->addDays(2));
            // ->whereNull('customers.user_group_id')              

            $show_data = 'list';
        }

        if (count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)) {
            $customers = $customers_query->get(['customers.*', 'affiliates.affiliate_name', 'accounts.account_name', 'tickets.id As ticket_id']);
            $filter_user_groups = User_group::all();

        } else {
            $customers = $customers_query->whereIn('customers.user_group_id', $user_has_groups_idArr)
                        ->get(['customers.*', 'affiliates.affiliate_name', 'accounts.account_name', 'tickets.id As ticket_id']);
            $filter_user_groups = User_group::whereIn('user_groups.id', $user_has_groups_idArr)
                ->get();
        }

        // return response(compact('customers'));

        return Inertia::render('Customers/Customers', [
            'customers' => $customers,
            'sub_accounts' => Sub_account::all(),
            'accounts' => Account::all(),
            'affiliates' => Affiliate::all(),
            'sys_users' => User::all(),
            'user_groups' => $filter_user_groups,
            'show_data' => $show_data,
            'apitoken' => $token,
            'totalCount' => $totalCount,
            'deposit_password' => $deposit_data['deposit_password'],
        ]);
    } // index
    public function create()
    {
        // $this->getUserInfo('testuser@gmail.comm');
        $token = $this->getSavedToken();
        return Inertia::render('Customers/Customers', [
            'show_data' => 'add_form',
            'accounts' => Account::all(),
            'sub_accounts' => Sub_account::all(),
            'affiliates' => Affiliate::all(),
            'user_groups' => User_group::all(),
            'apitoken' => $token,
        ]);

    } // create   

    public function update_deposit_password(Request $request, $id)
    {
        $input = $request->all();
        $data = Deposit_pass::findOrFail($id);
        $data->update($input);
        return redirect()->route('customers')->with('message', 'Deposit password is successfully updated!');
    } // update_deposit_password

    public function insert(StoreCustomerRequest $request)
    {
        $token = $this->getSavedToken();

        $data = $request->validated();

        $deposit_data = $this->get_deposit_password();

        $apiURL = 'https://rapi.earthlink.iq/api/reseller/user/newuserdeposit';
        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json'
        ];
        $post_data = [
            "DepositPassword" => $deposit_data['deposit_password'], // 6666667
            "AgentIndex" => 2199,
            "AffiliateIndex" => $request->affiliate_index,
            "AccountIndex" => $request->account_index,
            "UserID" => $request->email,
            "UserPass" => $request->user_password, // 1
            "EarthMaxMAC" => '',
            "AffiliateTypeID" => "",
            "FirstName" => $request->first_name,
            "LastName" => $request->last_name,
            "Company" => $request->company,
            "Address" => $request->address,
            "City" => $request->city,
            "State" => $request->state,
            "Country" => '',
            "Zip" => '',
            "Email" => $request->email,
            "MobileNumber" => $request->mobile_number,
            "MobileNumber2" => $request->mobile_number,
            "DisplayName" => $request->display_name,
        ];
        $new_user_api = Http::withHeaders($headers)->post($apiURL, $post_data);
        $new_user_response = json_decode($new_user_api->getBody(), true);

        // return response(compact('new_user_response'));        

        if ($new_user_response) {
            if ($new_user_response['value'] === false || $new_user_response['value'] === 0) {
                $error_msg = $new_user_response['error']['message'];
                if ($new_user_response['error']['validationErrors']) {
                    $error_msg = $new_user_response['error']['validationErrors'][0]['validationMessage'];
                }
                return redirect()->route('customers.create')->with('error_message', $error_msg);
            } else {

                if ($new_user_response['isSuccessful'] === true) {
                    // Just for Testing insert into db   
                    $sub_account_id = 0;
                    if ($request->sub_account_id != '') {
                        $sub_account_id = $request->sub_account_id;
                    }
                    $customer_user_index = $new_user_response['value'];
                    Customer::insert([
                        'account_index' => $request->account_index,
                        'sub_account_id' => $sub_account_id,
                        'affiliate_index' => $request->affiliate_index,
                        'first_name' => $request->first_name,
                        'last_name' => $request->last_name,
                        'customer_user_id' => $request->email,
                        'customer_user_index' => $customer_user_index,
                        'mobile_number' => $request->mobile_number,
                        'mobile_number2' => $request->mobile_number2,
                        'address' => $request->address,
                        'email' => $request->email,
                        'user_password' => $request->user_password,
                        'city' => $request->city,
                        'company' => $request->company,
                        'state' => $request->state,
                        'display_name' => $request->display_name,
                        'caller_id' => '',
                        'customer_user_notes' => $request->customer_user_notes,
                        'user_group_id' => $request->user_group_id,
                        'status' => 'Offline',
                        'account_status' => 'Active',
                        'account_package_type' => 'MonthlyPrepaid'
                    ]);

                    $this->getUserInfo($request->email);
                    //Invoice

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

    public function getUserInfo($userID)
    {
        $token = $this->getSavedToken();
        $apiURL = 'https://rapi.earthlink.iq/api/reseller/userpayment/usersInvoice';
        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json'
        ];
        $post_data = [
            "UserID" => $userID,
        ];

        $new_user_api = Http::withHeaders($headers)->post($apiURL, $post_data);
        $new_user_response = json_decode($new_user_api->getBody(), true);
        $invoice = $new_user_response['value']['itemsList'][0];
        $balance = $invoice['salePrice'];
        $modifyUser = Auth::user()->name;
        $data = [
            'invoinceID' => $invoice['invoinceID'],
            'userIndex' => $invoice['userIndex'],
            'displayName' => $invoice['displayName'],
            'affiliateName' => $invoice['affiliateName'],
            'invoiceType' => $invoice['invoiceType'],
            'invoiceDescription' => $invoice['invoiceDescription'],
            'invoiceDuration' => $invoice['invoiceDuration'],
            'salePrice' => $invoice['salePrice'],
            'retailPriceCurrency' => $invoice['retailPriceCurrency'],
            'retailPrice' => $invoice['retailPrice'],
            'referenceRecord' => $invoice['referenceRecord'],
            'recordDate' => $invoice['recordDate'],
            'lastStatusChanged' => $invoice['lastStatusChanged'],
            'accountName' => $invoice['accountName'],
            // 'notes' => $invoice['notes'],
            'userID' => $invoice['userID'],
            'discountedPrice' => $invoice['discountedPrice'],
            'paymentDueDate' => $invoice['paymentDueDate'],
            // 'paymentDueDateTime' => $invoice['paymentDueDateTime'],
            'paidPrice' => $invoice['paidPrice'],
            'balance' => $balance,
            'invoiceStatus' => $invoice['invoiceStatus'],
            'notes' => $invoice['notes'],
            'modifyUser' => $modifyUser,
        ];
        // dd($data);
        Invoice::create($data);
        //   return redirect()->route('invoices')->with('status', 200);        
    }

    public function store_api(Request $request)
    {
        $row_count = $request->totalCount;
        $token = $this->getSavedToken();
        $apiURL = 'https://rapi.earthlink.iq/api/reseller/user/all';
        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json'
        ];
        $post_data = [
            "Rowcount" => $row_count,
            "OrderBy" => 'Account Name',

        ];
        $all_users_api = Http::withHeaders($headers)->post($apiURL, $post_data);
        $all_users_response = json_decode($all_users_api->getBody(), true);
        // return response(compact('all_users_response'));      

        if ($all_users_response) {
            if ($all_users_response['isSuccessful'] === true) {
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

                            'manual_expiration_date' => $dt['manualExpirationDate'],
                            'can_refill' => $dt['canRefill'],
                            'can_change_account' => $dt['canChangeAccount'],
                            'can_extend_user' => $dt['canExtendUser'],
                        ];
                        Customer::where('customer_user_index', $dt['userIndex'])->update($update_data);
                        continue; // for skip duplicate index                       
                    }
                    $existed_userIndex[] = $dt['userIndex'];

                    Customer::insert([
                        'account_index' => $dt['accountIndex'],
                        'sub_account_id' => $sub_account_id,
                        'affiliate_index' => $affiliate_index,
                        'first_name' => '',
                        'last_name' => '',
                        'customer_user_id' => $dt['userID'],
                        'customer_user_index' => $dt['userIndex'],
                        'mobile_number' => $dt['mobileNumber'],
                        'mobile_number2' => $dt['mobileNumber2'],
                        'address' => '',
                        'email' => $dt['userID'],
                        'user_password' => 1,
                        'city' => '',
                        'company' => '',
                        'state' => '',
                        'display_name' => $dt['displayName'],
                        'caller_id' => $dt['callerID'],
                        'customer_user_notes' => $dt['userNotes'],
                        'status' => $dt['onlineStatus'],
                        'account_status' => $dt['accountStatus'],
                        'account_package_type' => $dt['accountPackageType'],

                        'manual_expiration_date' => $dt['manualExpirationDate'],
                        'can_refill' => $dt['canRefill'],
                        'can_change_account' => $dt['canChangeAccount'],
                        'can_extend_user' => $dt['canExtendUser'],
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

    public function edit($index)
    {
        $token = $this->getSavedToken();

        return Inertia::render('Customers/Customers', [
            'show_data' => 'edit_form',
            'customer' => Customer::where('customer_user_index', $index)->firstOrFail(),
            'accounts' => Account::all(),
            'sub_accounts' => Sub_account::all(),
            'affiliates' => Affiliate::all(),
            'user_groups' => User_group::all(),
            'apitoken' => $token,
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
            'active_status' => 0,
        ];
        $data = Customer::where('customer_user_index', $index)->firstOrFail();
        $data->update($input);
        return redirect()->route('customers')->with('message', 'User is successfully disabled!');
    } // destroy      


    public function change_account(Request $request, $index)
    {
        // $input = $request->all();
        $input = [
            'account_index' => $request->AccountIndex,
        ];
        $data = Customer::where('customer_user_index', $index)->first();
        if ($data) {
            $data = Customer::where('customer_user_index', $index)->firstOrFail();
            $data->update($input);
            $message = 'Account is successfully updated!';
        } else {
            $message = 'No data found in local datebase!';
        }

        return redirect()->route('users.management')->with('message', $message);
    } // change_account

    public function details($index)
    {
        $token = $this->getSavedToken();
        $apiURL = 'https://rapi.earthlink.iq/api/reseller/user/' . $index;
        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json'
        ];
        $all_data_api = Http::withHeaders($headers)->get($apiURL);
        $all_data_response = json_decode($all_data_api->getBody(), true);

        if (\Illuminate\Support\Arr::has($all_data_response, 'value')) {
            $response_data = $all_data_response['value'];
        } else {
            $response_data = '';
        }

        return Inertia::render('Customers/Details', [
            'response_data' => $response_data,
            'accountTypes' => Account::all(),
            'apitoken' => $token
        ]);
    } // details

    public function notify($index)
    {
        $data = Customer::where('customer_user_index', $index)->get();
        $send_mobile = '';
        if (count($data) > 0) {
            $send_mobile = $data[0]['mobile_number'] ? $data[0]['mobile_number'] : $data[0]['mobile_number2'];
            // $send_mobile = '66952806757';
        }

        $token = 'd2FsYS1saW5rOldsQDFlZjZeYXpY';
        $apiURL = 'http://sms.alufiq.com/sms/2/text/advanced';
        $headers = [
            'Authorization' => 'Basic ' . $token,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json'
        ];

        $post_data = [
            "messages" => [
                "destinations" => [
                    "to" => $send_mobile // 41793026727
                ],
                "from" => "InfoSMS-Walaa",
                "text" => "Your account is going to expiring soon!"
            ]
        ];

        if ($send_mobile != '') {
            $sms_api = Http::withHeaders($headers)->post($apiURL, $post_data);
            $sms_api_response = json_decode($sms_api->getBody(), true);

            // return response(compact('sms_api_response'));

            // {"messages":[
            //     {"messageId":"4034247944424335443522",
            //         "status":{
            //             "description":"Message sent to next instance",
            //             "groupId":1,
            //             "groupName":"PENDING",
            //             "id":26,
            //             "name":"PENDING_ACCEPTED"
            //         },
            //         "to":"66952806757"}
            //     ]
            // }

            // $sms_api_response = '';

            if (\Illuminate\Support\Arr::has($sms_api_response, 'messages')) {
                if ($sms_api_response['messages'][0]['status']['name'] == 'PENDING_ACCEPTED') {
                    $update_data = [
                        'sms_status' => 1,
                        'sms_sent_by' => Auth::id(),
                    ];
                    $data = Customer::where('customer_user_index', $index)->firstOrFail();
                    $data->update($update_data);

                    return redirect()->route('customers')->with('message', 'Notification message is successfully sent!');
                }
            } else {
                return redirect()->route('customers')->with('error_message', 'Something went wrong in sending message!');
            }

        } else {
            return redirect()->route('customers')->with('error_message', 'Not found mobile number to send SMS.');
        }

    } // notify

}
