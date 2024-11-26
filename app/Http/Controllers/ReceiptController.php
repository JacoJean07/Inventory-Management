<?php

namespace App\Http\Controllers;

use App\Models\Receipt;
use App\Models\Product;
use App\Models\ReceiptItem;
use App\Policies\ReceiptPolicy;
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

        return Inertia::render('Admin/Receipt/create', [
            'products' => $products
        ]);
    }

    /**
     * Almacena un nuevo recibo.
     */
    public function store(Request $request)
    {
        if (!Gate::allows('create', Receipt::class)) {
            abort(403);
        }

        $data = $request->validate([
            'type' => 'required|in:compra,venta',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        // Crea el recibo principal
        $receipt = Receipt::create([
            'user_id' => auth()->id(),
            'type' => $data['type'],
            'total' => collect($data['items'])->sum(function ($item) {
                return $item['quantity'] * $item['price'];
            }),
        ]);

        // Crea los elementos del recibo
        foreach ($data['items'] as $item) {
            ReceiptItem::create([
                'receipt_id' => $receipt->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);

            // Actualiza el inventario
            $product = Product::find($item['product_id']);
            if ($data['type'] === 'venta') {
                // Restar del inventario
                $product->quantity -= $item['quantity'];
            } else {
                // Sumar al inventario
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
