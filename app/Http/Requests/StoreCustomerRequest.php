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
            'sub_account_id' => '',
            'affiliate_index' => 'required',            
            'email'=> 'required|email',
            'user_password' => 'required',            
        ];
    }
}
