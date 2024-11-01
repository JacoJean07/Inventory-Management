<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;

class AssignRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // dar el rol de admin a jeancarlos10171@gmail.com si no tiene rol
        $adminUser = User::where('email', 'jeancarlos10171@gmail.com')->firstOrFail();
        if (! $adminUser->hasRole('admin')) {
            $adminUser->assignRole('admin');
        }

        // $adminUser2 = User::where('email', 'frankdilan7@hotmail.com')->firstOrFail();
        // if (! $adminUser2->hasRole('admin')) {
        //     $adminUser2->assignRole('admin');
        // }

        // Asignar roles a los usuarios Vendedores
        $seller = User::where('email', 'seller@gmail.com')->firstOrFail();
        if (! $seller->hasRole('seller')) {
            $seller->assignRole('seller');
        }
    }
}
