import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from './assets/imgs/login.jpg';
import logoImage from './assets/imgs/logo.png';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página
        navigate('/bienvenida'); // Redirige a la página de bienvenida
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={loginImage} alt="Login Illustration" />
            </div>
            <div className="login-form">
                <div className="form-content">
                    <img src={logoImage} alt="Logo" className="form-logo" />
                    <h2>Bienvenido Al Sistema De Administracion Del Condominio</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="phone">Número de teléfono</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Número de teléfono"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                className="form-input"
                            />
                        </div>
                        <button type="submit" className="form-button">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
