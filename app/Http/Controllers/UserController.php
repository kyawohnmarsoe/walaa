<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Affiliate;
use App\Models\Account;
use Illuminate\Support\Facades\Http;
 
class UserController extends Controller
{
   
    public function getUserDetails(string $id,Request $request): Response
    {
         

         $token = $this->getSavedToken();  
        return Inertia::render('Users/Details',[
            'apitoken' => $token,
            'id' => $id,
            'accountTypes' => Account::all(),
            
        ]);
    }

    public function updateUserDetails(Request $request): Response
    {
        return Inertia::render('Dashboard');
    }

    public function showOnlineUsers(): Response
    {
        $token = $this->getSavedToken();      
        $cusDataByLoginUserGroupId = $this->getUserIndexReqData_byLoggedInGroupSysUserId();
        return Inertia::render('Users/OnlineUsers',[
            'apitoken' => $token, 
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'userIndexByGroup' => $cusDataByLoginUserGroupId
        ]);
    }    

     public function showAllUsers(): Response
    {
        $token = $this->getSavedToken();      
         $deposit_data = $this->get_deposit_password();
        return Inertia::render('Customers/Management',[
            'apitoken' => $token, 
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'accountTypes' => Account::all(),
             'deposit_password' => $deposit_data['deposit_password'],
        ]);
    }
}