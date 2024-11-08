<?php

namespace App\Http\Requests\Supplier;

use Illuminate\Foundation\Http\FormRequest;

class SupplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'phone' => 'required|string|max:20|regex:/^(\+593\s?)?(\d{2,3})[\s]?\d{3}[\s]?\d{4}$/',
            'address' => 'required|string|max:255',
            'address_reference' => 'required|string|max:255',
            'city' => 'required|string|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio',
            'name.max' => 'El nombre no puede tener más de 100 caracteres',
            'address.required' => 'La dirección es obligatoria',
            'address.max' => 'La dirección no puede tener más de 255 caracteres',
            'address_reference.required' => 'La referencia de dirección es obligatoria',
            'address_reference.max' => 'La referencia de dirección no puede tener más de 255 caracteres',
            'city.required' => 'La ciudad es obligatoria',
            'city.max' => 'La ciudad no puede tener más de 100 caracteres',
            'phone.required' => 'El teléfono es obligatorio',
            'phone.max' => 'El teléfono no puede tener más de 20 caracteres',
            'phone.regex' => 'El teléfono no es válido, debe tener el formato +593 XXX XXXX o 09X XXX XXXX',
            'email.required' => 'El email es obligatorio',
        ];
    }
}
