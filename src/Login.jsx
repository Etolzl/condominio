import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';
import loginImage from './assets/imgs/login.jpg';
import logoImage from './assets/imgs/logo.png';
import { fetchInterceptor } from './fetchInterceptor';

const Login = () => {
    const [telefono, setTelefono] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [guardarSesion, setGuardarSesion] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchInterceptor(navigate, setError);
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Resetear errores previos

        try {
            const response = await fetch('https://api-condominio-su1h.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ telefono, contraseña, guardarSesion }),
            });

            const data = await response.json();
            console.log('Datos recibidos del servidor:', data);

            if (response.ok) {
                // Asegurar que 'user' existe antes de usarlo
                if (!data.user || !data.user.perfil) {
                    setError('Error: Perfil de usuario no encontrado.');
                    return;
                }
                // Guardar token solo si es sesión persistente
                if (guardarSesion) {
                    localStorage.setItem('token', data.token);
                }
                else {
                    localStorage.setItem('token', data.token);
                }
                // Guardar datos de usuario en localStorage

                localStorage.setItem('iduser', data.user.iduser);
                localStorage.setItem('iddepa', data.user.iddepa);
                localStorage.setItem('perfil', data.user.perfil);

                // Redirección basada en perfil
                switch (data.user.perfil) {
                    case 'Administrador':
                        navigate('/bienvenida');
                        break;
                    case 'Dueño':
                        navigate('/bienvenida-dueño');
                        break;
                    case 'Inquilino':
                        navigate('/bienvenida-usuario');
                        break;
                    default:
                        setError('Perfil de usuario no reconocido.');
                }
            } else {
                setError(data.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en login:', error);
            setError('Error en el servidor');
        }
    };
    
    useEffect(() => {
        const verificarSesionActiva = async () => {
            const token = localStorage.getItem('token');
            if (!token) return; // Si no hay token, el usuario puede iniciar sesión normalmente

            try {
                const response = await fetch('https://api-condominio-su1h.onrender.com/api/verify-token', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                const data = await response.json();

                if (response.ok) {
                    // Si el token es válido, redirigir según el perfil del usuario almacenado en localStorage
                    const perfil = localStorage.getItem('perfil');
                    switch (perfil) {
                        case 'Administrador':
                            navigate('/bienvenida');
                            break;
                        case 'Dueño':
                            navigate('/bienvenida-dueño');
                            break;
                        case 'Inquilino':
                            navigate('/bienvenida-usuario');
                            break;
                        default:
                            setError('Perfil de usuario no reconocido.');
                    }
                } else {
                    // Si el token está expirado o no es válido, eliminarlo del localStorage
                    localStorage.clear();
                }
            } catch (error) {
                console.error('Error verificando sesión:', error);
            }
        };

        verificarSesionActiva();
    }, [navigate]);

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={loginImage} alt="Login Illustration" />
            </div>
            <div className="login-form">
                <div className="form-content">
                    <img src={logoImage} alt="Logo" className="form-logo" />
                    <h2>Bienvenido Al Sistema De Administración Del Condominio</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="phone">Número de teléfono</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Número de teléfono"
                                className="form-input"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                className="form-input"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                id="guardarSesion"
                                checked={guardarSesion}
                                onChange={(e) => setGuardarSesion(e.target.checked)}
                            />
                            <label htmlFor="guardarSesion">Guardar Sesión</label>
                        </div>
                        <button type="submit" className="form-button">Iniciar Sesión</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p className="forgot-password">
                        <Link to="/cambiar-contraseña">¿Olvidaste tu contraseña?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;