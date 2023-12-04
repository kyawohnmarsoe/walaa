<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Role::create(['name' => 'admin']);
        $role_staff = Role::create(['name' => 'staff']);

        $permission_read = Permission::create(['name' => 'read_tickets']);
        $permission_edit = Permission::create(['name' => 'edit_tickets']);
        $permission_write = Permission::create(['name' => 'write_tickets']);
        $permission_delete = Permission::create(['name' => 'delete_tickets']);

        $permissions_admin = [$permission_read, $permission_edit, $permission_write, $permission_delete];

        $role_admin->syncPermissions($permissions_admin);
        $role_staff->givePermissionTo($permission_read);

    }
}
