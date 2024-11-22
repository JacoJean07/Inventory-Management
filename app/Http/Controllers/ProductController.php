<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Http\Requests\Product\StoreProductRequest;
use App\Policies\ProductPolicy;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    protected $productPolicy;

    public function __construct(ProductPolicy $productPolicy)
    {
        $this->productPolicy = $productPolicy;
    }

    /**
     * Muestra la lista de productos.
     */
    public function index()
    {
        if (!Gate::allows('view-products', Product::class)) {
            abort(404);
        } else {
            return Inertia::render('Admin/Product/index', [
                'products' => Product::with('category')->get() // Incluye la relación con categorías
            ]);
        }
    }

    /**
     * Muestra el formulario para crear un producto.
     */
    public function create()
    {
        if (!Gate::allows('create-products', Product::class)) {
            abort(404);
        } else {
            return Inertia::render('Admin/Product/create', [
                'categories' => Category::all() // Enviar categorías para seleccionarlas
            ]);
        }
    }

    /**
     * Almacena un producto nuevo.
     */
    public function store(StoreProductRequest $request)
    {
        if (Gate::allows('create-products', Product::class)) {
            // Combina los datos validados con el user_id
            $data = $request->validated();
            $data['user_id'] = auth()->id();

            // Crea el producto
            $product = Product::create($data);

            return Inertia::render('Admin/Product/index', [
                'products' => Product::with('category')->get()
            ]);
        } else {
            abort(403);
        }
    }

    /**
     * Muestra el formulario para editar un producto.
     */
    public function edit(Product $product)
    {
        if (Gate::allows('edit-products', $product)) {
            return Inertia::render('Admin/Product/edit', [
                'product' => $product->load('category'), // Incluye la categoría asociada
                'categories' => Category::all()
            ]);
        } else {
            abort(404);
        }
    }

    /**
     * Actualiza un producto existente.
     */
    public function update(Product $product, StoreProductRequest $request)
    {
        if (Gate::allows('edit-products', $product)) {
            $product->update($request->validated());

            return Inertia::render('Admin/Product/index', [
                'products' => Product::with('category')->get()
            ]);
        } else {
            abort(404);
        }
    }

    /**
     * Elimina un producto.
     */
    public function destroy(Product $product)
    {
        if (Gate::allows('delete-products', $product)) {
            $product->delete();

            return Inertia::render('Admin/Product/index', [
                'products' => Product::with('category')->get()
            ]);
        } else {
            abort(404);
        }
    }
}
