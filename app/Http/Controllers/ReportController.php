<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Affiliate;
use Illuminate\Http\Request;

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
        return Inertia::render('Reports/Deposit/BalanceTransfer',[
            'apitoken' => $token,
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get()
    ]);
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
