// Dashboard/SalesCard.jsx
import React from 'react';

const SalesCard = ({ totalSales, totalIncome, totalProfit, totalCustomers }) => {
    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-primary">
                    <i className="bi bi-cart-fill text-3xl"></i>
                </div>
                <div className="stat-title">Ventas del Día</div>
                <div className="stat-value text-primary">{totalSales}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <i className="bi bi-currency-dollar text-3xl"></i>
                </div>
                <div className="stat-title">Ingresos del Día</div>
                <div className="stat-value text-secondary">${totalIncome.toFixed(2)}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-accent">
                    <i className="bi bi-graph-up-arrow text-3xl"></i>
                </div>
                <div className="stat-title">Ganancias del Día</div>
                <div className="stat-value text-accent">${totalProfit.toFixed(2)}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-info">
                    <i className="bi bi-people-fill text-3xl"></i>
                </div>
                <div className="stat-title">Clientes Nuevos</div>
                <div className="stat-value text-info">{totalCustomers}</div>
            </div>
        </div>
    );
};

export default SalesCard;
