import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Index({ receipts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);

    // Convertir los datos de recibos a un formato compatible con la tabla
    const rows = receipts.map((receipt) => ({
        id: receipt.id,
        type: receipt.type === 'venta' ? 'Venta' : 'Compra',
        total: `$${receipt.total.toFixed(2)}`,
        created_at: new Date(receipt.created_at).toLocaleDateString(),
    }));

    // Filtrar filas basándose en el término de búsqueda
    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = rows.filter((row) =>
            Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(lowerCaseSearchTerm)
            )
        );
        setFilteredRows(filtered);
    }, [searchTerm, rows]);

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
                                    Nueva Venta
                                </button>
                            </div>

                            {/* Campo de búsqueda */}
                            <div className="mb-4">
                                <TextField
                                    fullWidth
                                    label="Buscar"
                                    variant="outlined"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={filteredRows.length ? filteredRows : rows} // Mostrar filas filtradas
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
