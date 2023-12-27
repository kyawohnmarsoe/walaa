<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class WalletController extends Controller
{
     public function index()
     {
      // dd(User::all());
      if (Auth::user()->id == 1) {
        $wallets = Wallet::orderBy('id','desc')->get();
      }else{
        $wallets = Wallet::where('fromWallet',Auth::user()->id)
        ->orwhere('toWallet',Auth::user()->id)
        ->orderBy('id','desc')->get();
      }

     
      // $dataWallets=DB::table('wallets')->get();
      // $dataInvoicesAndWallets=DB::table('invoices')->get()->union($dataWallets);
      // $dataAll=DB::table('expenses')
      // ->get()
      // ->union($dataInvoicesAndWallets);


      // dd($dataAll);
        
        return Inertia::render('Wallets/Wallets', [
        'wallets' => $wallets,
        'users' => User::all()
     ]);
     } 

      public function transfer()
      {
      // dd(User::all());
      return Inertia::render('Wallets/Transfer', [
      'wallets' => Wallet::all(),
      'users' => User::all()
      ]);
      } 

      public function store(Request $request)
      {
       
        // $amount = $request->wallets['amount'] * -1;
        $amount = $request->wallets['amount'];
       $fromUser = User::findOrFail($request->wallets['fromWallet']);
       $fromBalance = $fromUser->balance - $amount;

        $toUser = User::findOrFail($request->wallets['toWallet']);
        $toBalance = $toUser->balance + $request->wallets['amount'];
     
        // dd($fromBalance);

      $data=[
       'user_id'=> Auth::user()->id,
       'balance'=> $fromBalance,
       'type' => $request->wallets['type'],
       'fromWallet'=> $request->wallets['fromWallet'],
       'toWallet'=> $request->wallets['toWallet'],
       'description'=> $request->wallets['description'],
       'amount'=> $amount,
       'modifyUser'=> Auth::user()->id,
      ];

      // dd($data);

       Wallet::create($data);

        $fromUser->update(['balance' => $fromBalance]);
        $toUser->update(['balance' => $toBalance]);

      return redirect()->route('wallets')->with('status', 201);
      
      }


        public function search(Request $request)
        {

        $type = $request['type'];
        $fromWallet = $request['fromWallet'];
        $toWallet = $request['toWallet'];

        $results = Wallet::orderBy('id','desc')->get();
        $id = Auth::user()->id;

        if($id == 1){
        $results=Wallet::orderBy('id','desc')->get();
        }else{
        $results=Wallet::where('fromWallet', $id)->orderBy('id','desc')->get();
        }


        if ($type) {
       
        if($id == 1){
        $results = Wallet::where('type', 'LIKE', "%$type%")->get();

        }else{
         $results = Wallet::where('fromWallet', $id)->where('type', 'LIKE', "%$type%")->get();
        }
        }

                 if ($toWallet){

                 if($id == 1){
                 $results = Wallet::where('toWallet', $toWallet)->get();

                 }else{
                 $results=Wallet::where('fromWallet', $id)->where('toWallet', $toWallet)->orderBy('id','desc')->get();

                 }

                 }
        
        if ($fromWallet){
         if ($toWallet){
          $results = Wallet::where('fromWallet', $id)->where('toWallet', $toWallet)->get();
         }else{
           $results = Wallet::where('fromWallet', $fromWallet)->get();
         }

        }

        return Inertia::render('Wallets/Wallets',[
        'users' => User::orderBy('id','asc')->get(),
        'wallets' => $results,
        ]);



        }
}
