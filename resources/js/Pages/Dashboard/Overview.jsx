import React from 'react';
import ApexCharts from 'react-apexcharts';

const Overview = ({ topProducts, topCustomers, salesTrend }) => {
    // Configuración del gráfico de pastel (Productos más vendidos)
    const topProductsChart = {
        series: topProducts.map(product => product.quantity),
        options: {
            chart: { type: 'pie' },
            labels: topProducts.map(product => product.name),
            title: { text: 'Productos más vendidos', align: 'center' },
        },
    };

    // Configuración del gráfico de barras (Clientes más recurrentes)
    const topCustomersChart = {
        series: [{ data: topCustomers.map(customer => customer.purchases) }],
        options: {
            chart: { type: 'bar' },
            xaxis: { categories: topCustomers.map(customer => customer.name) },
            title: { text: 'Clientes más recurrentes', align: 'center' },
        },
    };

    // Configuración del gráfico de línea (Tendencia de ventas)
    const salesTrendChart = {
        series: [{ name: 'Ventas', data: salesTrend.map(day => day.sales) }],
        options: {
            chart: { type: 'line' },
            xaxis: { categories: salesTrend.map(day => day.date) },
            title: { text: 'Tendencia de ventas (últimos 7 días)', align: 'center' },
        },
    };

    return (
        <div className="space-y-8">
            {/* Gráfico de pastel: Productos más vendidos */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <ApexCharts
                    options={topProductsChart.options}
                    series={topProductsChart.series}
                    type="pie"
                    height={300}
                />
            </div>

            {/* Gráfico de barras: Clientes más recurrentes */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <ApexCharts
                    options={topCustomersChart.options}
                    series={topCustomersChart.series}
                    type="bar"
                    height={300}
                />
            </div>

            {/* Gráfico de línea: Tendencia de ventas */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <ApexCharts
                    options={salesTrendChart.options}
                    series={salesTrendChart.series}
                    type="line"
                    height={300}
                />
            </div>
        </div>
    );
};

export default Overview;
