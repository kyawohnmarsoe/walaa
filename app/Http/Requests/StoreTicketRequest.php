<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

   
    public function rules(): array
    {
        return [         
            'user_id' => 'required',
            'ticket_source' => 'required',             
            'topic'=> '',
            'ticket_address'=> '',
            'level_of_importance'=> 'required',
            'ticket_number'=> 'required',
            'image' => [ 'nullable','image','mimes:jpeg,png,jpg,gif,svg', 'max:2048'], // 2M
            'attach_file' => [ 'nullable','mimes:doc,docx,pdf,csv,xlsx,xls', 'max:2048'],
        ];
    }
}
