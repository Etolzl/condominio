import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importamos useLocation
import './Navbar.css';
import logoImage from './assets/imgs/logo.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Detecta la ruta actual

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        navigate('/login'); // Redirige al componente Login.jsx
    };

    // Links del menú con sus rutas
    const menuItems = [
        { name: 'Inicio', path: '/bienvenida' },
        { name: 'Panel de Control', path: '/dashboard' },
        { name: 'Administrar Usuarios', path: '/usuarios' },
        { name: 'Administrar Pagos', path: '/pagos' },
        { name: 'Administrar Multas', path: '/multas' },
        { name: 'Permisos de Portones', path: '/permisos' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logoImage} alt="Logo" className="logo-img" />
                </div>
                <button
                    className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                >
                    {menuOpen ? '✖' : '☰'}
                </button>
                <ul className={`navbar-menu ${menuOpen ? 'show' : ''}`}>
                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            className={location.pathname === item.path ? 'active' : ''}
                        >
                            <a href={item.path}>{item.name}</a>
                        </li>
                    ))}
                </ul>
                <button className="logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
