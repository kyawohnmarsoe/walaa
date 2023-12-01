<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use App\Http\Requests\StorePaymentRequest;
use App\Models\Payment;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class InvoiceController extends Controller
{
      public function index(){
        $token = $this->getSavedToken();  
        return Inertia::render('Invoices/Invoices',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'invoices' => Payment::orderBy('id','desc')->get(),
    ]);
    }

         public function create() 
     {   $token = $this->getSavedToken();  
        return Inertia::render('Invoices/Create',['apitoken' => $token]);
    }

     public function show($id){
        $token = $this->getSavedToken();  
        return Inertia::render('Invoices/Invoice',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'payment' => Payment::findOrFail($id),
    ]);
    }

     public function edit($id) 
     {   $token = $this->getSavedToken();  
        return Inertia::render('Invoices/Edit',[
          'apitoken' => $token,
          'payment' => Payment::findOrFail($id)
        ]);
    }

    
    public function store(Request $request)
    {
      //  dd($request);
      $balance=$request->payment['salePrice'];
      $data = [
        'invoinceID' => $request->payment['invoinceID'],
        'userIndex' => $request->payment['userIndex'],
        'displayName' => $request->payment['displayName'],
        'affiliateName' => $request->payment['affiliateName'],
        'invoiceType' => $request->payment['invoiceType'],
        'invoiceDescription' => $request->payment['invoiceDescription'],
        'invoiceDuration' => $request->payment['invoiceDuration'],
        'salePrice' => $request->payment['salePrice'],
        'retailPriceCurrency' => $request->payment['retailPriceCurrency'],
        'retailPrice' => $request->payment['retailPrice'],
        'referenceRecord' => $request->payment['referenceRecord'],
        'recordDate' => $request->payment['recordDate'],
        'lastStatusChanged' => $request->payment['lastStatusChanged'],
        'accountName' => $request->payment['accountName'],
        'notes' => $request->payment['notes'],
        'userID' => $request->payment['userID'],
        'discountedPrice' => $request->payment['discountedPrice'],
        'paymentDueDate' => $request->payment['paymentDueDate'],
        'paymentDueDateTime' => $request->payment['paymentDueDateTime'],
         'paidPrice' => $request->payment['paidPrice'],
         'balance' => $balance,
         'invoiceStatus' => $request->payment['invoiceStatus'],
         'notes' => $request->payment['notes'],
         'modifyUser' => $request->payment['modifyUser'],
      ];

     
      Payment::create($data);
      // return  redirect()->route('users.management')->with('status', 201);  
      return redirect()->route('invoices')->with('status', 201);
       
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

      return redirect()->route('invoices')->with('status', 201); 
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
     
      return Inertia::render('Invoices/Invoices',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'invoices' => $results,
    ]);

    // return redirect()->route('payments',[
    //         'apitoken' => $token,
    //         'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
    //         'payments' => $results,
    // ]);  

    }

}
