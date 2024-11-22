<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Resetear los roles y permisos en caché
        app()['cache']->forget('spatie.permission.cache');

        // Crear roles si no existen
        if (! Role::where('name', 'admin')->exists()) {
            Role::create(['name' => 'admin']);
        }
        if (! Role::where('name', 'seller')->exists()) {
            Role::create(['name' => 'seller']);
        }

        // Permisos para VER LA INFORMACIÓN DE LA TIENDA
        if (! Permission::where('name', 'view-store-information')->exists()) {
            Permission::create(['name' => 'view-store-information']);
        }
        if (! Permission::where('name', 'edit-store-information')->exists()) {
            Permission::create(['name' => 'edit-store-information']);
        }
        if (! Permission::where('name', 'delete-store-information')->exists()) {
            Permission::create(['name' => 'delete-store-information']);
        }
        if (! Permission::where('name', 'create-store-information')->exists()) {
            Permission::create(['name' => 'create-store-information']);
        }

        // Permisos para VER LOS PROVEEDORES
        if (! Permission::where('name', 'view-suppliers')->exists()) {
            Permission::create(['name' => 'view-suppliers']);
        }
        if (! Permission::where('name', 'edit-suppliers')->exists()) {
            Permission::create(['name' => 'edit-suppliers']);
        }
        if (! Permission::where('name', 'delete-suppliers')->exists()) {
            Permission::create(['name' => 'delete-suppliers']);
        }
        if (! Permission::where('name', 'create-suppliers')->exists()) {
            Permission::create(['name' => 'create-suppliers']);
        }

        // Permisos para VER LAS CATEGORIAS
        if (! Permission::where('name', 'view-categories')->exists()) {
            Permission::create(['name' => 'view-categories']);
        }
        if (! Permission::where('name', 'edit-categories')->exists()) {
            Permission::create(['name' => 'edit-categories']);
        }
        if (! Permission::where('name', 'delete-categories')->exists()) {
            Permission::create(['name' => 'delete-categories']);
        }
        if (! Permission::where('name', 'create-categories')->exists()) {
            Permission::create(['name' => 'create-categories']);
        }

        // Permisos para VER LOS PRODUCTOS
        if (! Permission::where('name', 'view-products')->exists()) {
            Permission::create(['name' => 'view-products']);
        }
        if (! Permission::where('name', 'edit-products')->exists()) {
            Permission::create(['name' => 'edit-products']);
        }
        if (! Permission::where('name', 'delete-products')->exists()) {
            Permission::create(['name' => 'delete-products']);
        }
        if (! Permission::where('name', 'create-products')->exists()) {
            Permission::create(['name' => 'create-products']);
        }

        // Permisos para VER LOS Recibos
        if (! Permission::where('name', 'view-receipts')->exists()) {
            Permission::create(['name' => 'view-receipts']);
        }
        if (! Permission::where('name', 'edit-receipts')->exists()) {
            Permission::create(['name' => 'edit-receipts']);
        }
        if (! Permission::where('name', 'delete-receipts')->exists()) {
            Permission::create(['name' => 'delete-receipts']);
        }
        if (! Permission::where('name', 'create-receipts')->exists()) {
            Permission::create(['name' => 'create-receipts']);
        }

        // Permisos para VER LOS detalles de los recibos
        if (! Permission::where('name', 'view-receipt_items')->exists()) {
            Permission::create(['name' => 'view-receipt_items']);
        }
        if (! Permission::where('name', 'edit-receipt_items')->exists()) {
            Permission::create(['name' => 'edit-receipt_items']);
        }
        if (! Permission::where('name', 'delete-receipt_items')->exists()) {
            Permission::create(['name' => 'delete-receipt_items']);
        }
        if (! Permission::where('name', 'create-receipt_items')->exists()) {
            Permission::create(['name' => 'create-receipt_items']);
        }

        // Asignar permisos a roles si no estan asignados
        $roleAdmin = Role::where('name', 'admin')->first();
        $roleSeller = Role::where('name', 'seller')->first();

        if (! $roleAdmin->hasPermissionTo('view-receipts')) {
            $roleAdmin->givePermissionTo(Permission::all());
        }

        if (! $roleSeller->hasPermissionTo('view-products')) {
            $roleSeller->givePermissionTo([
                // seller can't crud stores
            ]);
        }
    }
}
