import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importar jwtDecode
import './Navbar.css';
import logoImage from './assets/imgs/logo.png';
import { fetchInterceptor } from './fetchInterceptor';

const perfil = localStorage.getItem('perfil');

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchInterceptor(navigate, setError);
    }, [navigate]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        const userid = localStorage.getItem('iduser');
        console.log("Cerrando sesión para el usuario:", userid);
    
        try {
            const response = await fetch('https://api-condominio-su1h.onrender.com/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userid }),
            });
    
            if (!response.ok) {
                const text = await response.text(); // Captura la respuesta incluso si no es JSON
                console.error("Error al cerrar sesión:", text);
            } else {
                const result = await response.json();
                console.log("Respuesta del servidor:", result);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            localStorage.clear();
            navigate('/login');
        }
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
                    <li><Link to="/bienvenida">Inicio</Link></li>
                    <li><Link to="/dashboard">Panel de Control</Link></li>
                    {(perfil === "Administrador") && (
                        <>
                            <li><Link to="/usuarios">Administrar Usuarios</Link></li>
                            <li><Link to="/permisos">Permisos de Portones</Link></li>
                        </>
                    )}
                    <li><Link to="/pagos">Administrar Pagos</Link></li>
                    <li><Link to="/multas">Administrar Multas</Link></li>
                </ul>
    
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