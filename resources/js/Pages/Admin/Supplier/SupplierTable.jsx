import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import TableHeading from '@/Components/TableHeading';

export default function SuppliersTable({ suppliers, success, queryParams = {} }) {
    const [filters, setFilters] = useState(queryParams);

    const handleSearchChange = (field, value) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);
        router.get(route('suppliers.index'), updatedFilters, { preserveState: true });
    };

    const handleSortChange = (field) => {
        const isAsc = filters.sort_field === field && filters.sort_direction === 'asc';
        const updatedFilters = {
            ...filters,
            sort_field: field,
            sort_direction: isAsc ? 'desc' : 'asc',
        };
        setFilters(updatedFilters);
        router.get(route('suppliers.index'), updatedFilters, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
            router.delete(route('suppliers.destroy', id), {
                onSuccess: () => alert('Proveedor eliminado correctamente.'),
                onError: () => alert('Hubo un error al eliminar el proveedor.'),
            });
        }
    };

    return (
        <>
            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                    {success}
                </div>
            )}
            <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr>
                            <TableHeading
                                name="id"
                                sortField={filters.sort_field}
                                sortDirection={filters.sort_direction}
                                onSortChange={handleSortChange}
                            >
                                ID
                            </TableHeading>
                            <TableHeading
                                name="name"
                                sortField={filters.sort_field}
                                sortDirection={filters.sort_direction}
                                onSortChange={handleSortChange}
                            >
                                Nombre
                            </TableHeading>
                            <TableHeading
                                name="email"
                                sortField={filters.sort_field}
                                sortDirection={filters.sort_direction}
                                onSortChange={handleSortChange}
                            >
                                Email
                            </TableHeading>
                            <TableHeading
                                name="phone"
                                sortField={filters.sort_field}
                                sortDirection={filters.sort_direction}
                                onSortChange={handleSortChange}
                            >
                                Teléfono
                            </TableHeading>
                            <TableHeading
                                name="city"
                                sortField={filters.sort_field}
                                sortDirection={filters.sort_direction}
                                onSortChange={handleSortChange}
                            >
                                Ciudad
                            </TableHeading>
                            <th className="px-3 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    value={filters.name || ''}
                                    placeholder="Buscar por nombre"
                                    onChange={(e) => handleSearchChange('name', e.target.value)}
                                />
                            </th>
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    value={filters.email || ''}
                                    placeholder="Buscar por email"
                                    onChange={(e) => handleSearchChange('email', e.target.value)}
                                />
                            </th>
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    value={filters.phone || ''}
                                    placeholder="Buscar por teléfono"
                                    onChange={(e) => handleSearchChange('phone', e.target.value)}
                                />
                            </th>
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    value={filters.city || ''}
                                    placeholder="Buscar por ciudad"
                                    onChange={(e) => handleSearchChange('city', e.target.value)}
                                />
                            </th>
                            <th className="px-3 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.data.map((supplier) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={supplier.id}
                            >
                                <td className="px-3 py-2">{supplier.id}</td>
                                <td className="px-3 py-2">
                                    <Link
                                        href={route('suppliers.show', supplier.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {supplier.name}
                                    </Link>
                                </td>
                                <td className="px-3 py-2">{supplier.email}</td>
                                <td className="px-3 py-2">{supplier.phone}</td>
                                <td className="px-3 py-2">{supplier.city}</td>
                                <td className="px-3 py-2 text-right">
                                    <Link
                                        href={route('suppliers.edit', supplier.id)}
                                        className="text-blue-600 hover:underline mx-1"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(supplier.id)}
                                        className="text-red-600 hover:underline mx-1"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={suppliers.meta.links} />
        </>
    );
}
