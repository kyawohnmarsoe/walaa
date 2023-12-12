<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Http;
// use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use App\Models\Apitoken;
use App\Models\User_group;
use App\Models\User_has_group;
use App\Models\Customer;

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
        // dd($api_response) ;
        if (!$api_response){
            return "can not get token";
        }
        $api_response_token = json_decode($api_response->getBody(), true); 
        $api_token = $api_response_token ? $api_response_token['access_token'] : null;  
        return $api_token;
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

    public function getSavedToken() {
        
        $apiData = Apitoken::all(); 
        //  dd($api_token);
        if($apiData->count() == 0)   {            
            $api_token = $this->GetApiToken();
            Apitoken::insert([
                'apitoken' => $api_token,
                'current_time'  => time(),               
            ]); 
        }  else {
            $current_time = $apiData[0]['current_time'];
            $maxIdleTime = 3599;
            if (time() - $current_time > $maxIdleTime) {  
                $new_api_token = $this->GetApiToken();   
                $new_data = [
                    'apitoken' => $new_api_token, 
                    'current_time' => time()
                ];  

                $all = Apitoken::all();
                $id = $all[0]['id'];
                $update_apiData = Apitoken::findOrFail($id);
                $update_apiData->update($new_data);                
            }	
        }
        
        // $new_apiData = Apitoken::findOrFail(1);
        $new_apiData = Apitoken::all();
       
        $api_token = $new_apiData[0]['apitoken'];
       
        return $api_token;
    }

    public function getLoggedInUserGroup() {
        $user = Auth::user();
        $loggedin_user_id = $user->id;
        $user_has_groups_idArr = User_has_group::where('user_id',$loggedin_user_id)->get('group_id');
        
        return $user_has_groups_idArr;
    }

    public function getUserIndexReqData_byLoggedInGroupSysUserId() {
        $user = Auth::user();
        $loggedin_user_id = $user->id;
        $user_has_groups_idArr = User_has_group::where('user_id',$loggedin_user_id)->get('group_id');
        
        $count_user_groups = User_group::count();

        if(count($user_has_groups_idArr) == 0 || $count_user_groups == count($user_has_groups_idArr)){
            $customers = Customer::get();            
        } else {
            $customers = Customer::whereIn('customers.user_group_id', $user_has_groups_idArr)
                        ->get();
        }
        return $customers;
    }
    
}
