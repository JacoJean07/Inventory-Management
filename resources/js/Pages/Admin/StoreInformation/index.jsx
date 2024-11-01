import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function StoreInformation({ storeInformation }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <i className="bi bi-shop"></i>
                    <span className="divider divider-horizontal"></span>
                    <p>Store Information</p>
                </h2>
            }
        >
            <Head title="Store Information" />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="card bg-base-100 shadow-lg rounded-lg">
                        <div className="card-body">
                            <h2 className="text-lg font-semibold">Info of Store</h2>
                            <form className="space-y-4">
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
                                        value={storeInformation.name}
                                        disabled
                                    />
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
                                        value={storeInformation.address}
                                        disabled
                                    />
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
                                        value={storeInformation.address_reference}
                                        disabled
                                    />
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
                                        value={storeInformation.city}
                                        disabled
                                    />
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
                                        value={storeInformation.phone}
                                        disabled
                                    />
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
                                        <i className="bi bi-pencil-square"></i> Edit Store Information
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
