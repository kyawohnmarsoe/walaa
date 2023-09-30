<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('Customers/Customers', [
            'customers' => Customer::all()
        ]);
    } // index

    public function create() {

    } // create
}
