import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { DataGrid } from '@mui/x-data-grid';

export default function Index({ receipts }) {
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'type', headerName: 'Tipo', flex: 1 },
        { field: 'total', headerName: 'Total', flex: 1 },
        { field: 'created_at', headerName: 'Fecha', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => window.location.href = route('receipts.show', params.row.id)}
                    >
                        Ver
                    </button>
                    <button
                        type="button"
                        className="btn btn-error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
        },
    ];

    // Manejo de eliminación
    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este recibo?')) {
            router.delete(route('receipts.destroy', id), {
                onSuccess: () => alert('Recibo eliminado correctamente.'),
                onError: () => alert('Hubo un error al eliminar el recibo.'),
            });
        }
    };

    const rows = receipts.map((receipt) => ({
        id: receipt.id,
        type: receipt.type === 'venta' ? 'Venta' : 'Compra',
        total: `$${receipt.total.toFixed(2)}`,
        created_at: new Date(receipt.created_at).toLocaleDateString(),
    }));

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Recibos
                </h2>
            }
        >
            <Head title="Recibos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Listado de Recibos</h3>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => window.location.href = route('receipts.create')}
                                >
                                    Nuevo Recibo
                                </button>
                            </div>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{ pagination: { paginationModel } }}
                                    pageSizeOptions={[5, 10]}
                                    disableRowSelectionOnClick
                                    sx={{
                                        border: 'none',
                                        '& .MuiDataGrid-columnHeaders': {
                                            backgroundColor: '#f3f4f6',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
