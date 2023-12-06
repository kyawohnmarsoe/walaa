<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
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
        'invoinceID' => 'required',
           'userIndex' => 'required',
           'displayName' => 'required',
           'affiliateName' => 'required',
           'invoiceType' => 'required',
           'invoiceDescription' => 'required',
           'invoiceDuration' => 'required',
           'salePrice' => 'required',
           'retailPriceCurrency' => 'required',
           'retailPrice' => 'required',
           'referenceRecord' => 'required',
           'recordDate' => 'required',
           'invoiceStatus' => 'required',
           'lastStatusChanged' => 'required',
           'accountName' => 'required',
           'notes' => 'required',
           'userID' => 'required',
           'paidPrice' => 'required',
           'discountedPrice' => 'required',
           'paymentDueDate' => 'required',
           'paymentDueDateTime' => 'required'
        ];
    }
}
