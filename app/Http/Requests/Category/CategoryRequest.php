<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:225',
            'description' => 'required|string|max:225'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio',
            'name.max' => 'El nombre no puede tener mas de 225 caracteres',
            'description.required' => 'La description es obligatoria',
            'description.max' => 'La description no puede tener mas de 225 caracteres',
        ];
    }
}
