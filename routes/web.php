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
use App\Http\Controllers\TicketController;
use App\Http\Controllers\EarthlinkProfileController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ReportController;

Route::get('/test', function () {    
    return Inertia::render('Test');
})->name('test');

Route::get('/earthlink/profile', function () {    
    return Inertia::render('Profile/Earthlink/Edit');
});

Route::get('/', function () {   
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    
    Route::get('/users/online', [UserController::class, 'showOnlineUsers'])->name('users.online');
    Route::get('/user/{id}', [UserController::class, 'getUserDetails'])->name('user.details');
    Route::post('/user/update', [UserController::class, 'updateUserDetails'])->name('user.update');
   
    Route::get('/accounts', [AccountController::class, 'index'])->name('accounts');
    Route::get('/accounts/store', [AccountController::class, 'store'])->name('accounts.store');

    Route::get('/affiliates', [AffiliateController::class, 'index'])->name('affiliates');
    Route::get('/affiliates/store', [AffiliateController::class, 'store'])->name('affiliates.store');

    Route::get('/customers', [CustomerController::class, 'index'])->name('customers');
    Route::get('/customers/create', [CustomerController::class, 'create'])->name('customers.create');
    Route::post('/customers/store', [CustomerController::class, 'store'])->name('customers.store');
    Route::get('/customers/store/api/{totalCount}', [CustomerController::class, 'store_api'])->name('customers.store.api');
    Route::get('/users/management', [UserController::class, 'showAllUsers'])->name('users.management');

    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets');

    Route::get('/log/error', [LogController::class, 'getErrorLog'])->name('log.error');
    Route::get('/log/audit', [LogController::class, 'getAuditLog'])->name('log.audit');

    Route::get('/usersessions', [ReportController::class, 'getUserSessions'])->name('usersessions');
    Route::get('/prepaid/needed', [ReportController::class, 'getPrepaidNeeded'])->name('prepaid.needed');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::middleware('auth')->group(function () {
//     Route::get('/earthlink/profile', [EarthlinkProfileController::class, 'edit'])->name('earthlink.edit');
//     Route::patch('/earthlink/profile', [EarthlinkProfileController::class, 'update'])->name('earthlink.update');
//     Route::delete('/earthlink/profile', [EarthlinkProfileController::class, 'destroy'])->name('earthlink.destroy');
// });

require __DIR__.'/auth.php';