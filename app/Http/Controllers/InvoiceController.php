<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use App\Http\Requests\StorePaymentRequest;
use App\Models\Invoice;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Collection;
use Illuminate\Support\Arr;
use App\Models\Account;
use App\Models\Sub_account;

class InvoiceController extends Controller
{
     public function getInvoicesByCustomerGroup($inv){
      $cusDataByLoginUserGroupId = $this->getUserIndexReqData_byLoggedInGroupSysUserId();
      // $invoices = Invoice::orderBy('id','desc')->get()->all();
      $invoices=$inv;

      if ($cusDataByLoginUserGroupId !== 'all'){
        $filteredInvoices=[];

        foreach ($cusDataByLoginUserGroupId as $c) {

          $results = Arr::where($invoices, function ($value, $key) use($c) {
         
          return $value['userIndex'] == $c["customer_user_index"];

          });

          array_push($filteredInvoices,...$results );
        
        }

         return $filteredInvoices;
      }

      return $invoices;
     }
  
      public function index(){
        $token = $this->getSavedToken();  

        $cusDataByLoginUserGroupId = $this->getUserIndexReqData_byLoggedInGroupSysUserId();
        // $customers = response(compact('cusDataByLoginUserGroupId'));
        $accounts = Account::join('sub_accounts', 'sub_accounts.account_index', '=', 'accounts.account_index')
        ->get(['accounts.account_price', 'sub_accounts.*']);
        return Inertia::render('Invoices/Invoices',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'invoices'=> Invoice::orderBy('id','desc')->get()->all(),
            'userIndexByGroup' => $cusDataByLoginUserGroupId,
             'customers'=>Customer::orderBy('customer_user_id','asc')->get(),
             'accounts'=> $accounts
            
    ]);
    }

          public function search(Request $request)
          {
           
          $userID = $request['userID'];
          $affiliateName = $request['affiliateName'];
          $invoiceStatus = $request['invoiceStatus'];

           $results = Invoice::orderBy('id','desc')->get()->all();

          $token = $this->getSavedToken();
         $cusDataByLoginUserGroupId = $this->getUserIndexReqData_byLoggedInGroupSysUserId();
       
          return Inertia::render('Invoices/Invoices',[
          'apitoken' => $token,
          'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
          'invoices' => $results,
           'userIndexByGroup' => $cusDataByLoginUserGroupId,
           
          ]);

          }



         public function create() 
     {   $token = $this->getSavedToken();  
        $cusDataByLoginUserGroupId = $this->getUserIndexReqData_byLoggedInGroupSysUserId();
          $accounts = Account::join('sub_accounts', 'sub_accounts.account_index', '=', 'accounts.account_index')
          ->get(['accounts.account_price', 'sub_accounts.*']);
         
        return Inertia::render('Invoices/Create',[
          'apitoken' => $token,
           'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
           'userIndexByGroup' => $cusDataByLoginUserGroupId,
           'customers'=>Customer::orderBy('customer_user_id','asc')->get(),
           'accounts'=> $accounts
        ]);
    }

     public function show($id){
        $token = $this->getSavedToken();  
        // dd($token);
        return Inertia::render('Invoices/Invoice',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'invoice' => Invoice::findOrFail($id),
    ]);
    }

     public function edit($id) 
     {   $token = $this->getSavedToken();  
        return Inertia::render('Invoices/Edit',[
          'apitoken' => $token,
          'invoice' => Invoice::findOrFail($id)
        ]);
    }

    
    public function store(Request $request)
    {
      
      return $request->invoice;
      // dd($request);

      $balance=$request->invoice['salePrice'];
      $data = [
        'invoinceID' => $request->invoice['invoinceID'],
        'userIndex' => $request->invoice['userIndex'],
        'displayName' => $request->invoice['displayName'],
        'affiliateName' => $request->invoice['affiliateName'],
        'invoiceType' => $request->invoice['invoiceType'],
        'invoiceDescription' => $request->invoice['invoiceDescription'],
        'invoiceDuration' => $request->invoice['invoiceDuration'],
        'salePrice' => $request->invoice['salePrice'],
        'retailPriceCurrency' => $request->invoice['retailPriceCurrency'],
        'retailPrice' => $request->invoice['retailPrice'],
        'referenceRecord' => $request->invoice['referenceRecord'],
        'recordDate' => $request->invoice['recordDate'],
        'lastStatusChanged' => $request->invoice['lastStatusChanged'],
        'accountName' => $request->invoice['accountName'],
        'userID' => $request->invoice['userID'],
        'discountedPrice' => $request->invoice['discountedPrice'],
        'paymentDueDate' => $request->invoice['paymentDueDate'],
         'paidPrice' => $request->invoice['paidPrice'],
         'balance' => $balance,
         'invoiceStatus' => $request->invoice['invoiceStatus'],
         'notes' => $request->invoice['notes'],
         'modifyUser' => $request->invoice['modifyUser'],
      ];

      // return $data;
      // return $request->invoice['invoiceDuration'];

      Invoice::create($data);
      // return  redirect()->route('users.management')->with('status', 201);  
      return redirect()->route('invoices')->with('status', 200);
       
    }

        public function storeData(Request $request)
        {

        // return $request->invoice;
        // dd($request);

       
        $customer=Customer::where('customer_user_index',$request->invoice['userIndex'])->first();
        $sub_account=Sub_account::where('account_name',$request->invoice['accountName'])->first();
        $balance=$sub_account->end_user_account_price;
        $invoiceFrom = str_replace("-","/",$request->invoice['invoiceFrom']);
        $invoiceTo = str_replace("-","/",$request->invoice['invoiceTo']);
        $invoiceDuration= $invoiceFrom . ' - ' . $invoiceTo;
        $invoiceDescription = $request->invoice['accountName'] . ' for period ' . '[' . $invoiceDuration . ']';

        // return($sub_account->end_user_account_price);

        $data = [
        'invoinceID' => $request->invoice['invoinceID'],
        'userIndex' => $request->invoice['userIndex'],
        'displayName' => '',
        'affiliateName' => $request->invoice['affiliateName'],
        'invoiceType' => $request->invoice['invoiceType'],
        'invoiceDescription' => $invoiceDescription,
        'invoiceDuration' => $invoiceDuration,
        'salePrice' => $sub_account->end_user_account_price,
        'retailPriceCurrency' => '',
        'retailPrice' => '',
        'referenceRecord' => $request->invoice['referenceRecord'],
        'recordDate' => '',
        'lastStatusChanged' => '',
        'accountName' => $request->invoice['accountName'],
        'userID' => $customer->customer_user_id,
        'discountedPrice' => '',
        'paymentDueDate' => '',
        'paidPrice' => $request->invoice['paidPrice'],
        'balance' => $balance,
        'invoiceStatus' => $request->invoice['invoiceStatus'],
        'notes' => $request->invoice['notes'],
        'modifyUser' => $request->invoice['modifyUser'],
        ];

        // return $data;
        // return $request->invoice['invoiceDuration'];

        Invoice::create($data);
        // return redirect()->route('users.management')->with('status', 201);
        return redirect()->route('invoices')->with('status', 200);

        }

        public function update(Request $request,$id)
    {
            
            $user = User::where('email', $request->invoice['modifyUser'])->firstOrFail();
            // $user = User::findOrFail(1);
           
            $walletBalance = $user['balance'] + $request->invoice['currentPayment'];

            //  dd($walletBalance);

      $invoice = Invoice::findOrFail($id);

      $paidPrice = $invoice['paidPrice'] + $request->invoice['currentPayment'];
      $balance = $invoice['salePrice'] - $paidPrice;
      
      if($balance == 0){
        $invoiceStatus = 'Paid';
      }else{
        $invoiceStatus = 'NotPaid';
      };

     

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
       'userID' => $invoice['userID'],
       'discountedPrice' => $invoice['discountedPrice'],
       'paymentDueDate' => $invoice['paymentDueDate'],
       'paymentDueDateTime' => $invoice['paymentDueDateTime'],
        'paidPrice' => $paidPrice,
        'balance' => $balance,
         'invoiceStatus' => $invoiceStatus,
         'notes' => $request->invoice['notes'],
         'modifyUser' => $request->invoice['modifyUser'],
       ];

      // dd($data);
		  $invoice->update($data);

      $result = User::where('email', $request->invoice['modifyUser'])->update(['balance' => $walletBalance]);

      return redirect()->route('invoices')->with('status', 201); 
    }



}
