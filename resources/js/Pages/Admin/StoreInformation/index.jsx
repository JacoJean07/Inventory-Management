import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function StoreInformation({ storeInformation }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <i className="bi bi-shop"></i>
                    <span className="divider divider-horizontal"></span>
                    <p>Informacion de la tienda</p>
                </h2>
            }
        >
            <Head title="Informacion de la tienda" />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="card bg-base-100 shadow-lg rounded-lg">
                        <div className="card-body">
                            <h2 className="text-lg font-semibold">Informacion de la tienda</h2>
                            <form className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-building"></i> Nombre de la Tienda
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar el nombre"
                                        className="input input-bordered w-full"
                                        name="name"
                                        value={storeInformation.name}
                                        disabled
                                    />
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
                                        value={storeInformation.address}
                                        disabled
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-signpost"></i> Referencia de la direccion
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar la referencia"
                                        className="input input-bordered w-full"
                                        name="address_reference"
                                        value={storeInformation.address_reference}
                                        disabled
                                    />
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
                                        value={storeInformation.city}
                                        disabled
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-telephone"></i> Telefono celular
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Ingresar el telefono celular"
                                        className="input input-bordered w-full"
                                        name="phone"
                                        value={storeInformation.phone}
                                        disabled
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-envelope"></i> Email / Correo Electronico
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Ingresar el email"
                                        className="input input-bordered w-full"
                                        name="email"
                                        value={storeInformation.email}
                                        disabled
                                    />
                                </div>

                                <div className="form-control mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-primary w-full flex items-center gap-2"
                                        onClick={() => window.location.href = route('store-information.edit', { id: storeInformation.id })}
                                    >
                                        <i className="bi bi-pencil-square"></i> Editar la Informacion de la tienda
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
