<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use App\Models\BalanceTransfer;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function getUserSessions(){
        $cusDataByLoginUserGroupId = $this->getUserIndexReqData_byLoggedInGroupSysUserId();

        $token = $this->getSavedToken();  
        return Inertia::render('Reports/Sessions/UserSessions',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'userIndexByGroup' => $cusDataByLoginUserGroupId

    ]);
    }

    public function getPrepaidNeeded(){
       
        $token = $this->getSavedToken();  
        return Inertia::render('Reports/Prepaid/PrepaidNeeded',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
           

    ]);
    }

     public function getAccountStatement(){
        $token = $this->getSavedToken();  
        return Inertia::render('Reports/Deposit/AccountStatement',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
           

    ]);
    }

     public function getBalanceTransfer(){
        $token = $this->getSavedToken();  
         $deposit_data = $this->get_deposit_password();

         $transactions = DB::table('balance_transfers')
                        ->leftJoin('affiliates', 'affiliate', '=', 'affiliate_index')
                        ->select('balance_transfers.*', 'affiliate_index', 'affiliate_name')
                        ->get();
                       
                        // dd($transactions);

        return Inertia::render('Reports/Deposit/BalanceTransfer',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            //  'deposit_password' => $deposit_data['deposit_password'],
             'deposit_password' => $deposit_data['deposit_password'],
             'transactions'=>$transactions
    ]);
    }

     public function storeBalanceTransfer(Request $request){
        // dd($request->TargetAffiliateIndex);
       
        BalanceTransfer::create([
            'affiliate' => $request->TargetAffiliateIndex,
            'amount' => $request->Amount,
        ]);

        return redirect()->route('deposit.transfer')->with('status', 201);

     }
   

         public function getAffiliateGroup(){
        $token = $this->getSavedToken();  
        return Inertia::render('Reports/Stats/AffiliateGroup/AffiliateGroup',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get()
    ]);
    }

     public function getTestUsage(){
        $token = $this->getSavedToken();  
        return Inertia::render('Reports/Stats/TestUsage/TestUsage',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get()
    ]);
    }

     public function getAccountStats(){
        $token = $this->getSavedToken();  
        return Inertia::render('Reports/Stats/AccountTypeStats/AccountTypeStats',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get()
    ]);
    }

     public function getAffiliateStats(){
        $token = $this->getSavedToken();  
        return Inertia::render('Reports/Stats/AffiliateStats/AffiliateStats',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get()
    ]);
    }


}
