import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Recuperar el tema de la sesión (si existe) o usar 'winter' como predeterminado
    const initialTheme = usePage().props.theme || 'winter';
    const [theme, setTheme] = useState(initialTheme);

    // Cambiar el tema y guardarlo en la sesión
    const toggleTheme = () => {
        const newTheme = theme === 'winter' ? 'night' : 'winter';
        setTheme(newTheme);

        // Guardar el nuevo tema en la sesión
        axios.post(route('set-theme'), { theme: newTheme })
            .then(() => {
                document.documentElement.setAttribute('data-theme', newTheme);
            })
            .catch((error) => {
                console.error('Error saving theme:', error);
            });
    };

    // Aplicar el tema al cargar el componente
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={drawerOpen} onChange={() => setDrawerOpen(!drawerOpen)} />
            <div className="drawer-content">
                {/* Page content here */}
                <div className="min-h-screen">
                    <nav className="">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between lg:hidden">
                                <div className="flex">
                                    <div className="flex shrink-0 items-center">
                                        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                                            <i className="bi bi-box-seam-fill text-4xl"></i>
                                        </label>
                                    </div>
                                </div>

                                <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                    <div className="relative ms-3">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                    >
                                                        {user.name}

                                                        <svg
                                                            className="-me-0.5 ms-2 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('profile.edit')}>
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="-me-2 flex items-center sm:hidden">
                                    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {header && (
                        <header className="bg-base-200 shadow">
                            <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
                                {header}
                                <label className="swap swap-rotate">
                                    <input type="checkbox" className="hidden" onChange={toggleTheme} />
                                    <i className="swap-off bi bi-sun-fill text-yellow-500"></i>
                                    <i className="swap-on bi bi-moon-fill text-blue-500"></i>
                                </label>
                            </div>
                        </header>
                    )}

                    <main>{children}</main>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content p-4 w-80">
                    <li>
                        <Link href={route('dashboard')} className="btn btn-ghost gap-2">
                            <i className="bi bi-clipboard-data-fill"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href={route('store-information.index')} className="btn btn-ghost gap-2">
                            <i className="bi bi-shop"></i>
                            Informacion de la Tienda
                        </Link>
                    </li>
                    <li>
                        <Link href={route('supplier.index')} className="btn btn-ghost gap-2">
                            <i class="bi bi-box-seam-fill"></i>
                            Proveedor
                        </Link>
                    </li>
                    <li>
                        <Link href={route('customers.index')} className="btn btn-ghost gap-2">
                        <i class="bi bi-people-fill"></i>
                            Clientes
                        </Link>
                    </li>
                    <li>
                        <Link href={route('category.index')} className="btn btn-ghost gap-2">
                        <i class="bi bi-tags-fill"></i>
                            Categoria
                        </Link>
                    </li>
                    <li>
                        <Link href={route('product.index')} className="btn btn-ghost gap-2">
                        <i class="bi bi-grid-fill"></i>
                            Producto
                        </Link>
                    </li>
                    <li>
                        <Link href={route('receipts.index')} className="btn btn-ghost gap-2">
                        <i class="bi bi-grid-fill"></i>
                            Ventas
                        </Link>
                    </li>
                    <li>
                        <Link href={route('profile.edit')} className="btn btn-ghost gap-2">
                            <i className="bi bi-person-circle"></i>
                            Perfil
                        </Link>
                    </li>
                    <li>
                        <Link href={route('logout')} method="post" as="button" className="btn btn-ghost gap-2">
                            <i className="bi bi-box-arrow-right"></i>
                            Cerrar sesion
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
