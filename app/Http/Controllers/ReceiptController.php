<?php

namespace App\Http\Controllers;

use App\Models\Receipt;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Supplier;
use App\Models\ReceiptItem;
use App\Policies\ReceiptPolicy;
use App\Http\Requests\Receipt\StoreReceiptRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class ReceiptController extends Controller
{
    /**
     * Muestra la lista de recibos.
     */
    public function index()
    {
        // Autorización mediante políticas
        if (!Gate::allows('view-any', Receipt::class)) {
            abort(403);
        }

        $receipts = Receipt::with('user')->latest()->get();

        return Inertia::render('Admin/Receipt/index', [
            'receipts' => $receipts
        ]);
    }

    /**
     * Muestra el formulario para crear un nuevo recibo.
     */
    public function create()
    {
        $this->authorize('create', Receipt::class);

        $products = Product::all();
        $customers = Customer::all();
        $suppliers = Supplier::all();

        return Inertia::render('Admin/Receipt/create', [
            'products' => $products,
            'customers' => $customers,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Almacena un nuevo recibo.
     */
    public function store(StoreReceiptRequest $request)
    {
        if (!Gate::allows('create', Receipt::class)) {
            abort(403);
        }

        // Datos validados
        $data = $request->validated();

        // Crea el recibo principal
        $receipt = Receipt::create([
            'user_id' => auth()->id(),
            'type' => $data['type'],
            'total' => collect($data['items'])->sum(function ($item) {
                return $item['quantity'] * ($item['price'] - $item['discount']);
            }),
            'customer_id' => $data['type'] === 'venta' ? $data['customer_id'] : null,
            'supplier_id' => $data['type'] === 'compra' ? $data['supplier_id'] : null,
        ]);

        // Procesar los elementos del recibo
        foreach ($data['items'] as $item) {
            ReceiptItem::create([
                'receipt_id' => $receipt->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'discount' => $item['discount'],
            ]);

            // Actualiza el inventario según el tipo
            $product = Product::find($item['product_id']);
            if ($data['type'] === 'venta') {
                $product->quantity -= $item['quantity'];
            } else {
                $product->quantity += $item['quantity'];
            }
            $product->save();
        }

        return redirect()->route('receipts.index')->with('message', 'Recibo generado correctamente.');
    }


    /**
     * Muestra los detalles de un recibo.
     */
    public function show(Receipt $receipt)
    {
        if (!Gate::allows('view', $receipt)) {
            abort(403);
        }

        return Inertia::render('Admin/Receipt/show', [
            'receipt' => $receipt->load('items.product', 'user')
        ]);
    }
}
