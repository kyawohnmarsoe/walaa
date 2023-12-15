<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class ApidataController extends Controller
{
    public function index(){
         $token = $this->getSavedToken();
          $totalCount = $this->get_totalcount();
         return Inertia::render('Apidata/Apidata', [
         'apitoken' => $token,
         'totalCount'=> $totalCount,
         ]);
    }
}
