<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Affiliate;

 
class UserController extends Controller
{
   
    public function getUserDetails(string $id,Request $request): Response
    {
        // return Inertia::render('Users/Details', [
        //     'user' => User::findOrFail($id)
        // ]);
         $token = $this->getSessionToken();  
        return Inertia::render('Users/Details',['apitoken' => $token,'id' => $id]);
    }

    public function updateUserDetails(Request $request): Response
    {
        return Inertia::render('Dashboard');
    }


     public function showOnlineUsers(): Response
    {
        $token = $this->getSessionToken();      
        return Inertia::render('Users/OnlineUsers',['apitoken' => $token, 'affiliates' => Affiliate::all()]);
    }

     public function showAllUsers(): Response
    {
        $token = $this->getSessionToken();      
        return Inertia::render('Customers/Management',['apitoken' => $token]);
    }
}