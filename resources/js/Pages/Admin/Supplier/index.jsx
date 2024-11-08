import * as React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import SuppliersTable from "./SupplierTable";

export default function Suppliers({ success, Suppliers, queryParams = null }) {


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
                                <SuppliersTable
                                    suppliers={Suppliers}
                                    queryParams={queryParams}
                                    success={success}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
