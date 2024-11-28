
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SalesCard from '@/Pages/Dashboard/SalesCard';
import Overview from '@/Pages/Dashboard/Overview';

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
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
