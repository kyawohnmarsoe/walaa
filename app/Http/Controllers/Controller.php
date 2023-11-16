<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Http;
// use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function GetApiToken()
    {
        $apiURL = 'https://rapi.earthlink.iq/api/reseller/Token' ;  
        $data = [
            "username"   => "walaaim",
            "password"   => "@walaalink@",
            "loginType"  => "1",
            "grant_type" => "password"
        ]; 
        
        $api_response       = Http::asForm()->post($apiURL, $data);

         if (!$api_response){
            return "can not get token";
         }

        $api_response_token = json_decode($api_response->getBody(), true); 
        $api_token = $api_response_token ? $api_response_token['access_token'] : null;

        // $api_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IndhbGFhaW0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJSZXNlbGxlciIsIkFmZmlsaWF0ZUluZGV4IjoiNjMwMzEiLCJBZmZpbGlhdGVOYW1lIjoid2FsYWFsaW5rMSIsIkFwcGxpY2F0aW9uTmFtZSI6IlJlc2VsbGVyIiwibmJmIjoxNjk2MjM5ODA0LCJleHAiOjE2OTYyNDM0MDQsImlzcyI6ImJpbGxpbmdhcGkiLCJhdWQiOiJkMjZkMTFkZTUxYmE0YmE2YWQ0ZGVhZTc5ODY1Mzk4YiJ9.Iw4oR_Yh0XRoPTZ7G9RZwN_A1QrmN7if09WTxr5BhEM';
        
        return $api_token;

        // $output = array(
        //     'api_token' => $api_response_token['access_token'],
        //     'expires_in' => $api_response_token['expires_in']
        //   );
        // return response($output);
    } // GetApiToken

    public function getSessionToken() {
        $session_api_token = session('apitoken'); 
       
        // $maxIdleTime = config('session.lifetime') * 60;
        $maxIdleTime = 720;
        if (time() - session('current_time') > $maxIdleTime) {
            session()->forget(['apitoken', 'current_time']);

            $new_api_token = $this->GetApiToken();
            // session([
            //     'apitoken' => $new_api_token, 
            //     'current_time' => time()
            // ]);
            session()->put(['apitoken' => $new_api_token, 'current_time' => time()]);
            $session_api_token = session('apitoken'); 
        }
        // $session_current_time = session('current_time');
        // $current_time = time();
        return $session_api_token;
        // return response(compact('session_api_token', 'session_current_time', 'current_time', 'maxIdleTime'));
    }

     public function getSessionTokenTest() {
         $session_api_token = session('apitoken'); 

         if (!$session_api_token){
            return "can not get token";
         }else{
            return $session_api_token;
         }
         
     }
    
}
