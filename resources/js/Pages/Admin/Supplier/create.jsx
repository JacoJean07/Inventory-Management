import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create(Supplier) {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        address_reference: '',
        city: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('supplier.store')); // Envía datos a la ruta 'supplier.store'
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <i className="bi bi-box-seam-fill"></i>
                    <span className="divider divider-horizontal"></span>
                    <p>Nuevo Proveedor</p>
                </h2>
            }
        >
            <Head title="Nuevo Proveedor" />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="card bg-base-100 shadow-lg rounded-lg">
                        <div className="card-body">
                            <h2 className="text-lg font-semibold">Datos del nuevo Proveedor</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">

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

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-person"></i> Nombre
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar el nombre"
                                        className="input input-bordered w-full"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-envelope"></i> Email / Correo Electronico
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Ingresar el Correo"
                                        className="input input-bordered w-full"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-telephone"></i> Telefono
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Ingresar el numero de telefono"
                                        className="input input-bordered w-full"
                                        name="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-geo-alt"></i> Direccion
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar la direccion"
                                        className="input input-bordered w-full"
                                        name="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    {errors.address && <p className="text-red-500">{errors.address}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-signpost"></i> Referencia de la direccion
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar una referencia"
                                        className="input input-bordered w-full"
                                        name="address_reference"
                                        value={data.address_reference}
                                        onChange={(e) => setData('address_reference', e.target.value)}
                                    />
                                    {errors.address_reference && <p className="text-red-500">{errors.address_reference}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-geo"></i> Ciudad
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar la Ciudad"
                                        className="input input-bordered w-full"
                                        name="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                    />
                                    {errors.city && <p className="text-red-500">{errors.city}</p>}
                                </div>

                                <div className="form-control mt-4">
                                    <button type="submit" className="btn btn-primary w-full flex items-center gap-2">
                                        <i className="bi bi-save"></i> Guardar el nuevo Proveedor
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
