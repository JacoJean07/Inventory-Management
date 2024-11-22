<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado a realizar esta solicitud.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Define las reglas de validación para la solicitud.
     */
    public function rules(): array
    {
        $productId = $this->route('product')?->id; // Obtén el ID del producto desde la ruta

        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'sku' => "required|string|unique:products,sku,{$productId}|max:255",
            'barcode' => "required|string|unique:products,barcode,{$productId}|max:255",
            'price' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'cost' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'quantity' => 'required|integer|min:0',
            'reorder_level' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ];
    }

    /**
     * Define los mensajes de error personalizados.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del producto es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe superar los 255 caracteres.',

            'description.required' => 'La descripción del producto es obligatoria.',
            'description.string' => 'La descripción debe ser una cadena de texto.',
            'description.max' => 'La descripción no debe superar los 255 caracteres.',

            'sku.required' => 'El SKU es obligatorio.',
            'sku.string' => 'El SKU debe ser una cadena de texto.',
            'sku.unique' => 'El SKU ya está en uso.',
            'sku.max' => 'El SKU no debe superar los 255 caracteres.',

            'barcode.required' => 'El código de barras es obligatorio.',
            'barcode.string' => 'El código de barras debe ser una cadena de texto.',
            'barcode.unique' => 'El código de barras ya está en uso.',
            'barcode.max' => 'El código de barras no debe superar los 255 caracteres.',

            'price.required' => 'El precio del producto es obligatorio.',
            'price.numeric' => 'El precio debe ser un número.',
            'price.regex' => 'El precio debe tener como máximo dos decimales.',

            'cost.required' => 'El costo del producto es obligatorio.',
            'cost.numeric' => 'El costo debe ser un número.',
            'cost.regex' => 'El costo debe tener como máximo dos decimales.',

            'quantity.required' => 'La cantidad es obligatoria.',
            'quantity.integer' => 'La cantidad debe ser un número entero.',
            'quantity.min' => 'La cantidad no puede ser negativa.',

            'reorder_level.required' => 'El nivel de reorden es obligatorio.',
            'reorder_level.integer' => 'El nivel de reorden debe ser un número entero.',
            'reorder_level.min' => 'El nivel de reorden no puede ser negativo.',

            'category_id.required' => 'La categoría es obligatoria.',
            'category_id.exists' => 'La categoría seleccionada no es válida.',
        ];
    }
}
