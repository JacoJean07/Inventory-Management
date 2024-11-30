import React from 'react';

const InventoryCritical = ({ criticalStock = [], inactiveProducts = [] }) => {
    const isEmpty = (data) => !data || data.length === 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventario Crítico */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Inventario Crítico</h3>
                {!isEmpty(criticalStock) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {criticalStock.map((product) => (
                            <div
                                key={product.id}
                                className="p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm"
                            >
                                <h4 className="text-md font-bold">{product.name}</h4>
                                <p className="text-sm text-gray-600">
                                    Unidades restantes: <span className="font-semibold">{product.quantity}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Nivel crítico: <span className="font-semibold">{product.reorder_level}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hay productos en nivel crítico.</p>
                )}
            </div>

            {/* Productos Sin Movimiento */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Productos Sin Movimiento</h3>
                {!isEmpty(inactiveProducts) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {inactiveProducts.map((product) => (
                            <div
                                key={product.id}
                                className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm"
                            >
                                <h4 className="text-md font-bold">{product.name}</h4>
                                <p className="text-sm text-gray-600">
                                    Unidades en inventario: <span className="font-semibold">{product.quantity}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hay productos sin movimiento.</p>
                )}
            </div>
        </div>
    );
};

export default InventoryCritical;
