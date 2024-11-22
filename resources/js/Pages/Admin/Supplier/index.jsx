import * as React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { DataGrid } from '@mui/x-data-grid';

export default function Suppliers({ suppliers }) {
    // Definir las columnas de la tabla supplier
    const columns = [
        { field: 'name', headerName: 'Nombre', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Telefono', flex: 1 },
        { field: 'address', headerName: 'Direccion', flex: 1 },
        { field: 'address_reference', headerName: 'Referencia', flex: 1 },
        { field: 'city', headerName: 'Ciudad', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => window.location.href = route('supplier.edit', params.row.id)}
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

    const handleDelete = (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
            return;
        }

        router.delete(route('supplier.destroy', id), {
            onSuccess: () => {
                alert('Proveedor eliminado correctamente.');
            },
            onError: () => {
                alert('Hubo un error al eliminar al proveedor.');
            },
        });
    };

    // convertir los datos de suppliers a un formato compatible con la tabla
    const rows = suppliers.map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        address_reference: supplier.address_reference,
        city: supplier.city,
    }));

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <i className="bi bi-box-seam-fill"></i>
                    <span className="divider divider-horizontal"></span>
                    <p>Suppliers</p>
                </h2>
            }
        >
            <Head title="Store Information" />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="card shadow-lg rounded-lg bg-base-100">
                        <div className="card-body">
                            <div className='flex items-center justify-between'>
                                <h2 className="text-lg font-semibold">Proveedores</h2>
                                <button onClick={() => window.location.href = route('supplier.create')} type='button' className='btn btn-primary'>Nuevo</button>
                            </div>
                            <div className="rounded-lg border border-base-300">
                                <DataGrid
                                    rows={rows}
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
                                        '& .MuiDataGrid-selectedRowCount': {
                                            color: 'var()',
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
