import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Sistema de Inventario" />
            <div className="flex flex-col min-h-screen" data-theme="light">
                <header className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">
                            Sistema de Inventario <i className="bi bi-box-seam-fill"></i>
                        </a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1">
                                    Tema
                                    <svg width="12px" height="12px" className="inline-block h-2 w-2 fill-current opacity-60"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                                    </svg>
                                </div>
                                <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
                                    <li>
                                        <input type="radio" name="theme-dropdown" id="default-theme"
                                               className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                               aria-label="Default" value="default" />
                                    </li>
                                    <li>
                                        <input type="radio" name="theme-dropdown" id="night-theme"
                                               className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                               aria-label="night" value="night" />
                                    </li>
                                </ul>
                            </div>

                            {auth.user ? (
                                <li>
                                    <Link href="/dashboard" className="btn btn-ghost">
                                        Dashboard
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link href={route('login')} className="btn btn-ghost">
                                            Iniciar sesión
                                        </Link>
                                    </li>
                                    {route().has('register') && (
                                        <li>
                                            <Link href={route('register')} className="btn btn-ghost">
                                                Registrarse
                                            </Link>
                                        </li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </header>

                <main className="flex-1 flex items-center justify-center bg-base-200">
                    <div className="hero w-full max-w-screen-lg">
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="flex-1 text-center">
                                <i className="bi bi-box-seam-fill text-9xl"></i>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-5xl font-bold">Sistema de Inventario</h1>
                                <p className="py-6">
                                    Una aplicación para gestionar y controlar tu inventario de productos.
                                </p>
                                <Link href={route('register')} className="btn btn-primary">
                                    Comenzar
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="py-16 text-center text-sm">
                    <span>Creado por <a href="https://jacojean.pro" target="_blank" className="link link-primary">JacoJean</a></span>
                    <p>Laravel v{laravelVersion} (PHP v{phpVersion})</p>
                </footer>
            </div>
        </>
    );
}
