import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ category }) {
    const { data, setData, put, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('category.update', category.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <i className="bi bi-tags-fill"></i>
                    <span className="divider divider-horizontal"></span>
                    <p>Editar la información de la Categoría {category.name}</p>
                </h2>
            }
        >
            <Head title="Edit Category" />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="card bg-base-100 shadow-lg rounded-lg">
                        <div className="card-body">
                            <h2 className="text-lg font-semibold">Editar la Información de la Categoría</h2>
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
                                            <i className="bi bi-person-fill"></i>
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
                                            <i className="bi bi-teg-fill"></i>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresar la descripcion"
                                        className="input input-bordered w-full"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <p className="text-red-500">{errors.description}</p>}
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
    )
}
