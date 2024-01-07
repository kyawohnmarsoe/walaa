<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;

class WhatsAppController extends Controller
{
    public function send_whatsapp()
    {
        $twilioSid = config('app.twilio_sid');
        $twilioToken = config('app.twilio_auth_token');
        $twilioWhatsAppNumber = config('app.twilio_whatsapp_number'); 

        $recipientNumber = "whatsapp:+959425324224"; // +66952806757
        $message = "Hello from Twilio WhatsApp API Test in Laravel!";

        $twilio = new Client($twilioSid, $twilioToken);

        try {
            $twilio->messages->create(
                $recipientNumber,
                [
                    "from" => "whatsapp:".$twilioWhatsAppNumber,
                    "body" => $message,
                ]
            );

            // return response()->json(['message' => 'WhatsApp message sent successfully']);
            return redirect()->back()->with('message', 'WhatsApp message sent successfully');
        } catch (\Exception $e) {
            // return response()->json(['error_message' => $e->getMessage()], 500);
            return redirect()->back()->with('error_message', $e->getMessage());
        }
    }
}
