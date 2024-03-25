<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use Database\Seeders\UserSeeder;
use Database\Seeders\RolesSeeder;
use Database\Seeders\BoardSeeder;


class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // DB::table('users')->insert([
        //     'name' => 'admin',
        //     'email' => 'admin@gmail.com',
        //     'password' => Hash::make('adminadmin'),
        // ]);

        DB::table('deposit_passes')->insert([
            'deposit_password' => '6666667',
        ]);

        DB::table('apiusers')->insert([
            "username"   => "walaaim",
            // "password"   => \Illuminate\Support\Facades\Crypt::encrypt('@walaalink@'),
            "password"   => '@walaalink@',
            "login_type"  => "1",
            "grant_type" => "password"  
        ]);

        $this->call([
            RolesSeeder::class,
            UserSeeder::class,
            BoardSeeder::class,
        ]);
    }
}
