<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function getErrorLog(){
        $token = $this->getSessionToken();  
        return Inertia::render('Logs/Error',[
            'apitoken' => $token,
            'affiliates' => Affiliate::all()
    ]);
    }
}
