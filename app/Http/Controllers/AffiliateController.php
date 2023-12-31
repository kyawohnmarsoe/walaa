<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Support\Facades\Http;

class AffiliateController extends Controller
{
    public function index()
    {
        $token = $this->getSavedToken();
        return Inertia::render('Affiliates/Affiliates', [
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'apitoken' => $token
        ]);
    } // index    

    public function store() { // insert API data to db
        $token = $this->getSavedToken();
        
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];

        $affiliateApiURL = 'https://rapi.earthlink.iq/api/reseller/affiliates' ;      
        $affiliate_api_response = Http::withHeaders($headers)->get($affiliateApiURL);  
        $affiliate_api_data     = json_decode($affiliate_api_response->getBody(), true);         
       
        $collection = collect($affiliate_api_data);
        $affiliateIndex = $collection->pluck("affiliateIndex");
        $affiliateIndex->all(); 
        $affiliate = Affiliate::whereIn('affiliate_index', $affiliateIndex)->first();

        $affiliates = Affiliate::all();

        if(!is_null($affiliate)){ 

            return redirect()->route('affiliates')->with('status', 422);      
           
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
