<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supplier;
use App\Http\Requests\Supplier\SupplierRequest;
use App\Policies\SupplierPolicy;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class SupplierController extends Controller
{
    //
    protected $supplierPolicy;

    public function __construct(SupplierPolicy $supplierPolicy)
    {
        $this->supplierPolicy = $supplierPolicy;
    }

    public function index()
    {
        if (!Gate::allows('view-suppliers', Supplier::class)) {
            abort(404);
        } else {
            return Inertia::render('Admin/Supplier/index', [
                'suppliers' => Supplier::all()
            ]);
        }
    }

    public function create()
    {
        if (!Gate::allows('create-suppliers', Supplier::class)) {
            abort(404);
        } else {
            return Inertia::render('Admin/Supplier/create');
        }
    }

    public function store(SupplierRequest $request)
    {
        if (Gate::allows('create-suppliers', Supplier::class)) {
            // Combina los datos validados con el user_id
            $data = $request->validated();
            $data['user_id'] = auth()->id();

            // Crea la categoría con los datos completos
            $category = Supplier::create($data);

            return Inertia::render('Admin/Supplier/index', [
                'suppliers' => Supplier::all()
            ]);
        } else {
            abort(403); // Código de error de autorización
        }
    }

    public function edit(Supplier $supplier)
    {
        if (Gate::allows('edit-suppliers', $supplier)) {
            return Inertia::render('Admin/Supplier/edit', [
                'supplier' => $supplier
            ]);
        } else {
            abort(404);
        }
    }

    public function update(Supplier $supplier, SupplierRequest $request)
    {
        if (Gate::allows('edit-suppliers', $supplier)) {
            $supplier->update($request->validated());
            return Inertia::render('Admin/Supplier/index', [
                'suppliers' => Supplier::all()
            ]);
        } else {
            abort(404);
        }
    }

    public function destroy(Supplier $supplier)
    {
        if (Gate::allows('delete-suppliers', $supplier)) {
            $supplier->delete();
            return Inertia::render('Admin/Supplier/index', [
                'suppliers' => Supplier::all()
            ]);
        } else {
            abort(404);
        }
    }

}
