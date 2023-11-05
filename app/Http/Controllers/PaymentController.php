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

     public function show($id){
        $token = $this->getSessionToken();  
        return Inertia::render('Payments/PaymentDetails',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'payment' => Payment::findOrFail($id),
    ]);
    }

     public function create(Request $request) 
     {

        $token = $this->getSessionToken();  
        return Inertia::render('Payments/Create',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get()
    ]);
    }

    
    public function store(Request $request)
    {
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
        // 'notes' => $request->payment['notes'],
        'userID' => $request->payment['userID'],
        'paidPrice' => $request->payment['paidPrice'],
        'discountedPrice' => $request->payment['discountedPrice'],
        'paymentDueDate' => $request->payment['paymentDueDate']
        // 'paymentDueDateTime' => $request->payment['paymentDueDateTime']
      ];

      Payment::create($data);
      return  redirect()->route('users.management')->with('status', 201);  
        // $validated = $request->validated([
        //    'userIndex' => 'required',
        //    'displayName' => 'required',
        // ]);    

    }

}
