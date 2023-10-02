<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Http;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function GetApiToken()
    {
        // $apiURL = 'https://rapi.earthlink.iq/api/reseller/Token' ;  
        // $data = [
        //     "username"   => "walaaim",
        //     "password"   => "@walaalink@",
        //     "loginType"  => "1",
        //     "grant_type" => "password"
        // ]; 
        // $api_response       = Http::asForm()->post($apiURL, $data);
        // $api_response_token = json_decode($api_response->getBody(), true); 
        // $api_token = $api_response_token ? $api_response_token['access_token'] : null;

        $api_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IndhbGFhaW0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJSZXNlbGxlciIsIkFmZmlsaWF0ZUluZGV4IjoiNjMwMzEiLCJBZmZpbGlhdGVOYW1lIjoid2FsYWFsaW5rMSIsIkFwcGxpY2F0aW9uTmFtZSI6IlJlc2VsbGVyIiwibmJmIjoxNjk2MjQzNDM4LCJleHAiOjE2OTYyNDcwMzgsImlzcyI6ImJpbGxpbmdhcGkiLCJhdWQiOiJkMjZkMTFkZTUxYmE0YmE2YWQ0ZGVhZTc5ODY1Mzk4YiJ9.th_QqV0Yao29Gp8pHzSi29Bn6VrOLhoo5rVpm9wzMnE';

        // $api_token=null;
        return $api_token;
    } // GetApiToken



}
