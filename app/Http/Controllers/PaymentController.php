<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use App\Http\Requests\StorePaymentRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class PaymentController extends Controller
{
      public function index(){
        $token = $this->getSavedToken();  
        return Inertia::render('Payments/Payments',[
            'customers' => Customer::orderBy('id','desc')->get(),
           
            'payments' => Payment::orderBy('id','desc')->get(),
    ]);
    }

          // public function search($userId){
         
          // return Inertia::render('Payments/Payments',[
          // 'payments' => Payment::orderBy('id','desc')->get(),
          // 'customers' => Customer::orderBy('id','desc')->get(),
          // 'invoices' => Invoice::orderBy('id','desc')->get()
          // ]);
          // }

         public function create() 
     {   $token = $this->getSavedToken();  
        return Inertia::render('Payments/Create',['apitoken' => $token]);
    }

     public function show($id){
        $token = $this->getSavedToken();  
        return Inertia::render('Payments/Invoice',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'payment' => Payment::findOrFail($id),
    ]);
    }

     public function edit($id) 
     {   $token = $this->getSavedToken();  
        return Inertia::render('Payments/Edit',[
          'apitoken' => $token,
          'payment' => Payment::findOrFail($id)
        ]);
    }

    
    public function store(Request $request)
    {
     
      
      $data = [
        'display_name' => $request->payment['display_name'],
        'mobile_number' => $request->payment['mobile_number'],
        'customer_user_index' => $request->payment['customer_user_index'],
        'prev_balance' => $request->payment['prev_balance'],
        'paid_amount' => $request->payment['paid_amount'],
        'current_balance' => $request->payment['current_balance'],
        'notes' => $request->payment['notes'],
        'modify_user' => Auth::user()->name,
      ];

     
      Payment::create($data);

      // $customer = Customer::where('customer_user_index', $request->payment['customer_user_index'])->firstOrFail();
      
      DB::table('customers')
      ->where('customer_user_index', $request->payment['customer_user_index'])
      ->update(['balance' => $request->payment['current_balance']]);

      $user = User::findOrFail(Auth::user()->id);

      DB::table('users')
      ->where('id', Auth::user()->id)
      ->update(['balance' => $user->balance + $request->payment['paid_amount'] ]);

     
      // return  redirect()->route('users.management')->with('status', 201);  
      return  redirect()->route('payments')->with('status', 201);  
       
    }

        public function update(Request $request,$id)
    {
            
            $user = User::where('email', $request->payment['modifyUser'])->firstOrFail();
            // $user = User::findOrFail(1);
           
            $walletBalance = $user['balance'] + $request->payment['currentPayment'];

            //  dd($walletBalance);

      $payment = Payment::findOrFail($id);

      $paidPrice = $payment['paidPrice'] + $request->payment['currentPayment'];
      $balance = $payment['salePrice'] - $paidPrice;
      
      if($balance == 0){
        $invoiceStatus = 'Paid';
      }else{
        $invoiceStatus = 'NotPaid';
      };

     

       $data = [
       'invoinceID' => $payment['invoinceID'],
       'userIndex' => $payment['userIndex'],
       'displayName' => $payment['displayName'],
       'affiliateName' => $payment['affiliateName'],
       'invoiceType' => $payment['invoiceType'],
       'invoiceDescription' => $payment['invoiceDescription'],
       'invoiceDuration' => $payment['invoiceDuration'],
       'salePrice' => $payment['salePrice'],
       'retailPriceCurrency' => $payment['retailPriceCurrency'],
       'retailPrice' => $payment['retailPrice'],
       'referenceRecord' => $payment['referenceRecord'],
       'recordDate' => $payment['recordDate'],
       'lastStatusChanged' => $payment['lastStatusChanged'],
       'accountName' => $payment['accountName'],
       'userID' => $payment['userID'],
       'discountedPrice' => $payment['discountedPrice'],
       'paymentDueDate' => $payment['paymentDueDate'],
       'paymentDueDateTime' => $payment['paymentDueDateTime'],
        'paidPrice' => $paidPrice,
        'balance' => $balance,
         'invoiceStatus' => $invoiceStatus,
         'notes' => $request->payment['notes'],
         'modifyUser' => $request->payment['modifyUser'],
       ];

      // dd($data);
		  $payment->update($data);

      $result = User::where('email', $request->payment['modifyUser'])->update(['balance' => $walletBalance]);

      return redirect()->route('payments')->with('status', 201); 
    }

      public function search(Request $request)
    {
    
      $userID = $request['userID'];
      $affiliateName = $request['affiliateName'];
      $invoiceStatus = $request['invoiceStatus'];

      $results = Payment::orderBy('id','desc')->get();

      if ($userID) {
        $results = Payment::where('userID', 'LIKE', "%$userID%")->get();
        
      }
      if ($affiliateName){
           $results = Payment::where('affiliateName', 'LIKE', "%$affiliateName%")->get();
           
        }
        if ($invoiceStatus){
           $results = Payment::where('invoiceStatus', "$invoiceStatus")->get();
           
        }
     
       $token = $this->getSavedToken();  
     
      return Inertia::render('Payments/Payments',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'payments' => $results,
    ]);

    // return redirect()->route('payments',[
    //         'apitoken' => $token,
    //         'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
    //         'payments' => $results,
    // ]);  

    }

}
