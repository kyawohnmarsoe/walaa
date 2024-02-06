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
                        ->leftJoin('affiliates', 'affiliates.affiliate_index', '=', 'balance_transfers.affiliate_index')
                        ->select('balance_transfers.*','affiliates.balance')
                        ->orderBy('id','desc')
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
        $affiliate = Affiliate::where('affiliate_index',$request->TargetAffiliateIndex)
                                    ->get();
        $update_balance = $affiliate[0]->balance - $request->Amount;
                                    // dd($affiliate[0]->affiliate_name);
       
        BalanceTransfer::create([
            'affiliate_index' => $request->TargetAffiliateIndex,
            'affiliate_name' => $affiliate[0]->affiliate_name,
            'amount' => $request->Amount,
            'notes' => $request->notes,
            'balance' => $request->balance,

        ]);

        DB::table('affiliates')
        ->where('affiliate_index', $request->TargetAffiliateIndex)
        ->update(['balance' => $update_balance]);

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
