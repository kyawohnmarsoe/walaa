<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Affiliate;
use App\Models\Account;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('Customers/Customers', [
            'customers' => Customer::all(),
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
    
    public function store() {
        return Inertia::render('Customers/Customers');
    } // store
}
