<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests\Category\CategoryRequest;
use App\Policies\CategoryPolicy;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    //
    protected $categoryPolicy;

    public function __construct(CategoryPolicy $categoryPolicy)
    {
        $this->categoryPolicy = $categoryPolicy;
    }

    public function index()
    {
        if (!Gate::allows('view-categories', Category::class)) {
            abort(404);
        } else {
            return Inertia::render('Admin/Category/index', [
                'categories' => Category::all()
            ]);
        }
    }

    public function create()
    {
        if (!Gate::allows('create-categories', Category::class)) {
            abort(404);
        } else {
            return Inertia::render('Admin/Category/create');
        }
    }

    public function store(CategoryRequest $request)
    {
        if (Gate::allows('create-categories', Category::class)) {
            $category = Category::create($request->validated());

            return redirect()->route('category.index');
        } else {
            abort(403); // Código de error de autorización
        }
    }

    public function edit(Category $category)
    {
        if (Gate::allows('edit-categories', $category)) {
            return Inertia::render('Admin/Category/edit', [
                'category' => $category
            ]);
        } else {
            abort(404);
        }
    }

    public function update(Category $category, CategoryRequest $request)
    {
        if (Gate::allows('edit-categories', $category)) {
            $category->update($request->validated());
            return redirect()->route('category.index');
        } else {
            abort(404);
        }
    }

    public function destroy(Category $category)
    {
        if (Gate::allows('delete-categories', $category)) {
            $category->delete();
            return redirect()->route('category.index');
        } else {
            abort(404);
        }
    }

}
