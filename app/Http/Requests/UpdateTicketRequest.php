<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTicketRequest extends FormRequest
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
        ];
    }
}
