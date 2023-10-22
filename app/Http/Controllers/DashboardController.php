<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $token = $this->getSessionToken();     
        
        return Inertia::render('Dashboard', [
            'apitoken' => $token
        ]);
    } // dashboard

     public function test()
    {
        $token = $this->getSessionToken();     
        
        return Inertia::render('Test', [
            'apitoken' => $token
        ]);
    } // dashboard

   
}
