<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
 
class UserController extends Controller
{
   
    public function show(string $id): Response
    {
        return Inertia::render('Users/Profile', [
            'user' => User::findOrFail($id)
        ]);
    }

    public function test(): Response
    {
        return Inertia::render('Users/Test');
    }


     public function showOnlineUsers(): Response
    {
        $token = $this->GetApiToken();      
        return Inertia::render('Users/OnlineUsers',['api_token' => $token]);
    }
}