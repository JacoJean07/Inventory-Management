<?php

namespace App\Http\Controllers;

use App\Models\ReceiptItem;
use App\Models\Product;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ReceiptItemController extends Controller
{
    /**
     * Muestra la lista de elementos de un recibo.
     */
    public function index(Receipt $receipt)
    {
        if (!Gate::allows('view', $receipt)) {
            abort(403);
        }

        $items = $receipt->items()->with('product')->get();

        return response()->json($items);
    }

    /**
     * Crea un nuevo elemento para un recibo.
     */
    public function store(Request $request, Receipt $receipt)
    {
        if (!Gate::allows('create', ReceiptItem::class)) {
            abort(403);
        }

        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        // Crea el nuevo elemento
        $receiptItem = ReceiptItem::create([
            'receipt_id' => $receipt->id,
            'product_id' => $data['product_id'],
            'quantity' => $data['quantity'],
            'price' => $data['price'],
        ]);

        // Actualiza el inventario del producto
        $product = Product::find($data['product_id']);
        if ($receipt->type === 'venta') {
            $product->quantity -= $data['quantity'];
        } else {
            $product->quantity += $data['quantity'];
        }
        $product->save();

        return response()->json(['message' => 'Elemento del recibo creado correctamente.', 'item' => $receiptItem]);
    }

    /**
     * Actualiza un elemento de un recibo.
     */
    public function update(Request $request, ReceiptItem $receiptItem)
    {
        if (!Gate::allows('update', $receiptItem)) {
            abort(403);
        }

        $data = $request->validate([
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $receiptItem->update($data);

        return response()->json(['message' => 'Elemento del recibo actualizado correctamente.', 'item' => $receiptItem]);
    }

    /**
     * Elimina un elemento de un recibo.
     */
    public function destroy(ReceiptItem $receiptItem)
    {
        if (!Gate::allows('delete', $receiptItem)) {
            abort(403);
        }

        // Actualiza el inventario al eliminar el elemento
        $product = $receiptItem->product;
        if ($receiptItem->receipt->type === 'venta') {
            $product->quantity += $receiptItem->quantity;
        } else {
            $product->quantity -= $receiptItem->quantity;
        }
        $product->save();

        $receiptItem->delete();

        return response()->json(['message' => 'Elemento del recibo eliminado correctamente.']);
    }
}
