<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WhatsAppController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\SystemUserController;
use App\Http\Controllers\UserGroupController;
use App\Http\Controllers\ApiUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\EarthlinkProfileController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ApidataController;
use App\Http\Controllers\TicketIssueController;
use App\Http\Controllers\WalletController;

Route::get('/test', [DashboardController::class, 'test'])->name('test');
Route::get('/test2', [DashboardController::class, 'test2'])->name('test2');

Route::get('/earthlink/profile', function () {
    return Inertia::render('Profile/Earthlink/Edit');
});

Route::post('/deposit/store', [ReportController::class, 'storeBalanceTransfer'])->name('deposit.store');

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
    Route::post('/dashboard/writing', [DashboardController::class, 'writing'])->name('writing');

    //========= Start Get Data From API Route =========//
    Route::get('/dashboard/statslist', [DashboardController::class, 'get_statsList'])->name('dashboard.statslist');
    Route::get('/dashboard/servicePhones', [DashboardController::class, 'get_servicePhones'])->name('dashboard.servicePhones');

    Route::get('/users/online', [UserController::class, 'showOnlineUsers'])->name('users.online');
    Route::get('/user/{id}', [UserController::class, 'getUserDetails'])->name('user.details');
    Route::post('/user/update', [UserController::class, 'updateUserDetails'])->name('user.update');

    Route::get('/systemuser', [SystemUserController::class, 'index'])->name('systemuser');
    Route::get('/systemuser/create', [SystemUserController::class, 'create'])->name('systemuser.create');
    Route::post('/systemuser/store', [SystemUserController::class, 'store'])->name('systemuser.store');
    Route::get('/systemuser/{id}', [SystemUserController::class, 'edit'])->name('systemuser.edit');
    Route::post('/systemuser/{id}', [SystemUserController::class, 'update'])->name('systemuser.update');
    Route::delete('/systemuser/{id}', [SystemUserController::class, 'destroy'])->name('systemuser.destroy');

    Route::get('/apidata', [ApidataController::class, 'index'])->name('apidata');

    Route::get('/usergroup', [UserGroupController::class, 'index'])->name('usergroup');
    Route::get('/usergroup/create', [UserGroupController::class, 'create'])->name('usergroup.create');
    Route::post('/usergroup/store', [UserGroupController::class, 'store'])->name('usergroup.store');
    Route::get('/usergroup/{id}', [UserGroupController::class, 'edit'])->name('usergroup.edit');
    Route::post('/usergroup/{id}', [UserGroupController::class, 'update'])->name('usergroup.update');
    Route::delete('/usergroup/{id}', [UserGroupController::class, 'destroy'])->name('usergroup.destroy');

    Route::get('/accounts', [AccountController::class, 'index'])->name('accounts');
    Route::get('/accounts/apilist', [AccountController::class, 'api_list'])->name('accounts.apilist');
    Route::get('/accounts/create', [AccountController::class, 'create'])->name('accounts.create');
    Route::post('/accounts/insert', [AccountController::class, 'insert'])->name('accounts.insert');
    Route::get('/accounts/store', [AccountController::class, 'store_api'])->name('accounts.store_api');
    Route::get('/accounts/{id}', [AccountController::class, 'edit'])->name('accounts.edit');
    Route::post('/accounts/{id}', [AccountController::class, 'update'])->name('accounts.update');
    Route::delete('/accounts/{id}', [AccountController::class, 'destroy'])->name('accounts.destroy');

    Route::get('/affiliates', [AffiliateController::class, 'index'])->name('affiliates');
    Route::get('/affiliates/store', [AffiliateController::class, 'store'])->name('affiliates.store');

    Route::get('/deposit/password', [CustomerController::class, 'deposit'])->name('deposit.password');

    Route::get('/customers', [CustomerController::class, 'index'])->name('customers');
    Route::get('/customers/create', [CustomerController::class, 'create'])->name('customers.create');
    Route::post('/customers/insert', [CustomerController::class, 'insert'])->name('customers.insert');
    Route::post('/customers', [CustomerController::class, 'index'])->name('customers.filter');
    Route::get('/customers/store/api/{totalCount}', [CustomerController::class, 'store_api'])->name('customers.store.api');
    Route::get('/customers/{index}', [CustomerController::class, 'edit'])->name('customers.edit');
    Route::post('/customers/{index}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('/customers/{index}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    Route::post('/customers/change/account/{index}', [CustomerController::class, 'change_account'])->name('customers.change.account');
    Route::get('/customers/details/{index}', [CustomerController::class, 'details'])->name('customers.details');
    Route::post('/customers/notify/{index}', [CustomerController::class, 'notify'])->name('customers.notify');
    // Route::get('/customers/change_deposit_pass', [CustomerController::class, 'change_deposit_password'])->name('customers.change_deposit_pass');
    // Route::post('/customers/change_deposit_pass/{id}', [CustomerController::class, 'update_deposit_password'])->name('customers.update_deposit_pass');  
    Route::get('/users/management', [UserController::class, 'showAllUsers'])->name('users.management');

    Route::get('/deposit', [DepositController::class, 'change_deposit_password'])->name('deposit');
    Route::post('/deposit/{id}', [DepositController::class, 'update_deposit_password'])->name('deposit.update_deposit_pass');

    Route::get('/apiuser', [ApiUserController::class, 'change_api_user'])->name('apiuser');
    Route::post('/apiuser/{id}', [ApiUserController::class, 'update_api_user'])->name('apiuser.update_api_user');

    Route::post('/send_whatsapp/{index}', [WhatsAppController::class, 'send_whatsapp'])->name('send_whatsapp');

    // Route::group(['middleware' => ['auth', 'role:admin']], function() {
    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets');
    Route::get('/tickets/create', [TicketController::class, 'create'])->name('tickets.create');
    Route::get('/tickets/create/{cus_id}', [TicketController::class, 'create_ticket_by_user'])->name('tickets.create.user');
    Route::post('/tickets/store', [TicketController::class, 'store'])->name('tickets.store');
    Route::post('/tickets', [TicketController::class, 'index'])->name('tickets.filter');
    Route::get('/tickets/{id}', [TicketController::class, 'edit'])->name('tickets.edit');
    Route::post('/tickets/{id}', [TicketController::class, 'update'])->name('tickets.update');
    Route::delete('/tickets/{id}', [TicketController::class, 'destroy'])->name('tickets.destroy');
    Route::post('/tickets/store/remark', [TicketController::class, 'store_remark'])->name('tickets.store.remark');
    Route::post('/tickets/update/remark/{rmId}', [TicketController::class, 'update_remark'])->name('tickets.update.remark');
    Route::get('/tickets/delete_remark/{id}', [TicketController::class, 'destroy_remark'])->name('tickets.destroy.remark');
    Route::delete('/tickets/image/{id}', [TicketController::class, 'destroy_image'])->name('tickets.destroy.image');
    Route::post('/tickets/attach_file/{id}', [TicketController::class, 'destroy_attachFile'])->name('tickets.destroy.attachfile');
    Route::get('/tickets/user/{user_id}', [TicketController::class, 'tickets_by_user'])->name('tickets.user');
    Route::get('/tickets/open/{id}', [TicketController::class, 'open'])->name('tickets.open');
    Route::get('/tickets/close/{id}', [TicketController::class, 'close'])->name('tickets.close');

    Route::get('/issues', [TicketIssueController::class, 'index'])->name('ticket.issues');
    Route::get('/issues/create', [TicketIssueController::class, 'create'])->name('ticket.issues.create');
    Route::post('/issues/store', [TicketIssueController::class, 'store'])->name('ticket.issues.store');
    Route::get('/issues/{id}', [TicketIssueController::class, 'edit'])->name('ticket.issues.edit');
    Route::post('/issues/{id}', [TicketIssueController::class, 'update'])->name('ticket.issues.update');
    Route::delete('/issues/{id}', [TicketIssueController::class, 'destroy'])->name('ticket.issues.destroy');
    // });

    Route::get('/log/error', [LogController::class, 'getErrorLog'])->name('log.error');
    Route::get('/log/audit', [LogController::class, 'getAuditLog'])->name('log.audit');

    Route::get('/usersessions', [ReportController::class, 'getUserSessions'])->name('usersessions');
    Route::get('/prepaid/needed', [ReportController::class, 'getPrepaidNeeded'])->name('prepaid.needed');
    Route::get('/deposit/statement', [ReportController::class, 'getAccountStatement'])->name('deposit.statement');
    Route::get('/affiliate/group', [ReportController::class, 'getAffiliateGroup'])->name('affiliate.group');
    Route::get('/test/usage', [ReportController::class, 'getTestUsage'])->name('test.usage');
    Route::get('/account/stats', [ReportController::class, 'getAccountStats'])->name('account.stats');
    Route::get('/affiliate/stats', [ReportController::class, 'getAffiliateStats'])->name('affiliate.stats');

    Route::get('/deposit/transfer', [ReportController::class, 'getBalanceTransfer'])->name('deposit.transfer');

    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices');
    Route::post('/invoices/search', [InvoiceController::class, 'search'])->name('invoices.search');
    Route::get('/invoices/create', [InvoiceController::class, 'create'])->name('invoices.create');
    Route::post('/invoices/store', [InvoiceController::class, 'store'])->name('invoices.store');
    Route::post('/invoices/storedata', [InvoiceController::class, 'storeData'])->name('invoices.storedata');
    Route::get('/invoices/{id}', [InvoiceController::class, 'show'])->name('invoices.show');
    Route::get('/invoices/edit/{id}', [InvoiceController::class, 'edit'])->name('invoices.edit');
    Route::post('/invoices/update/{id}', [InvoiceController::class, 'update'])->name('invoices.update');
    Route::get('/invoices/user/{user_index}', [InvoiceController::class, 'invoices_by_user'])->name('invoices.user');

    Route::get('/expenses', [ExpenseController::class, 'index'])->name('expenses');
    Route::post('/expenses/search', [ExpenseController::class, 'search'])->name('expenses.search');
    Route::get('/expenses/create', [ExpenseController::class, 'create'])->name('expenses.create');
    Route::post('/expenses/store', [ExpenseController::class, 'store'])->name('expenses.store');
    Route::post('/expenses/update/{id}', [ExpenseController::class, 'update'])->name('expenses.update');

    Route::get('/wallets', [WalletController::class, 'index'])->name('wallets');
    Route::get('/wallets/transfer', [WalletController::class, 'transfer'])->name('wallets.transfer');
    Route::post('/wallets/store', [WalletController::class, 'store'])->name('wallets.store');
    Route::post('/wallets/search', [WalletController::class, 'search'])->name('wallets.search');
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

// Route::get('/clear-cache-all', function() {    
//     Artisan::call('route:cache');
//     Artisan::call('config:cache');
//     Artisan::call('cache:clear');
//     Artisan::call('view:clear');
//     dd("Cache Clear All");
// });

require __DIR__ . '/auth.php';
