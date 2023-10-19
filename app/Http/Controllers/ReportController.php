<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function getUserSessions(){
        $token = $this->getSessionToken();  
        return Inertia::render('Reports/Sessions/UserSessions',[
            'apitoken' => $token,
            'affiliates' => Affiliate::all()
    ]);
    }
}
