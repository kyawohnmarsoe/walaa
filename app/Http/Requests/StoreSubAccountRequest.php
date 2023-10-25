<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubAccountRequest extends FormRequest
{
   
    public function authorize(): bool
    {
        return true;
    }
   
    public function rules(): array
    {
        return [           
            'account_index' => 'required',
            'account_name' => 'required',             
            'is_max_account'=> '',
            'account_description'=> '',
            'end_user_account_price'=> 'required'            
        ];
    }
}
