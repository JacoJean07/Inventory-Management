import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Edit({ product, categories }) {
    const { data, setData, put, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        sku: product.sku || '',
        barcode: product.barcode || '',
        category_id: product.category_id || '',
        price: product.price || '',
        cost: product.cost || '',
        quantity: product.quantity || '',
        reorder_level: product.reorder_level || '',
        size_type: product.size_type || 'camisa',
        selected_sizes: product.variants?.map(v => v.size) || [],
        custom_size: '',
        selected_colors: product.variants?.map(v => v.color) || [],
        images: [], // Para subir nuevas imágenes
    });

    const sizes = {
        camisa: ['S', 'M', 'L', 'XL', 'XXL'],
        pantalon: ['28', '30', '32', '34', '36', '38', '40'],
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('product.update', product.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className='text-2xl font-bold flex items-center gap-2'>
                    <i className='bi bi-grid-fill'></i>
                    <span className='divider divider-horizontal'></span>
                    <p>Editar Producto</p>
                </h2>
            }
        >
            <Head title='Editar Producto' />

            <div className='py-12'>
                <div className='container mx-auto px-4'>
                    <div className='card bg-base-100 shadow-lg rounded-lg'>
                        <div className='card-body'>
                            <h2 className='text-lg font-semibold'>Datos del Producto</h2>
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

                                {/* Nombre */}
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-tag-fill'></i> Nombre
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className='input input-bordered w-full'
                                        name='name'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className='text-red-500'>{errors.name}</p>}
                                </div>

                                {/* Descripción */}
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text flex items-center gap-2'>
                                            <i className='bi bi-card-text'></i> Descripción
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className='input input-bordered w-full'
                                        name='description'
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <p className='text-red-500'>{errors.description}</p>}
                                </div>

                                {/* SKU y Código de Barras */}
                                <div className="flex gap-4">
                                    <div className='form-control w-full'>
                                        <label className='label'>
                                            <span className='label-text flex items-center gap-2'>
                                                <i className='bi bi-upc-scan'></i> SKU
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className='input input-bordered w-full'
                                            name='sku'
                                            value={data.sku}
                                            readOnly
                                        />
                                        {errors.sku && <p className='text-red-500'>{errors.sku}</p>}
                                    </div>
                                    <div className='form-control w-full'>
                                        <label className='label'>
                                            <span className='label-text flex items-center gap-2'>
                                                <i className='bi bi-upc'></i> Código de Barras
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className='input input-bordered w-full'
                                            name='barcode'
                                            value={data.barcode}
                                            readOnly
                                        />
                                        {errors.barcode && <p className='text-red-500'>{errors.barcode}</p>}
                                    </div>
                                </div>

                                {/* Categoría */}
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

                                {/* Tipo de Talla */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-rulers"></i> Tipo de Talla
                                        </span>
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="size_type"
                                                value="camisa"
                                                checked={data.size_type === 'camisa'}
                                                onChange={(e) => setData('size_type', e.target.value)}
                                            />
                                            Camisa
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="size_type"
                                                value="pantalon"
                                                checked={data.size_type === 'pantalon'}
                                                onChange={(e) => setData('size_type', e.target.value)}
                                            />
                                            Pantalón
                                        </label>
                                    </div>
                                </div>

                                {/* Tallas */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-rulers"></i> Tallas
                                        </span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes[data.size_type].map((size) => (
                                            <label key={size} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    value={size}
                                                    checked={data.selected_sizes.includes(size)}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const selected = data.selected_sizes.includes(value)
                                                            ? data.selected_sizes.filter((s) => s !== value)
                                                            : [...data.selected_sizes, value];
                                                        setData('selected_sizes', selected);
                                                    }}
                                                />
                                                {size}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* colores */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-palette"></i> Seleccionar Colores
                                        </span>
                                    </label>
                                    <div className="flex flex-wrap gap-4">
                                        {/* Color Picker Input */}
                                        <div>
                                            <input
                                                type="color"
                                                id="color-picker"
                                                className="p-1 h-10 w-14 cursor-pointer border border-gray-300 rounded-lg shadow-sm"
                                                value={data.custom_color}
                                                onChange={(e) => {
                                                    const color = e.target.value;
                                                    setData('custom_color', color);
                                                    if (!data.selected_colors.includes(color)) {
                                                        setData('selected_colors', [...data.selected_colors, color]);
                                                    }
                                                }}
                                                title="Elige un color"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Color personalizado</p>
                                        </div>

                                        {/* Lista de colores seleccionados */}
                                        {data.selected_colors.map((color, index) => (
                                            <div key={index} className="relative group">
                                                <div
                                                    className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute -top-2 -right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() =>
                                                        setData(
                                                            'selected_colors',
                                                            data.selected_colors.filter((c) => c !== color)
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Subir Imágenes */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-file-image"></i> Imágenes
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => setData('images', Array.from(e.target.files))}
                                        className="file-input file-input-bordered w-full"
                                    />
                                    {errors.images && <p className="text-red-500">{errors.images}</p>}
                                    <p className="text-xs text-gray-500">
                                        Los archivos deben ser de formato: jpeg, png, jpg, gif y no más de 2 MB.
                                    </p>
                                </div>

                                {/* Precio y Costo */}
                                <div className="flex gap-4">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text flex items-center gap-2">
                                                <i className="bi bi-currency-dollar"></i> Precio
                                            </span>
                                        </label>
                                        <input
                                            type="number"
                                            className="input input-bordered w-full"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text flex items-center gap-2">
                                                <i className="bi bi-currency-dollar"></i> Costo
                                            </span>
                                        </label>
                                        <input
                                            type="number"
                                            className="input input-bordered w-full"
                                            value={data.cost}
                                            onChange={(e) => setData('cost', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-control mt-4">
                                    <button type="submit" className="btn btn-primary">
                                        Guardar Cambios
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
