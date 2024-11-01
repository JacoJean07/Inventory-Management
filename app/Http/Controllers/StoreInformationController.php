<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StoreInformation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StoreInformation\StoreInformationRequest;
use App\Policies\StoreInformationPolicy;
use Inertia\Inertia;

class StoreInformationController extends Controller
{

    protected $storeInformationPolicy;

    public function __construct(StoreInformationPolicy $storeInformationPolicy)
    {
        $this->storeInformationPolicy = $storeInformationPolicy;
    }

    public function index()
    {
        if (!Gate::allows('view-store-information', StoreInformation::class)) {
            abort(404);
        }

        // Obtener el registro único de StoreInformation
        $storeInformation = StoreInformation::first();

        // Verificar si el registro existe
        if ($storeInformation) {
            // Si existe, mostrar la vista de index con los datos de la tienda
            return Inertia::render('Admin/StoreInformation/index', [
                'storeInformation' => $storeInformation
            ]);
        } else {
            // Si no existe y el usuario tiene permiso de creación
            if (Gate::allows('create-store-information', StoreInformation::class)) {
                // Mostrar la vista de creación
                return Inertia::render('Admin/StoreInformation/create');
            } else {
                abort(403); // Prohibido si no tiene permisos de creación
            }
        }
    }

    public function store(StoreInformationRequest $request)
    {
        if (Gate::allows('create-store-information', StoreInformation::class)) {
            // Obtener el registro único de StoreInformation
            $storeInformation = StoreInformation::first();
            if (!$storeInformation) {
                $storeInformation = StoreInformation::create($request->validated());
            }

            // Enviar una respuesta de éxito con Inertia
            return Inertia::render('Admin/StoreInformation/index', [
                'storeInformation' => $storeInformation
            ]);
        } else {
            abort(403); // Código de error de autorización
        }
    }

    public function show(StoreInformation $storeInformation){
        if (Gate::allows('view-store-information', $storeInformation)) {
            return response()->json($storeInformation);
        } else {
            abort(404);
        }
    }

    public function edit(StoreInformation $storeInformation){
        if (Gate::allows('edit-store-information', $storeInformation)) {
            return Inertia::render('Admin/StoreInformation/edit', [
                'storeInformation' => $storeInformation
            ]);
        } else {
            abort(404);
        }
    }

    public function update(StoreInformation $storeInformation, StoreInformationRequest $request){
        if (Gate::allows('edit-store-information', $storeInformation)) {
            $storeInformation->update($request->validated());
            return Inertia::render('Admin/StoreInformation/index', [
                'storeInformation' => $storeInformation
            ]);
        } else {
            abort(404);
        }
    }

    public function destroy(StoreInformation $storeInformation){
        if (Gate::allows('delete-store-information', $storeInformation)) {
            $storeInformation->delete();
            return response()->json($storeInformation);
        } else {
            abort(404);
        }
    }

}
