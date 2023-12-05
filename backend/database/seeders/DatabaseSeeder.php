<?php

namespace Database\Seeders;

use App\Models\Role;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'role_name' => 'Super Admin',
        ]);

        DB::table('users')->insert([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'super@admin.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('super@123'),
            'country_code' => 91,
            'mobile' => '0123456789',
            'address' => 'Street ABC 1, XYZ',
            'dob' => Carbon::now(),
            'gender' => 'female',
            'hobbies' => null,
            'role_id' => 1,
            'is_active' => 1,
        ]);
    }
}
