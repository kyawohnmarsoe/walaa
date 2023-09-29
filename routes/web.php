<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountController;
 
Route::get('/user/{id}', [UserController::class, 'show']);

Route::get('/', function () {   
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {    
    return Inertia::render('Dashboard', [
        'api_token' => session('api_token') ?? ''
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/online/users', function () {
    return Inertia::render('Online/Users', [
        'api_token' => session('api_token') ?? ''
    ]);
})->middleware(['auth', 'verified'])->name('online.users');

Route::get('/accounts', function () {
    return Inertia::render('Accounts/Accounts', [
        'api_token' => session('api_token') ?? ''
    ]);
  }
)->middleware(['auth', 'verified'])->name('accounts');

// Route::get('/accounts', [AccountController::class, 'accounts'])->middleware(['auth', 'verified'])->name('accounts');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';