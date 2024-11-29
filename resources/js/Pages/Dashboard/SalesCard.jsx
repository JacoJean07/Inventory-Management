// Dashboard/SalesCard.jsx
import React from 'react';

const SalesCard = ({ totalSales, totalIncome, totalProfit, totalCustomers }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat bg-blue-100 shadow-md rounded-lg p-4">
                <div className="stat-title">Ventas del Día</div>
                <div className="stat-value">{totalSales}</div>
                <div className="stat-desc"><i className="bi bi-cart-fill"></i></div>
            </div>
            <div className="stat bg-green-100 shadow-md rounded-lg p-4">
                <div className="stat-title">Ingresos del Día</div>
                <div className="stat-value">${totalIncome.toFixed(2)}</div>
                <div className="stat-desc"><i className="bi bi-currency-dollar"></i></div>
            </div>
            <div className="stat bg-yellow-100 shadow-md rounded-lg p-4">
                <div className="stat-title">Ganancias</div>
                <div className="stat-value">${totalProfit.toFixed(2)}</div>
                <div className="stat-desc"><i className="bi bi-graph-up-arrow"></i></div>
            </div>
            <div className="stat bg-purple-100 shadow-md rounded-lg p-4">
                <div className="stat-title">Clientes Nuevos</div>
                <div className="stat-value">{totalCustomers}</div>
                <div className="stat-desc"><i className="bi bi-people-fill"></i></div>
            </div>
        </div>
    );
};

export default SalesCard;
