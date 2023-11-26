<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $token = $this->getSavedToken();    
        
        return Inertia::render('Dashboard', [
            'apitoken' => $token
        ]);
    } // dashboard

     public function test()
    {
        // $token = $this->getSavedToken();
       
        return Inertia::render('Test', [
            // 'apitoken' => $token
        ]);
    } // dashboard

         public function test2()
         {
       

         $headers=['Content-Type'=> 'application/json',];
         $apiURL = 'https://rapi.earthlink.iq/api/reseller/Token' ;
         $data = [
         "username" => "walaaim",
         "password" => "@walaalink@",
         "loginType" => "1",
         "grant_type" => "password"
         ];


         $api_response = Http::asForm()->post($apiURL, $data);
         dd($api_response->object());

         return view('test', [
         //'apitoken' => $token
         ]);
         } 

}
