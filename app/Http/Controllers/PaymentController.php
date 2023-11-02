<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use App\Http\Requests\StorePaymentRequest;
use App\Models\Payment;


class PaymentController extends Controller
{
      public function index(){
        $token = $this->getSessionToken();  
        return Inertia::render('Payments/Payments',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get()
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


     public function store(StorePaymentRequest $request)
     {
        $validated = $request->validated();
        $payment = Payment::create($validated);
        return redirect()->route('payments.create')->with('status', 201);   

    }

}
