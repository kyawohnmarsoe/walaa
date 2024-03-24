<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Support\Facades\Http;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\AffiliatesPayment;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class AffiliateController extends Controller
{
    public function index()
    {
        $token = $this->getSavedToken();
        return Inertia::render('Affiliates/Affiliates', [
            'affiliates' => Affiliate::orderBy('affiliate_name', 'asc')->get(),
            'apitoken' => $token,

        ]);
    } // index    

    public function payments()
    {

        // $token = $this->getSavedToken();
        return Inertia::render('Affiliates/Payments', [
            'affiliates' => Affiliate::orderBy('affiliate_name', 'asc')->get(),

            'customers' => Customer::orderBy('id', 'desc')->get(),

            'affiliates_payments' => AffiliatesPayment::orderBy('id', 'desc')->get(),
        ]);

        //dd('ok');        

    } // index


    public function paymentsStore(Request $request)
    {

        $data = [
            'affiliate_name' => $request->payment['affiliate_name'],
            'affiliate_index' => $request->payment['affiliate_index'],
            'prev_balance' => $request->payment['prev_balance'],
            'paid_amount' => $request->payment['paid_amount'],
            'current_balance' => $request->payment['current_balance'],
            'notes' => $request->payment['notes'],
            'modify_user' => Auth::user()->name,
        ];

        AffiliatesPayment::create($data);

        //    $affiliate = Affiliate::where('affiliate_index',$request->payment['affiliate_index'])
        //    ->get();
        //    $update_balance = $affiliate[0]->balance - $request->Amount;

        DB::table('affiliates')
            ->where('affiliate_index', $request->payment['affiliate_index'])
            ->update(['balance' => $request->payment['current_balance']]);

        $user = User::findOrFail(Auth::user()->id);

        DB::table('users')
            ->where('id', Auth::user()->id)
            ->update(['balance' => $user->balance + $request->payment['paid_amount']]);


        // return redirect()->route('users.management')->with('status', 201);
        return redirect()->route('affiliates.payments')->with('status', 201);
    }


    public function store()
    { // insert API data to db
        $token = $this->getSavedToken();

        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json'
        ];

        $affiliateApiURL = 'https://rapi.earthlink.iq/api/reseller/affiliates';
        $affiliate_api_response = Http::withHeaders($headers)->get($affiliateApiURL);
        $affiliate_api_data     = json_decode($affiliate_api_response->getBody(), true);

        $collection = collect($affiliate_api_data);
        $affiliateIndex = $collection->pluck("affiliateIndex");
        $affiliateIndex->all();
        // dd($affiliateIndex);
        $affiliate = Affiliate::whereIn('affiliate_index', $affiliateIndex)->get();

        // $affiliates = Affiliate::all();

        if (!is_null($affiliate)) {
            foreach ($affiliate_api_data as $aff) {
                $index_arr = array($aff['affiliateIndex']);
                $exited_aff = Affiliate::whereIn('affiliate_index', $index_arr)->first();
                if (!is_null($exited_aff)) {
                    $affupdate_data = [
                        "affiliate_index"   => $aff['affiliateIndex'],
                        "affiliate_name"   => $aff['affiliateName'],
                    ];
                    Affiliate::where('affiliate_index', $aff['affiliateIndex'])->update($affupdate_data);
                } else {
                    Affiliate::insert([
                        'affiliate_index' => $aff['affiliateIndex'],
                        'affiliate_name'  => $aff['affiliateName'],
                    ]);
                }
            }

            return redirect()->route('affiliates')->with('status', 200);
        } else {
            foreach ($affiliate_api_data as $aff) {
                Affiliate::insert([
                    'affiliate_index' => $aff['affiliateIndex'],
                    'affiliate_name'  => $aff['affiliateName'],
                ]);
            }

            return redirect()->route('affiliates')->with('status', 201);
        }
    } // store
}
