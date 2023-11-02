<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
         return [           
        'userIndex'=> 'required',
        'accountType'=> 'required',
        'price'=> 'required',
        'startDate'=> 'required',
        'endDate'=> 'required',
        'invoiceDate'=> 'required',
        'paymentDate'=> 'required',
        'invoiceType'=> 'required',
        'description'=> 'required',
        'notes'=> 'required',
        'status'=> 'required',
        'paidAmount'=> 'required',
        ];
    }
}
