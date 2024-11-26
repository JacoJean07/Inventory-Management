import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ customer }) {
    const { data, setData, put, errors } = useForm({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('customers.update', customer.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <i className="bi bi-people-fill"></i>
                    <span className="divider divider-horizontal"></span>
                    <p>Editar Cliente: {customer.name}</p>
                </h2>
            }
        >
            <Head title={`Editar Cliente: ${customer.name}`} />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="card bg-base-100 shadow-lg rounded-lg">
                        <div className="card-body">
                            <h2 className="text-lg font-semibold">Editar la Información del Cliente</h2>
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
                                            <i className="bi bi-person-fill"></i> Nombre
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar el nombre del cliente"
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
                                            <i className="bi bi-envelope-fill"></i> Correo Electrónico
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Ingresar el correo electrónico"
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
                                            <i className="bi bi-telephone-fill"></i> Teléfono
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar el número de teléfono"
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
                                            <i className="bi bi-geo-alt-fill"></i> Dirección
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar la dirección del cliente"
                                        className="input input-bordered w-full"
                                        name="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    {errors.address && <p className="text-red-500">{errors.address}</p>}
                                </div>

                                <div className="form-control mt-4">
                                    <button type="submit" className="btn btn-primary w-full flex items-center gap-2">
                                        <i className="bi bi-save"></i> Guardar Cambios
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
