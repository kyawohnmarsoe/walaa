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
        $api_response_token = json_decode($api_response->getBody(), true); 
        $api_token = $api_response_token ? $api_response_token['access_token'] : null;

        // $api_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IndhbGFhaW0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJSZXNlbGxlciIsIkFmZmlsaWF0ZUluZGV4IjoiNjMwMzEiLCJBZmZpbGlhdGVOYW1lIjoid2FsYWFsaW5rMSIsIkFwcGxpY2F0aW9uTmFtZSI6IlJlc2VsbGVyIiwibmJmIjoxNjk2MjM5ODA0LCJleHAiOjE2OTYyNDM0MDQsImlzcyI6ImJpbGxpbmdhcGkiLCJhdWQiOiJkMjZkMTFkZTUxYmE0YmE2YWQ0ZGVhZTc5ODY1Mzk4YiJ9.Iw4oR_Yh0XRoPTZ7G9RZwN_A1QrmN7if09WTxr5BhEM';
        
        return $api_token;
    } // GetApiToken

    public function getSessionToken() {
        $session_api_token = session('apitoken'); 

        $maxIdleTime = config('session.lifetime') * 60;
        if (time() - session('current_time') > $maxIdleTime) {
            session()->forget('apitoken', 'current_time');
            $api_token = $this->GetApiToken();
            session([
                'apitoken' => $api_token, 
                'current_time' => time()
            ]);
            $session_api_token = session('apitoken'); 
        }
        return $session_api_token;
    }
    
}
