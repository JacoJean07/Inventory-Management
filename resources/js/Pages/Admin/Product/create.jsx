import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

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
        size_type: 'camisa', // Tipo de talla
        selected_sizes: [], // Tallas seleccionadas
        custom_size: '', // Talla personalizada
        selected_colors: [], // Colores seleccionados
        images: [], // Imágenes cargadas
    });

    const sizes = {
        camisa: ['S', 'M', 'L', 'XL', 'XXL'],
        pantalon: ['28', '30', '32', '34', '36', '38', '40'],
    };

    const colors = ['Rojo', 'Azul', 'Negro', 'Blanco', 'Verde', 'Amarillo'];

    // Generar el SKU dinámicamente
    useEffect(() => {
        const generateSKU = (name) => {
            if (name) {
                const keywords = name.split(' ').map((word) =>
                    word.substring(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, '')
                );
                const randomSuffix = Math.floor(Math.random() * 1000);
                return `${keywords.join('-')}-${randomSuffix}`;
            }
            return '';
        };

        setData('sku', generateSKU(data.name));
    }, [data.name]);

    // Generar código de barras automáticamente al cargar
    useEffect(() => {
        const generateBarcode = () => `BAR-${Date.now()}`;
        setData('barcode', generateBarcode());
    }, []);

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

                                {/* Nombre */}
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

                                {/* Descripción */}
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

                                {/* SKU */}
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
                                        {data.custom_size && (
                                            <input
                                                type="text"
                                                placeholder="Ingresar talla personalizada"
                                                className="input input-bordered w-full mt-2"
                                                value={data.custom_size}
                                                onChange={(e) => setData('custom_size', e.target.value)}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Colores */}
                                <div className="form-control">
                                    <label htmlFor="color-picker" className="label">
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
                                </div>

                                {/* Precio */}
                                <div className='flex gap-4'>
                                    <div className='form-control w-full'>
                                        <label className='label'>
                                            <span className='label-text flex items-center gap-2'>
                                                <i className='bi bi-currency-dollar'></i> Precio a vender
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

                                    <div className='form-control w-full'>
                                        <label className='label'>
                                            <span className='label-text flex items-center gap-2'>
                                                <i className='bi bi-box-seam'></i> Costo de ingreso
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
                                </div>

                                <div className='flex gap-4'>
                                    <div className='form-control w-full'>
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

                                    <div className='form-control w-full'>
                                        <label className='label'>
                                            <span className='label-text flex items-center gap-2'>
                                                <i className='bi bi-arrow-down-up'></i> Nivel de reorden para alertas
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
