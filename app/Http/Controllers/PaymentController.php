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

class PaymentController extends Controller
{
      public function index(){
        $token = $this->getSessionToken();  
        return Inertia::render('Payments/Payments',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'payments' => Payment::orderBy('id','desc')->get(),
    ]);
    }

         public function create() 
     {   $token = $this->getSessionToken();  
        return Inertia::render('Payments/Create',['apitoken' => $token]);
    }

     public function show($id){
        $token = $this->getSessionToken();  
        return Inertia::render('Payments/Invoice',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'payment' => Payment::findOrFail($id),
    ]);
    }

     public function edit($id) 
     {   $token = $this->getSessionToken();  
        return Inertia::render('Payments/Edit',[
          'apitoken' => $token,
          'payment' => Payment::findOrFail($id)
        ]);
    }

    
    public function store(Request $request)
    {
      //  dd($request);
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
        'invoiceStatus' => $request->payment['invoiceStatus'],
        'lastStatusChanged' => $request->payment['lastStatusChanged'],
        'accountName' => $request->payment['accountName'],
        'notes' => $request->payment['notes'],
        'userID' => $request->payment['userID'],
        'paidPrice' => $request->payment['paidPrice'],
        'modifyUser' => $request->payment['modifyUser'],
        'discountedPrice' => $request->payment['discountedPrice'],
        'paymentDueDate' => $request->payment['paymentDueDate'],
        'paymentDueDateTime' => $request->payment['paymentDueDateTime']
      ];

     
      Payment::create($data);
      // return  redirect()->route('users.management')->with('status', 201);  
      return  redirect()->route('payments')->with('status', 201);  
       
    }

        public function update(Request $request,$id)
    {
      $data = $request->payment;
		  $payment = Payment::findOrFail($id);
      // return $payment;
		  $payment->update($data);
        return redirect()->route('payments')->with('status', 200); 
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
     
       $token = $this->getSessionToken();  
     
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
