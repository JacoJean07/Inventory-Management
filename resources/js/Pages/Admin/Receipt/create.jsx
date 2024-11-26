import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ products }) {
    const { data, setData, post, errors } = useForm({
        type: 'venta', // Compra o venta
        items: [], // Lista de elementos del recibo
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Filtra productos en tiempo real según el término de búsqueda
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    // Agrega un producto a la lista de items
    const addItem = (product) => {
        if (product.stock <= 0 && data.type === 'venta') {
            alert(`El producto "${product.name}" no tiene stock disponible.`);
            return;
        }

        const existingItem = data.items.find((item) => item.product_id === product.id);
        if (existingItem) {
            // Verificar si hay suficiente stock para ventas
            if (
                data.type === 'venta' &&
                existingItem.quantity + 1 > product.stock
            ) {
                alert(
                    `No hay suficiente stock para "${product.name}". Disponible: ${product.stock}`
                );
                return;
            }

            setData(
                'items',
                data.items.map((item) =>
                    item.product_id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setData('items', [
                ...data.items,
                {
                    product_id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    discount: 0,
                    stock: product.stock, // Para validar stock disponible
                },
            ]);
        }
    };

    // Actualiza un item (cantidad o descuento)
    const updateItem = (index, key, value) => {
        const updatedItems = [...data.items];

        // Validación de cantidad
        if (key === 'quantity') {
            const stock = updatedItems[index].stock;
            if (data.type === 'venta' && value > stock) {
                alert(
                    `No hay suficiente stock para "${updatedItems[index].name}". Disponible: ${stock}`
                );
                return;
            }
        }

        // Validación de descuento
        if (key === 'discount') {
            const price = updatedItems[index].price;
            if (value > price) {
                alert(`El descuento no puede ser mayor al precio del producto.`);
                return;
            }
        }

        updatedItems[index][key] = value;
        setData('items', updatedItems);
    };

    // Elimina un producto de la lista
    const removeItem = (index) => {
        setData('items', data.items.filter((_, i) => i !== index));
    };

    // Vaciar lista de productos
    const clearItems = () => {
        setData('items', []);
    };

    // Calcula el total general
    const calculateTotal = () => {
        return data.items.reduce(
            (total, item) =>
                total + (item.price - item.discount) * item.quantity,
            0
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('receipts.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl">Nuevo Recibo</h2>}
        >
            <Head title="Nuevo Recibo" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        {/* Tipo de recibo */}
                        <div className="mb-4">
                            <label>Tipo de Recibo</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="input input-bordered"
                            >
                                <option value="venta">Venta</option>
                                <option value="compra">Compra</option>
                            </select>
                        </div>

                        {/* Búsqueda de productos */}
                        <div className="mb-4">
                            <label>Buscar Producto</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Buscar por nombre"
                                className="input input-bordered w-full"
                            />
                            <ul className="bg-white border mt-2 rounded-lg">
                                {filteredProducts.map((product) => (
                                    <li
                                        key={product.id}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => addItem(product)}
                                    >
                                        {product.name} - ${product.price} (Stock: {product.stock})
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Lista de items */}
                        <div className="mb-4">
                            <h3>Productos Seleccionados</h3>
                            <button
                                type="button"
                                className="btn btn-error mb-2"
                                onClick={clearItems}
                            >
                                Vaciar Lista
                            </button>
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Descuento</th>
                                        <th>Total</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    min="1"
                                                    className="input input-bordered w-16"
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'quantity',
                                                            parseInt(e.target.value, 10)
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>${item.price}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={item.discount}
                                                    min="0"
                                                    className="input input-bordered w-16"
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'discount',
                                                            parseFloat(e.target.value) || 0
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>
                                                $
                                                {(
                                                    (item.price - item.discount) *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-error"
                                                    onClick={() => removeItem(index)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total */}
                        <div className="text-right">
                            <h3 className="text-xl font-bold">
                                Total: ${calculateTotal().toFixed(2)}
                            </h3>
                        </div>

                        <button type="submit" className="btn btn-primary mt-4">
                            Guardar Recibo
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
