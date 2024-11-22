import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ categories }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        sku: '',
        barcode: '',
        category_id: '',
        price: '',
        cost: '',
        quantity: '',
        reorder_level: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('product.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className='text-2xl font-bold flex items-center gap-2'>
                    <i className='bi bi-grid-fill'></i>
                    <span className='dividet divider-horizontal'></span>
                    <p>Nuevo Producto</p>
                </h2>
            }
        >
            <Head title='Nuevo Producto' />

            <div className='py-12'>
                <div className='container mx-auto px-4'>
                    <div className='card bg-base-100 shadow-lg rounded-lg'>
                        <div className='card-body'>
                            <h2 className='text-lg font-semibold'>Datos del nuevo producto</h2>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                {Object.keys(errors).length > 0 && (
                                    <div className="text-red-500">
                                        <h3>Errores encontrados:</h3>
                                        <ul>
                                            {Object.keys(errors).map((field, index) => (
                                                <li key={index}>{errors[field]}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-tag-fill'></i> Nombre
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Ingresar el nombre'
                                        className='input input-bordered w-full'
                                        name='name'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className='text-red-500'>{errors.name}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-card-text'></i> Descripción
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Ingresar la descripción'
                                        className='input input-bordered w-full'
                                        name='description'
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <p className='text-red-500'>{errors.description}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-upc-scan'></i> SKU
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Ingresar el SKU'
                                        className='input input-bordered w-full'
                                        name='sku'
                                        value={data.sku}
                                        onChange={(e) => setData('sku', e.target.value)}
                                    />
                                    {errors.sku && <p className='text-red-500'>{errors.sku}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-upc'></i> Código de Barras
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Ingresar el código de barras'
                                        className='input input-bordered w-full'
                                        name='barcode'
                                        value={data.barcode}
                                        onChange={(e) => setData('barcode', e.target.value)}
                                    />
                                    {errors.barcode && <p className='text-red-500'>{errors.barcode}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-list-ul'></i> Categoría
                                        </span>
                                    </label>
                                    <select
                                        className='select select-bordered w-full'
                                        name='category_id'
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                    >
                                        <option value="">Seleccionar una categoría</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className='text-red-500'>{errors.category_id}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-currency-dollar'></i> Precio
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder='Ingresar el precio'
                                        className='input input-bordered w-full'
                                        name='price'
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    {errors.price && <p className='text-red-500'>{errors.price}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-box-seam'></i> Costo
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder='Ingresar el costo'
                                        className='input input-bordered w-full'
                                        name='cost'
                                        value={data.cost}
                                        onChange={(e) => setData('cost', e.target.value)}
                                    />
                                    {errors.cost && <p className='text-red-500'>{errors.cost}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-sort-numeric-up'></i> Cantidad
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder='Ingresar la cantidad'
                                        className='input input-bordered w-full'
                                        name='quantity'
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                    />
                                    {errors.quantity && <p className='text-red-500'>{errors.quantity}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-arrow-down-up'></i> Nivel de reorden
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder='Ingresar el nivel de reorden'
                                        className='input input-bordered w-full'
                                        name='reorder_level'
                                        value={data.reorder_level}
                                        onChange={(e) => setData('reorder_level', e.target.value)}
                                    />
                                    {errors.reorder_level && <p className='text-red-500'>{errors.reorder_level}</p>}
                                </div>

                                <div className='form-control mt-4'>
                                    <button type='submit' className='btn btn-primary w-full flex items-center gap-2'>
                                        <i className='bi bi-save'></i> Guardar el nuevo Producto
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
