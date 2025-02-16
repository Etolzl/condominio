import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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
        const token = localStorage.getItem('token');
    
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const iddepa = decoded.iddepa;
                //console.log("ID Departamento obtenido del token:", iddepa); // Depuración
    
                if (iddepa) {
                    const fetchNotificaciones = async () => {
                        try {
                            //console.log(`Consultando notificaciones en: https://api-condominio-su1h.onrender.com/api/multas/notificaciones/${iddepa}`); // Depuración
                            const response = await fetch(`https://api-condominio-su1h.onrender.com/api/multas/notificaciones/${iddepa}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });
    
                            if (!response.ok) {
                                throw new Error(`Error HTTP: ${response.status}`);
                            }
    
                            const data = await response.json();
                            //console.log("Notificaciones recibidas:", data); // Depuración
                            setNotificaciones(data);
                        } catch (error) {
                            console.error('Error al obtener notificaciones:', error);
                        }
                    };
    
                    fetchNotificaciones();
                    const interval = setInterval(fetchNotificaciones, 10000);
                    return () => clearInterval(interval);
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
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
