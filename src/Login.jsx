import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from './assets/imgs/login.jpg';
import logoImage from './assets/imgs/logo.png';

const Login = () => {
    const [telefono, setTelefono] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch('https://api-condominio-su1h.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telefono, contraseña }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Guarda los datos relevantes en localStorage
          localStorage.setItem('iduser', data.user.iduser);
          localStorage.setItem('iddepa', data.user.iddepa);
    
          // Imprime los datos en consola
          console.log('ID del usuario:', data.user.iduser);
          console.log('ID del departamento:', data.user.iddepa);
          console.log('Nombre del departamento:', data.user.nombreDepartamento);
    
          // Redirige según el perfil del usuario
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
              alert('Perfil no reconocido');
          }
        } else {
          alert(data.error || 'Error al iniciar sesión');
        }
      } catch (error) {
        console.error('Error al hacer login:', error);
        alert('Error en el servidor');
      }
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
                        <button type="submit" className="form-button">
                            Iniciar Sesión
                        </button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
