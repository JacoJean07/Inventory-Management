import * as React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

export default function Product({ products }) {
    // Estado para búsqueda
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState([]);

    // Convertir los datos de productos a un formato compatible con la tabla
    const rows = products.map((product) => ({
        id: product.id,
        name: product.name,
        image: product.image_path, // Ruta de la imagen
        sku: product.sku,
        barcode: product.barcode,
        category: product.category?.name || 'Sin categoría',
        price: `$${parseFloat(product.price).toFixed(2)}`,
        quantity: product.quantity,
        variants: product.variants.map(variant => ({
            size: variant.size || 'Sin talla',
            color: variant.color || 'Sin color',
            quantity: variant.quantity,
        })),
    }));

    // Filtrar filas basándose en el término de búsqueda
    React.useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = rows.filter((row) =>
            Object.values(row).some((value) =>
                value?.toString().toLowerCase().includes(lowerCaseSearchTerm)
            )
        );
        setFilteredRows(filtered);
    }, [searchTerm, rows]);

    const handleDelete = (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            return;
        }

        router.delete(route('product.destroy', id), {
            onSuccess: () => {
                alert('Producto eliminado correctamente.');
            },
            onError: () => {
                alert('Hubo un error al eliminar el producto.');
            },
        });
    };

    // Definir las columnas de la tabla productos
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Nombre', flex: 1 },
        {
            field: 'image',
            headerName: 'Imagen',
            flex: 1,
            renderCell: (params) => (
                params.row.image ? (
                    <img
                        src={params.row.image}
                        alt="Producto"
                        className="w-12 h-12 object-cover rounded-lg border"
                    />
                ) : (
                    <span className="text-gray-500">Sin imagen</span>
                )
            ),
        },
        { field: 'sku', headerName: 'SKU', flex: 1 },
        { field: 'barcode', headerName: 'Código de Barras', flex: 1 },
        { field: 'category', headerName: 'Categoría', flex: 1 },
        { field: 'price', headerName: 'Precio', flex: 1 },
        { field: 'quantity', headerName: 'Cantidad', flex: 0.5 },
        {
            field: 'variants',
            headerName: 'Variantes',
            flex: 2,
            renderCell: (params) => (
                <div>
                    {params.row.variants.map((variant, index) => (
                        <p key={index}>
                            Talla: {variant.size}, Color: {variant.color}, Cantidad: {variant.quantity}
                        </p>
                    ))}
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => window.location.href = route('product.edit', params.row.id)}
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            ),
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <i className="bi bi-grid-fill"></i>
                    <span className="divider divider-horizontal"></span>
                    <p>Productos</p>
                </h2>
            }
        >
            <Head title="Productos" />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="card shadow-lg rounded-lg bg-base-100">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Productos</h2>
                                <button onClick={() => window.location.href = route('product.create')} type="button" className="btn btn-primary">
                                    Nuevo
                                </button>
                            </div>

                            {/* Campo de búsqueda */}
                            <div className="my-4">
                                <TextField
                                    fullWidth
                                    label="Buscar"
                                    variant="outlined"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="rounded-lg border border-base-300">
                                <DataGrid
                                    rows={filteredRows.length ? filteredRows : rows} // Mostrar filas filtradas
                                    columns={columns}
                                    initialState={{ pagination: { paginationModel } }}
                                    pageSizeOptions={[5, 10]}
                                    disableRowSelectionOnClick
                                    sx={{
                                        border: 'none',
                                        color: 'var(--tw-text-opacity)',
                                        backgroundColor: 'var(--tw-bg-base-200)',
                                        '& .MuiDataGrid-columnHeaders': {
                                            backgroundColor: 'var(bg-base-200)',
                                            color: 'var(font-semibold)',
                                            fontWeight: 'bold',
                                        },
                                        '& .MuiDataGrid-cell': {
                                            color: 'var(--tw-text-opacity)',
                                            borderBottom: '1px solid var(--tw-border-opacity)',
                                        },
                                        '& .MuiDataGrid-footerContainer': {
                                            backgroundColor: 'var(--tw-bg-opacity)',
                                            color: 'var(font-semibold)',
                                        },
                                    }}
                                    className="bg-base-300 text-base-content"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
