import React from 'react';
import ApexCharts from 'react-apexcharts';

const Overview = ({
    topProducts,
    topCustomers,
    salesTrend,
    profitByCategory,
    salesByCategory,
    criticalStock,
    totalStockValue,
    inactiveProducts,
    highRotationProducts,
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Productos más vendidos */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Productos Más Vendidos</h3>
                <ApexCharts
                    options={{
                        chart: { type: 'pie' },
                        labels: topProducts.map((p) => p.name),
                        title: { text: 'Productos Más Vendidos' },
                    }}
                    series={topProducts.map((p) => p.quantity_sold)}
                    type="pie"
                    height={300}
                />
            </div>

            {/* Clientes más recurrentes */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Clientes Más Recurrentes</h3>
                <ApexCharts
                    options={{
                        chart: { type: 'bar' },
                        xaxis: { categories: topCustomers.map((c) => c.name) },
                        title: { text: 'Clientes Más Recurrentes' },
                    }}
                    series={[{ data: topCustomers.map((c) => c.purchases) }]}
                    type="bar"
                    height={300}
                />
            </div>

            {/* Tendencia de ventas */}
            <div className="bg-white shadow-md rounded-lg p-6 col-span-1 lg:col-span-2">
                <h3 className="text-lg font-semibold">Tendencia de Ventas (Últimos 7 Días)</h3>
                <ApexCharts
                    options={{
                        chart: { type: 'line' },
                        xaxis: { categories: salesTrend.map((s) => s.date) },
                        title: { text: 'Tendencia de Ventas' },
                    }}
                    series={[{ name: 'Ventas', data: salesTrend.map((s) => s.sales) }]}
                    type="line"
                    height={300}
                />
            </div>

            {/* Ganancia por categoría */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Ganancia por Categoría</h3>
                <ApexCharts
                    options={{
                        chart: { type: 'bar' },
                        xaxis: { categories: profitByCategory.map((p) => p.category) },
                        title: { text: 'Ganancia por Categoría' },
                    }}
                    series={[{ name: 'Ganancia', data: profitByCategory.map((p) => p.profit) }]}
                    type="bar"
                    height={300}
                />
            </div>

            {/* Participación por categoría */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Participación por Categoría</h3>
                <ApexCharts
                    options={{
                        chart: { type: 'pie' },
                        labels: salesByCategory.map((s) => s.category),
                        title: { text: 'Participación por Categoría' },
                    }}
                    series={salesByCategory.map((s) => s.total_sold)}
                    type="pie"
                    height={300}
                />
            </div>

            {/* Inventario crítico */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Inventario Crítico</h3>
                <ul className="list-disc pl-5 space-y-1">
                    {criticalStock.map((item) => (
                        <li key={item.id}>
                            {item.name}: {item.quantity} unidades (Nivel crítico: {item.reorder_level})
                        </li>
                    ))}
                </ul>
            </div>

            {/* Productos sin movimiento */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Productos Sin Movimiento</h3>
                <ul className="list-disc pl-5 space-y-1">
                    {inactiveProducts.map((item) => (
                        <li key={item.id}>
                            {item.name}: {item.quantity} unidades
                        </li>
                    ))}
                </ul>
            </div>

            {/* Productos con mayor rotación */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Productos con Mayor Rotación</h3>
                <ul className="list-disc pl-5 space-y-1">
                    {highRotationProducts.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>

            {/* Stock valorizado */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Stock Valorizado</h3>
                <p className="text-2xl font-bold text-green-600">${totalStockValue.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Overview;
