<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Twilio\Rest\Client;

class WhatsAppController extends Controller
{
    public function send_whatsapp($index)
    {
        // Testing with infobip
        $data = Customer::where('customer_user_index', $index)->get();
        $send_mobile = '';
        if (count($data) > 0) {
            $send_mobile = $data[0]['mobile_number'] ? $data[0]['mobile_number'] : $data[0]['mobile_number2'];
            $email = $data[0]['customer_user_id'];
            // $send_mobile = '66952806757'; //  959425324224
        }

        $token = 'App d2cb4f14f7e3aa18ce494c8ba5d7d26a-2883dddd-294a-4cc5-b69d-cd107ec9cd28';
        $apiURL = 'https://qyqzqw.api.infobip.com/whatsapp/1/message/template';
        $headers = [
            'Authorization' => $token,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json'
        ];

        $post_data = [
            "messages" => [
                [
                    "from" => "447860099299",
                    "to" => $send_mobile,
                    // "messageId" => "0bc55e32-1fc1-491f-82ad-1d1908c277e8",
                    "content" => [
                        "templateName" => "message_test",
                        "templateData" => ["body" => ["placeholders" => [$email]]],
                        "language" => "en"
                    ]
                ]
            ]
        ];

        if ($send_mobile != '') {
            $whatsapp_api = Http::withOptions([
                'headers' => $headers,
                'follow_redirects' => TRUE
            ])->post($apiURL, $post_data);
            $whatsapp_api_response = json_decode($whatsapp_api->getBody(), true);

            // return response(compact('whatsapp_api_response'));

            if (\Illuminate\Support\Arr::has($whatsapp_api_response, 'messages')) {
                if ($whatsapp_api_response['messages'][0]['status']['groupName'] == 'PENDING') {
                    $update_data = [
                        'sms_status' => 1,
                        'sms_sent_by' => Auth::id(),
                    ];
                    $data = Customer::where('customer_user_index', $index)->firstOrFail();
                    // $data->update($update_data);

                    return redirect()->route('customers')->with('message', 'Message is successfully sent via Whatsapp!');
                } else {
                    return redirect()->route('customers')->with('error_message', $whatsapp_api_response['messages'][0]['status']['description']);
                }
            } else {
                return redirect()->route('customers')->with('error_message', 'Something went wrong in sending Whatsapp message!');
            }
        } else {
            return redirect()->route('customers')->with('error_message', 'Not found mobile number to send Whatsapp message.');
        }

        // Testing with Twilio 
        // $twilioSid = config('app.twilio_sid');
        // $twilioToken = config('app.twilio_auth_token');
        // $twilioWhatsAppNumber = config('app.twilio_whatsapp_number');

        // $recipientNumber = "whatsapp:+959425324224"; // +66952806757
        // $message = "Hello from Twilio WhatsApp API Test in Laravel!";

        // $twilio = new Client($twilioSid, $twilioToken);

        // try {
        //     $twilio->messages->create(
        //         $recipientNumber,
        //         [
        //             "from" => "whatsapp:" . $twilioWhatsAppNumber,
        //             "body" => $message,
        //         ]
        //     );

        //     // return response()->json(['message' => 'WhatsApp message sent successfully']);
        //     return redirect()->back()->with('message', 'WhatsApp message sent successfully');
        // } catch (\Exception $e) {
        //     // return response()->json(['error_message' => $e->getMessage()], 500);
        //     return redirect()->back()->with('error_message', $e->getMessage());
        // }
    }
}
