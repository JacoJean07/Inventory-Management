<?php

namespace App\Http\Requests\Receipt;

use Illuminate\Foundation\Http\FormRequest;

class StoreReceiptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $rules = [
            'type' => 'required|in:compra,venta',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.discount' => 'nullable|numeric|min:0',
        ];

        if ($this->type === 'venta') {
            $rules['customer_id'] = 'required|exists:customers,id';
        } elseif ($this->type === 'compra') {
            $rules['supplier_id'] = 'required|exists:suppliers,id';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'type.required' => 'El tipo de recibo es obligatorio.',
            'type.in' => 'El tipo de recibo debe ser "venta" o "compra".',
            'customer_id.required' => 'Debe seleccionar un cliente para una venta.',
            'customer_id.exists' => 'El cliente seleccionado no existe.',
            'supplier_id.required' => 'Debe seleccionar un proveedor para una compra.',
            'supplier_id.exists' => 'El proveedor seleccionado no existe.',
            'items.required' => 'Debe agregar al menos un producto.',
            'items.array' => 'Los productos deben estar en un formato válido.',
            'items.*.product_id.required' => 'El producto es obligatorio.',
            'items.*.product_id.exists' => 'El producto seleccionado no existe.',
            'items.*.quantity.required' => 'La cantidad es obligatoria.',
            'items.*.quantity.min' => 'La cantidad mínima es 1.',
            'items.*.price.required' => 'El precio es obligatorio.',
            'items.*.price.min' => 'El precio no puede ser menor a 0.',
        ];
    }
}
