<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Size;
use App\Models\Color;
use App\Models\ProductVariant;
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
            // Cargar productos con todas las relaciones necesarias
            $products = Product::with([
                'category', // Relación con categorías
                'variants.size', // Relación con tallas (a través de variants)
                'variants.color', // Relación con colores (a través de variants)
            ])->get();

            // Asegurar que las relaciones inexistentes se devuelvan como `null`
            $formattedProducts = $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'image_path' => $product->image_path,
                    'sku' => $product->sku,
                    'barcode' => $product->barcode,
                    'category' => $product->category ? $product->category->only(['id', 'name']) : null,
                    'price' => $product->price,
                    'cost' => $product->cost,
                    'quantity' => $product->quantity,
                    'reorder_level' => $product->reorder_level,
                    'variants' => $product->variants->map(function ($variant) {
                        return [
                            'id' => $variant->id,
                            'size' => $variant->size ? $variant->size->name : null,
                            'color' => $variant->color ? $variant->color->name : null,
                            'quantity' => $variant->quantity,
                        ];
                    }),
                    'created_at' => $product->created_at,
                    'updated_at' => $product->updated_at,
                ];
            });

            return Inertia::render('Admin/Product/index', [
                'products' => $formattedProducts
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
            // Validar datos del formulario
            $data = $request->validated();

            // Agregar el ID del usuario autenticado
            $data['user_id'] = auth()->id();

            // Crear el producto principal
            $product = Product::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'sku' => $data['sku'],
                'barcode' => $data['barcode'],
                'category_id' => $data['category_id'],
                'price' => $data['price'],
                'cost' => $data['cost'],
                'quantity' => $data['quantity'],
                'reorder_level' => $data['reorder_level'],
                'user_id' => $data['user_id'], // Añadir el user_id aquí
            ]);

            // Manejo de tallas
            if (!empty($data['selected_sizes'])) {
                foreach ($data['selected_sizes'] as $size) {
                    $sizeModel = Size::firstOrCreate(['name' => $size]);
                    ProductVariant::create([
                        'product_id' => $product->id,
                        'size_id' => $sizeModel->id,
                        'quantity' => $data['quantity'], // Puedes ajustar esta lógica según sea necesario
                    ]);
                }
            }

            // Manejo de colores
            if (!empty($data['selected_colors'])) {
                foreach ($data['selected_colors'] as $color) {
                    $colorModel = Color::firstOrCreate(['name' => $color]);
                    ProductVariant::updateOrCreate([
                        'product_id' => $product->id,
                        'color_id' => $colorModel->id,
                    ], [
                        'quantity' => $data['quantity'], // Puedes ajustar esta lógica según sea necesario
                    ]);
                }
            }

            // Manejo de imágenes
            if (!empty($data['images'])) {
                foreach ($data['images'] as $image) {
                    $path = $image->store('products/images', 'public');
                    $product->update(['image_path' => $path]);
                }
            }

            // Retornar a la vista de productos
            return redirect()->route('product.index')->with('success', 'Producto creado correctamente.');
        } else {
            abort(403, 'No tienes permiso para crear productos.');
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
