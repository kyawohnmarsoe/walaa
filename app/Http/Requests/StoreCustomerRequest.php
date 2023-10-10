<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
   
    public function rules()
    {
        return [         
            'account_index' => 'required',
            'affiliate_index' => 'required',             
            'first_name'=> '',
            'last_name'=> '',
            'customer_user_id'=> 'required',
            'customer_user_index'=> '',
            'mobile_number'=> '',
            'mobile_number2'=> '',
            'address'=> '',
            'email'=> 'required|email',
            'city'=>'',
            'user_active_manage'=> '',
            'company'=> '',
            'state'=> '',
            'display_name'=> '',
            'caller_id'=> '',
            'customer_user_notes'=> '',  
        ];
    }
}
