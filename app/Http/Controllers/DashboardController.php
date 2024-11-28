<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receipt;
use App\Models\Product;
use App\Models\Customer;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        /*-----------------------------------------------------------------
        Sales Card
        */
        $today = Carbon::today();

        // Estadísticas del día
        $totalSales = Receipt::where('type', 'venta')
            ->whereDate('created_at', $today)
            ->count();

        $totalIncome = Receipt::where('type', 'venta')
            ->whereDate('created_at', $today)
            ->sum('total');

        // Obtener los recibos del día
        $receipts = Receipt::where('type', 'venta')
            ->whereDate('created_at', $today)
            ->with('items') // Asegúrate de cargar la relación 'items'
            ->get();

        // Calcular el total de ganancias considerando descuentos
        $totalProfit = $receipts->sum(function ($receipt) {
            return $receipt->items->sum(function ($item) {
                $totalItem = ($item->price * $item->quantity) - $item->discount;
                $costItem = $item->product->cost * $item->quantity;
                return $totalItem - $costItem;
            });
        });

        $totalCustomers = Customer::count();

        $lowStockProducts = Product::where('quantity', '<', 10)->count();

        $topSellingProducts = Product::withSum('receiptItems', 'quantity')
            ->orderByDesc('receipt_items_sum_quantity')
            ->take(5)
            ->get();

        /*-----------------------------------------------------------------
        overview
        */
        $lastWeek = now()->subDays(7);

        // Productos más vendidos
        $topProducts = Product::withSum('receiptItems', 'quantity')
            ->orderByDesc('receipt_items_sum_quantity')
            ->take(5)
            ->get(['id', 'name', 'receipt_items_sum_quantity as quantity']);

        // Clientes más recurrentes
        $topCustomers = Customer::withCount('receipts')
            ->orderByDesc('receipts_count')
            ->take(5)
            ->get(['id', 'name', 'receipts_count as purchases']);

        // Tendencia de ventas (últimos 7 días)
        $salesTrend = collect(range(0, 6))->map(function ($daysAgo) {
            $date = now()->subDays($daysAgo)->toDateString();
            $sales = Receipt::whereDate('created_at', $date)->sum('total');
            return ['date' => $date, 'sales' => $sales];
        })->reverse()->values();

        return Inertia::render('Dashboard', [
            'statistics' => [
                'total_sales' => $totalSales,
                'total_income' => $totalIncome,
                'total_profit' => $totalProfit,
                'total_customers' => $totalCustomers,
                'low_stock_products' => $lowStockProducts,
                'top_selling_products' => $topSellingProducts,
                'top_products' => $topProducts,
                'top_customers' => $topCustomers,
                'sales_trend' => $salesTrend,
            ],
        ]);
    }
}
