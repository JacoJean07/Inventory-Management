
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SalesCard from '@/Pages/Dashboard/SalesCard';
import Overview from '@/Pages/Dashboard/Overview';
import InventoryCritical from '@/Pages/Dashboard/InventoryCritical';

export default function Dashboard({ statistics }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 flex">
                    <i className="bi bi-clipboard-data-fill"></i>
                    <div className='divider divider-horizontal'></div>
                    <p>Dashboard</p>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <SalesCard
                        totalSales={statistics.total_sales}
                        totalIncome={statistics.total_income}
                        totalProfit={statistics.total_profit}
                        totalCustomers={statistics.total_customers}
                    />
                </div>
                <div className="py-12">
                    <Overview
                        topProducts={statistics.top_products}
                        topCustomers={statistics.top_customers}
                        salesTrend={statistics.sales_trend}
                        profitByCategory={statistics.profit_by_category}
                        salesByCategory={statistics.sales_by_category}
                        criticalStock={statistics.critical_stock}
                        inactiveProducts={statistics.inactive_products}
                        totalStockValue={statistics.total_stock_value}
                        highRotationProducts={statistics.high_rotation_products}
                    />
                </div>
                <div className="py-12">
                    <InventoryCritical
                        criticalStock={statistics.critical_stock}
                        inactiveProducts={statistics.inactive_products}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
