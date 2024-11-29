import React from 'react';

const InventoryCritical = ({ criticalStock, inactiveProducts }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            {/* Inventario Crítico */}
            <div>
                <h3 className="text-lg font-semibold">Inventario Crítico</h3>
                <ul className="list-disc pl-5">
                    {criticalStock.map((product) => (
                        <li key={product.id}>
                            {product.name}: {product.quantity} unidades restantes
                        </li>
                    ))}
                </ul>
            </div>

            {/* Productos Sin Movimiento */}
            <div>
                <h3 className="text-lg font-semibold">Productos Sin Movimiento</h3>
                <ul className="list-disc pl-5">
                    {inactiveProducts.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InventoryCritical;
