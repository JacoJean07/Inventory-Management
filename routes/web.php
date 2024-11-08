<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreInformationController;
use App\Http\Controllers\SupplierController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/admin/store-information', \App\Http\Controllers\StoreInformationController::class);
    Route::resource('/admin/supplier', \App\Http\Controllers\SupplierController::class);
    Route::resource('/admin/category', \App\Http\Controllers\CategoryController::class);
    // Route para actualizar el tema
    Route::post('/set-theme', function (Illuminate\Http\Request $request) {
        session(['theme' => $request->theme]);
        return response()->json(['message' => 'Theme updated']);
    })->name('set-theme');
});




require __DIR__.'/auth.php';
