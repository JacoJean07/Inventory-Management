<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receipt;
use App\Models\Product;
use App\Models\Category;
use App\Models\Customer;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $lastMonth = now()->subMonth(); // Un mes atrás

        // Estadísticas del día
        $totalSales = Receipt::where('type', 'venta')
            ->whereDate('created_at', $today)
            ->count();

        $totalIncome = Receipt::where('type', 'venta')
            ->whereDate('created_at', $today)
            ->sum('total');

        $receipts = Receipt::where('type', 'venta')
            ->whereDate('created_at', $today)
            ->with('items')
            ->get();

        $totalProfit = $receipts->sum(function ($receipt) {
            return $receipt->items->sum(function ($item) {
                $totalItem = ($item->price * $item->quantity) - $item->discount;
                $costItem = $item->product->cost * $item->quantity;
                return $totalItem - $costItem;
            });
        });

        $totalCustomers = Customer::count();
        $lowStockProducts = Product::where('quantity', '<', 10)->count();

        // Filtrar productos más vendidos en el último mes
        $topProducts = Product::select('id', 'name')
            ->withSum(['receiptItems as quantity_sold' => function ($query) use ($lastMonth) {
                $query->whereHas('receipt', function ($query) use ($lastMonth) {
                    $query->where('type', 'venta')
                            ->where('created_at', '>=', $lastMonth);
                });
            }], 'quantity')
            ->orderByDesc('quantity_sold')
            ->take(5)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'quantity_sold' => $product->quantity_sold ?? 0,
                ];
            });

        // Filtrar clientes más recurrentes en el último mes
        $topCustomers = Customer::whereHas('receipts', function ($query) use ($lastMonth) {
                $query->where('type', 'venta')
                      ->where('created_at', '>=', $lastMonth);
            })
            ->withCount(['receipts as purchases' => function ($query) use ($lastMonth) {
                $query->where('type', 'venta')
                      ->where('created_at', '>=', $lastMonth);
            }])
            ->orderByDesc('purchases')
            ->take(5)
            ->get()
            ->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'purchases' => $customer->purchases ?? 0,
                ];
            });

        // Tendencia de ventas (últimos 7 días)
        $salesTrend = collect(range(0, 6))->map(function ($daysAgo) {
            $date = now()->subDays($daysAgo)->toDateString();
            $sales = Receipt::whereDate('created_at', $date)->sum('total');
            return ['date' => $date, 'sales' => $sales ?? 0];
        })->reverse()->values();

        //Ganancia por categoria:
        $profitByCategory = Product::selectRaw('categories.name as category, SUM((receipt_items.price * receipt_items.quantity) - (products.cost * receipt_items.quantity)) as profit')
            ->join('receipt_items', 'products.id', '=', 'receipt_items.product_id')
            ->join('receipts', 'receipt_items.receipt_id', '=', 'receipts.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->where('receipts.type', 'venta')
            ->where('receipts.created_at', '>=', $lastMonth)
            ->groupBy('categories.name')
            ->orderByDesc('profit')
            ->get()
            ->map(function ($category) {
                return [
                    'category' => $category->category,
                    'profit' => $category->profit ?? 0,
                ];
            });

        //Productos con mayor rotacion
        $highRotationProducts = Product::select('id', 'name')
            ->withSum('receiptItems', 'quantity')
            ->orderByDesc('receipt_items_sum_quantity')
            ->take(5)
            ->get();

        //Inventario critico
        $criticalStock = Product::whereColumn('quantity', '<=', 'reorder_level')
            ->get(['id', 'name', 'quantity', 'reorder_level']);

        //stock valorizado
        $totalStockValue = Product::sum(DB::raw('quantity * cost'));

        //participacion por categoria
        $salesByCategory = Category::selectRaw('categories.name as category, SUM(receipt_items.quantity) as total_sold')
            ->join('products', 'categories.id', '=', 'products.category_id')
            ->join('receipt_items', 'products.id', '=', 'receipt_items.product_id')
            ->join('receipts', 'receipt_items.receipt_id', '=', 'receipts.id')
            ->where('receipts.type', 'venta')
            ->where('receipts.created_at', '>=', $lastMonth)
            ->groupBy('categories.name')
            ->orderByDesc('total_sold')
            ->get();

        //productos sin movimiento
        $inactiveProducts = Product::whereDoesntHave('receiptItems', function ($query) use ($lastMonth) {
                $query->whereHas('receipt', function ($query) use ($lastMonth) {
                    $query->where('type', 'venta')
                        ->where('created_at', '>=', $lastMonth);
                });
            })
            ->get(['id', 'name', 'quantity']);

        return Inertia::render('Dashboard', [
            'statistics' => [
                'total_sales' => $totalSales ?? 0,
                'total_income' => $totalIncome ?? 0,
                'total_profit' => $totalProfit ?? 0,
                'total_customers' => $totalCustomers ?? 0,
                'low_stock_products' => $lowStockProducts ?? 0,
                'top_products' => $topProducts->isEmpty() ? [] : $topProducts,
                'high_rotation_products' => $highRotationProducts->isEmpty() ? [] : $highRotationProducts,
                'profit_by_category' => $profitByCategory->isEmpty() ? [] : $profitByCategory,
                'critical_stock' => $criticalStock->isEmpty() ? [] : $criticalStock,
                'total_stock_value' => $totalStockValue ?? 0,
                'sales_by_category' => $salesByCategory->isEmpty() ? [] : $salesByCategory,
                'inactive_products' => $inactiveProducts->isEmpty() ? [] : $inactiveProducts,
                'top_customers' => $topCustomers->isEmpty() ? [] : $topCustomers,
                'sales_trend' => $salesTrend->isEmpty() ? [] : $salesTrend,
            ],
        ]);

    }
}
