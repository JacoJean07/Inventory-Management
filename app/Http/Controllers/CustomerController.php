<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\Customer\StoreCustomerRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    //
    public function index()
    {
        $this->authorize('viewAny', Customer::class);

        return Inertia::render('Admin/Customer/index', [
            'customers' => Customer::all(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Customer::class);

        return Inertia::render('Admin/Customer/create');
    }

    public function store(StoreCustomerRequest $request)
    {
        $this->authorize('create', Customer::class);

        Customer::create($request->validated());

        return redirect()->route('customers.index')->with('success', 'Cliente creado con exito.');
    }

    public function edit(Customer $customer)
    {
        $this->authorize('update', $customer);

        return Inertia::render('Admin/Customer/edit', [
            'customer' => $customer,
        ]);
    }

    public function update(StoreCustomerRequest $request, Customer $customer)
    {
        $this->authorize('update', $customer);

        $customer->update($request->validated());

        return redirect()->route('customers.index')->with('success', 'Cliente actualizado correctamente.');
    }

    public function destroy(Customer $customer)
    {
        $this->authorize('delete', $customer);

        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Cliente eliminado correctamente.');
    }
}
