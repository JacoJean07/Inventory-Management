<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // si no existe el usuario Jean Carlos ejecutar el seeder de users
        if (! User::where('email', 'jeancarlos10171@gmail.com')->exists()) {
            //crear un trabajador y un usuario

            $user = User::create([
                'name' => 'Jean Carlos',
                'email' => 'jeancarlos10171@gmail.com',
                'password' => '$2y$12$iLLyJgD2q3wBSiFj5S.pn.tIEPFtQ9l1T82JDfn7bXDy21gx9ySaG',
            ]);

            $user = User::create([
                'name' => 'Seller',
                'email' => 'seller@gmail.com',
                'password' => '$2y$12$F5VJyBDByljW.ObIpHay1efZlpphBjlox/Z0XeGT8lWYi5BPN29qK',
            ]);

        }

        $this->call([
            RolesAndPermissionsSeeder::class,
            AssignRolesSeeder::class,
        ]);
    }
}
