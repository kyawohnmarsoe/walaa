<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Expense;
use App\Models\User;
use App\Http\Requests\ExpenseStoreRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ExpenseController extends Controller
{
    public function getExpensesByUser(){
       $id = Auth::user()->id;
       if($id == 1){
       $expenses=Expense::orderBy('id','desc')->get();
       }else{
       $expenses=Expense::where('walletUserId', $id)->orderBy('id','desc')->get();
       }
       return $expenses;
    }

     public function index(){
     return Inertia::render('Expenses/Expenses',[
     'users' => User::orderBy('id','asc')->get(),
     'expenses' => $this->getExpensesByUser(),
     ]);
     }

     public function create(){
     return Inertia::render('Expenses/Create');
     }

     public function store(Request $request){
           
         $data = [
          'walletUserId' => $request->expense['walletUserId'],
          'type' => $request->expense['type'],
          'description' => $request->expense['description'],
          'amount' => $request->expense['amount'],
          'submittedBy' => $request->expense['submittedBy'],
          'modifyUser' => $request->expense['modifyUser'],
        ];

      $result=Expense::create($data);
       
       $user = User::findOrFail($request->expense['walletUserId']);
      
       $walletBalance = $user['balance'] - $request->expense['amount'];

       $user->update(['balance' => $walletBalance]);

      return redirect()->route('expenses')->with('status', 201);

     }

      public function update(Request $request,$id){
      
          $expense = Expense::findOrFail($id);
           $data = [
           'walletUserId' => $request->expense['walletUserId'],
           'type' => $request->expense['type'],
           'description' => $request->expense['description'],
           'amount' => $request->expense['amount'],
           'submittedBy' => $request->expense['submittedBy'],
           'modifyUser' => $request->expense['modifyUser'],
           ];
          $expense->update($data);

          $user = User::findOrFail($request->expense['walletUserId']);

       

          if($request->expense['amount'] > $request->prevAmount){
            $walletBalance = $user['balance'] - ($request->expense['amount']- $request->prevAmount);
          }else{
            $walletBalance = $user['balance'] + ($request->prevAmount - $request->expense['amount']);
          }
          
        //    dd($request->prevAmount);

          $user->update(['balance' => $walletBalance]);
         
          return redirect()->route('expenses')->with('status', 201);
      }


       public function search(Request $request)
       {

       $type = $request['type'];
       $walletUserId = $request['walletUserId'];

       $results = Expense::orderBy('id','desc')->get();
        $id = Auth::user()->id;
        if($id == 1){
        $results=Expense::orderBy('id','desc')->get();
        }else{
        $results=Expense::where('walletUserId', $id)->orderBy('id','desc')->get();
        }
       

       if ($type) {
       $results = Expense::where('type', 'LIKE', "%$type%")->get();

       }
       if ($walletUserId){
       $results = Expense::where('walletUserId', $walletUserId)->get();

       }
      


       return Inertia::render('Expenses/Expenses',[
       'users' => User::orderBy('id','asc')->get(),
       'expenses' => $results,
       ]);



       }


}
