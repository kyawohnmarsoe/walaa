<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

 
class UserController extends Controller
{
   
    public function getUserDetails(string $id,Request $request): Response
    {
        // return Inertia::render('Users/Details', [
        //     'user' => User::findOrFail($id)
        // ]);
         $token = $this->GetApiToken();  
        return Inertia::render('Users/Details',['apitoken' => $token,'id' => $id]);
    }

    public function test(): Response
    {
        return Inertia::render('Users/Test');
    }


     public function showOnlineUsers(): Response
    {
        $token = $this->GetApiToken();      
        return Inertia::render('Users/OnlineUsers',['apitoken' => $token]);
    }
}