<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Affiliate;
use App\Models\Account;


 
class UserController extends Controller
{
   
    public function getUserDetails(string $id,Request $request): Response
    {
        // return Inertia::render('Users/Details', [
        //     'user' => User::findOrFail($id)
        // ]);
         $token = $this->getSavedToken();  
        return Inertia::render('Users/Details',['apitoken' => $token,'id' => $id]);
    }

    public function updateUserDetails(Request $request): Response
    {
        return Inertia::render('Dashboard');
    }


     public function showOnlineUsers(): Response
    {
        $token = $this->getSavedToken();      
        return Inertia::render('Users/OnlineUsers',[
            'apitoken' => $token, 
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get()
        ]);
    }

     public function showAllUsers(): Response
    {
        $token = $this->getSavedToken();      
        return Inertia::render('Customers/Management',[
            'apitoken' => $token, 
            'affiliates' => Affiliate::orderBy('affiliate_name','asc')->get(),
            'accountTypes' => Account::all()
        ]);
    }
}