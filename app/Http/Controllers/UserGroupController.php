<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserGroupRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User_group;

class UserGroupController extends Controller
{
    public function index()
    {
        $data = User_group::all();
        return Inertia::render('Usergroup/Usergroup', [
            'usergroups' => $data,
            'show_data' => 'list',
        ]);
    } // index

    public function create() 
    {        
        return Inertia::render('Usergroup/Usergroup', [
            'show_data'  => 'add_form',
        ]);
    } // create  

    public function store(StoreUserGroupRequest $request) { 
        $data = $request->validated();        
        User_group::create($data);
        return redirect()->route('usergroup')->with('status', 201);   
    } // store

    public function edit($id) {       
        return Inertia::render('Usergroup/Usergroup', [
            'show_data'  => 'edit_form',
            'usergroup' => User_group::findOrFail($id)
        ]);
    } // edit

    public function update(StoreUserGroupRequest $request, $id) 
    {
		$input = $request->all();
        $data = $request->validated();   
		$data = User_group::findOrFail($id);
        // return response(compact('input'));  
		$data->update($input);
        return redirect()->route('usergroup')->with('status', 200); 
	} // update

    public function destroy($id)
    {
        // need to remove id in group_id field at 'customers' & 'user_has_groups' table also
        User_group::findOrFail($id)->delete();
        return redirect()->route('usergroup')->with('status', 204); 
    } // destroy

}
