<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\User_group;
use App\Models\User_has_group;

class SystemUserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();
        // SELECT ug.*,uhg.user_id FROM user_groups ug LEFT JOIN user_has_groups uhg ON uhg.group_id=ug.id;    
        $user_has_groups = User_group::join('user_has_groups', 'user_has_groups.group_id', '=', 'user_groups.id')
            ->get(['user_has_groups.user_id', 'user_groups.*']);
        $user_groups = User_group::all();
        return Inertia::render('Systemusers/Systemusers', [
            'systemusers' => $users,
            'user_has_groups' => $user_has_groups,
            'user_groups' => $user_groups,
            'show_data'   => 'list',
        ]);
    } // index

    public function create()
    {
        $user_groups = User_group::all();
        return Inertia::render('Systemusers/Systemusers', [
            'user_groups' => $user_groups,
            'show_data'  => 'add_form',
        ]);
    } // create

    public function store(Request $request)
    {
        // $input = $request->all();
        // return response(compact('input')); 

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('staff'); // default assign role "staff"

        $created_user_id = $user->id;
        $group_id = $request->group_id;
        if ($group_id != '') {
            foreach ($group_id as $gId) {
                User_has_group::create([
                    'user_id' => $created_user_id,
                    'group_id' => $gId,
                ]);
            }
        }

        return redirect()->route('systemuser')->with('status', 201);
    } // store

    public function edit($id)
    {
        $user_groups = User_group::all();
        $user_has_group = User_has_group::where('user_id', $id)->pluck('group_id');
        // return response(compact('user_has_group'));        
        return Inertia::render('Systemusers/Systemusers', [
            'show_data'  => 'edit_form',
            'systemuser' => User::findOrFail($id),
            'user_groups' => $user_groups,
            'user_has_group' => $user_has_group,
        ]);
    } // edit

    public function update(Request $request, $id)
    {
        $input = $request->all();
        // return response(compact('input')); 
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
        ]);
        $data = User::findOrFail($id);
        $data->update($input);

        $delete_user_has_group = User_has_group::where('user_id', $id)->delete();
        $group_id = $request->group_id;
        if ($group_id != '') {
            foreach ($group_id as $gId) {
                User_has_group::create([
                    'user_id' => $id,
                    'group_id' => $gId,
                ]);
            }
        }

        return redirect()->route('systemuser')->with('status', 200);
    } // update

    public function destroy($id)
    {
        $input = [
            'active_status' => 0,
        ];
        // return response(compact('input')); 
        $data = User::findorFail($id);
        $data->update($input);
        return redirect()->route('systemuser')->with('message', 'System User is successfully disabled!');
    } // destroy
}
