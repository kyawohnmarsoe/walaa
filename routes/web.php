<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\CustomerController;
 
// Route::get('/user/{id}', [UserController::class, 'show']);
// Route::get('/user/{id}', function () {    
//     return Inertia::render('Users/Details');
// })->name('user.details');

Route::get('/', function () {   
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {    
//     return Inertia::render('Dashboard', [
//         'api_token' => session('api_token') ?? ''
//     ]);
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/online/users', function () {
//     return Inertia::render('Online/Users', [
//         'api_token' => session('api_token') ?? ''
//     ]);
// })->middleware(['auth', 'verified'])->name('online.users');

// Route::get('/accounts', function () {
//     return Inertia::render('Accounts/Accounts', [
//         'api_token' => session('api_token') ?? ''
//     ]);
//   }
// )->middleware(['auth', 'verified'])->name('accounts');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    
    Route::get('/users/online', [UserController::class, 'showOnlineUsers'])->name('users.online');
    Route::get('/user/{id}', [UserController::class, 'getUserDetails'])->name('user.details');
    
    Route::get('/accounts', [AccountController::class, 'index'])->name('accounts');
    Route::get('/accounts/store', [AccountController::class, 'store'])->name('accounts.store');

    Route::get('/affiliates', [AffiliateController::class, 'index'])->name('affiliates');
    Route::get('/affiliates/store', [AffiliateController::class, 'store'])->name('affiliates.store');

    Route::get('/customers', [CustomerController::class, 'index'])->name('customers');
    Route::get('/customers/create', [CustomerController::class, 'create'])->name('customers.create');
    Route::get('/customers/store', [CustomerController::class, 'store'])->name('customers.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';