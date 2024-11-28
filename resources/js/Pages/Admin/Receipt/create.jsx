import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ products, customers, suppliers }) {
    const { data, setData, post, errors } = useForm({
        type: 'venta', // Tipo de recibo
        customer_id: null, // Cliente seleccionado
        supplier_id: null, // Proveedor seleccionado
        items: [], // Lista de productos
    });

    const [productSearchTerm, setProductSearchTerm] = useState('');
    const [actorSearchTerm, setActorSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filteredActors, setFilteredActors] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingActors, setLoadingActors] = useState(false);
    const [actorId, setActorId] = useState(null);

    // Filtra clientes/proveedores dinámicamente
    const handleActorSearch = (e) => {
        setActorSearchTerm(e.target.value);
        setLoadingActors(true);

        const searchData = data.type === 'venta' ? customers : suppliers;

        setTimeout(() => {
            setFilteredActors(
                searchData.filter((actor) =>
                    actor.name.toLowerCase().includes(e.target.value.toLowerCase())
                )
            );
            setLoadingActors(false);
        }, 300);
    };

    const selectActor = (actor) => {
        setActorId(actor.id); // Establecer el ID del actor seleccionado
        setActorSearchTerm(actor.name); // Mostrar el nombre del actor en el input de búsqueda
        setFilteredActors([]); // Limpiar resultados

        if (data.type === 'venta') {
            setData('customer_id', actor.id); // Guardar ID del cliente
        } else {
            setData('supplier_id', actor.id); // Guardar ID del proveedor
        }
    };

    // Filtra productos dinámicamente
    const handleProductSearch = (e) => {
        setProductSearchTerm(e.target.value);
        setLoadingProducts(true);

        setTimeout(() => {
            setFilteredProducts(
                products.filter((product) =>
                    product.name.toLowerCase().includes(e.target.value.toLowerCase())
                )
            );
            setLoadingProducts(false);
        }, 300);
    };

    const addItem = (product) => {
        const existingItem = data.items.find((item) => item.product_id === product.id);

        if (existingItem) {
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
                { product_id: product.id, name: product.name, price: product.price, quantity: 1, discount: 0 },
            ]);
        }
    };

    const updateItem = (index, key, value) => {
        const updatedItems = [...data.items];
        updatedItems[index][key] = value;
        setData('items', updatedItems);
    };

    const removeItem = (index) => {
        setData('items', data.items.filter((_, i) => i !== index));
    };

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
            header={<h2 className="font-semibold text-xl text-center">Nuevo Recibo</h2>}
        >
            <Head title="Nuevo Recibo" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Selección de tipo */}
                        <div className="flex justify-center mb-6">
                            <select
                                value={data.type}
                                onChange={(e) => {
                                    setData('type', e.target.value);
                                    setActorSearchTerm('');
                                    setFilteredActors([]);
                                }}
                                className="select select-bordered w-1/3"
                            >
                                <option value="venta">Venta</option>
                                <option value="compra">Compra</option>
                            </select>
                        </div>

                        {/* Búsqueda de clientes/proveedores */}
                        <div className="mb-4">
                            <label>
                                {data.type === 'venta' ? 'Buscar Cliente' : 'Buscar Proveedor'}
                            </label>
                            <input
                                type="text"
                                value={actorSearchTerm}
                                onChange={handleActorSearch}
                                placeholder={`Buscar ${data.type === 'venta' ? 'cliente' : 'proveedor'}`}
                                className="input input-bordered w-full"
                            />
                            <ul className="bg-white border mt-2 rounded-lg max-h-48 overflow-auto">
                                {loadingActors ? (
                                    <div className="p-4 text-center">
                                        <span className="loading loading-spinner loading-md"></span>
                                    </div>
                                ) : (
                                    filteredActors.map((actor) => (
                                        <li
                                            key={actor.id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => selectActor(actor)}
                                        >
                                            {actor.name} - {actor.email || 'Sin correo'}
                                        </li>
                                    ))
                                )}
                            </ul>
                            {/* Input oculto para el ID */}
                            <input
                                type="hidden"
                                name={data.type === 'venta' ? 'customer_id' : 'supplier_id'}
                                value={actorId || ''}
                            />
                        </div>

                        {/* Mostrar errores del backend */}
                        {errors.customer_id && <p className="text-red-500">{errors.customer_id}</p>}
                        {errors.supplier_id && <p className="text-red-500">{errors.supplier_id}</p>}

                        {/* Búsqueda de productos */}
                        <div className="mb-4">
                            <label>Buscar Producto</label>
                            <input
                                type="text"
                                value={productSearchTerm}
                                onChange={handleProductSearch}
                                placeholder="Buscar producto"
                                className="input input-bordered w-full"
                            />
                            <ul className="bg-white border mt-2 rounded-lg max-h-48 overflow-auto">
                                {loadingProducts ? (
                                    <div className="p-4 text-center">
                                        <span className="loading loading-spinner loading-md"></span>
                                    </div>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <li
                                            key={product.id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => addItem(product)}
                                        >
                                            {product.name} - ${product.price}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                        {/* Mostrar errores del backend */}
                        {errors.items && <p className="text-red-500">{errors.items}</p>}

                        {/* Productos seleccionados */}
                        <div>
                            <h3>Productos Seleccionados</h3>
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
                                                    className="btn btn-error btn-sm"
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

                        <button type="submit" className="btn btn-primary w-full">
                            Guardar Recibo
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
