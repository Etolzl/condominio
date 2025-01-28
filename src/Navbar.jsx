import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoImage from './assets/imgs/logo.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.clear(); // Limpiar almacenamiento local al cerrar sesión
        navigate('/login');
    };

    useEffect(() => {
        const iddepa = localStorage.getItem('iddepa');

        if (iddepa) {
            const fetchNotificaciones = async () => {
                try {
                    const response = await fetch(`http://localhost:4001/api/multas/notificaciones/${iddepa}`);
                    const data = await response.json();
                    setNotificaciones(data);
                } catch (error) {
                    console.error('Error al obtener notificaciones:', error);
                }
            };

            // Consulta inicial
            fetchNotificaciones();

            // Consulta periódica cada 10 segundos
            const interval = setInterval(fetchNotificaciones, 10000);

            // Limpiar intervalo al desmontar
            return () => clearInterval(interval);
        }
    }, []);

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

                {/* Sección de notificaciones */}
                <div className="notificaciones">
                    <button
                        className="notificaciones-boton"
                        onClick={() => navigate('/notificaciones')}
                    >
                        Notificaciones ({notificaciones.length})
                    </button>
                </div>

                <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default Navbar;
