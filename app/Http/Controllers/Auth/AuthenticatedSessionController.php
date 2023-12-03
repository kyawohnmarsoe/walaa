<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // dd($request->all());        
        $data = User::where('email',$request->email)->first();
        // dd($data->active_status);   
        if($data->active_status == 1) {
            $request->authenticate();                   
            $request->session()->regenerate(); 
            return redirect()->intended(RouteServiceProvider::HOME);
        } else {
            return redirect('/login')->with('error_message', 'You can\'t login. Your account has been disabled.');
        }        
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // session()->forget(['apitoken', 'current_time']);

        return redirect('/');
    }
}
