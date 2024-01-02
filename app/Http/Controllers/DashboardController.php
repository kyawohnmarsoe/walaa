<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Board;
use Illuminate\Support\Facades\Auth;


class DashboardController extends Controller
{
    public function dashboard()
    {
        $token = $this->getSavedToken();         
        // dd(Board::all());
        $board=Board::all();
        return Inertia::render('Dashboard', [
            'apitoken' => $token,
            'board'=>$board
        ]);
    } // dashboard

     public function writing(Request $request)
     {
        //  dd($request );
        //  return $request->id;
        $id = $request->id;
       
        $board = Board::findorfail($id);
        $data=[
             "writing" => $request->board,
             'modifyUser'=> Auth::user()->name,
        ];
        $board->update($data);
        return 'ok';
     }
    
    //========= Start Get Data From API =========//
    public function get_statsList() {
        $token   = $this->getSavedToken();
        $apiURL  = 'https://rapi.earthlink.iq/api/reseller/home/Dashboard' ;  
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        
        $all_data_api = Http::withHeaders($headers)->get($apiURL);
        $all_data_response  = json_decode($all_data_api->getBody(), true);        
        
        return $all_data_response;     
    } // get_statsList

    public function get_servicePhones() {
        $token   = $this->getSavedToken();
        $apiURL  = 'https://rapi.earthlink.iq/api/reseller/support/phones' ;  
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        
        $all_data_api = Http::withHeaders($headers)->get($apiURL);
        $all_data_response  = json_decode($all_data_api->getBody(), true);        
        
        return $all_data_response;    
    } // get_servicePhones

    //========= End Get Data From API =========//
    
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
