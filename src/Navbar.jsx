// src/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Importamos useNavigate
import './Navbar.css';
import logoImage from './assets/imgs/logo.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();  // Inicializamos useNavigate

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        navigate('/login');  // Redirige al Login.jsx
    };

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
                    <li>
                        <Link to="/bienvenida">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Panel de Control</Link>
                    </li>
                    <li>
                        <Link to="/usuarios">Administrar Usuarios</Link>
                    </li>
                    <li>
                        <Link to="/pagos">Administrar Pagos</Link>
                    </li>
                    <li>
                        <Link to="/multas">Administrar Multas</Link>
                    </li>
                    <li>
                        <Link to="/permisos">Permisos de Portones</Link>
                    </li>
                </ul>
                <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default Navbar;
