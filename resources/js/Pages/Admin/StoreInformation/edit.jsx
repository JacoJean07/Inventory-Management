import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ storeInformation }) {
    const { data, setData, put, errors } = useForm({
        name: storeInformation.name || '',
        address: storeInformation.address || '',
        address_reference: storeInformation.address_reference || '',
        city: storeInformation.city || '',
        phone: storeInformation.phone || '',
        email: storeInformation.email || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('store-information.update', storeInformation.id)); // Envía los datos a la ruta 'store-information.update'
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <i className="bi bi-shop"></i>
                    <span className="divider divider-horizontal"></span>
                    <p>Edit Store Information</p>
                </h2>
            }
        >
            <Head title="Edit Store Information" />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="card bg-base-100 shadow-lg rounded-lg">
                        <div className="card-body">
                            <h2 className="text-lg font-semibold">Edit Store Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-building"></i> Store Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter store name"
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
                                            <i className="bi bi-geo-alt"></i> Address
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter address"
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
                                            <i className="bi bi-signpost"></i> Address Reference
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter address reference"
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
                                            <i className="bi bi-geo"></i> City
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter city"
                                        className="input input-bordered w-full"
                                        name="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                    />
                                    {errors.city && <p className="text-red-500">{errors.city}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <i className="bi bi-telephone"></i> Phone
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter phone number"
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
                                            <i className="bi bi-envelope"></i> Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        className="input input-bordered w-full"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                                </div>

                                <div className="form-control mt-4">
                                    <button type="submit" className="btn btn-primary w-full flex items-center gap-2">
                                        <i className="bi bi-save"></i> Save Changes
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
