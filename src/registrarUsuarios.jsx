import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './registrarUsuarios.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';

const RegistrarUsuarios = () => {
    const navigate = useNavigate(); // Inicializar el hook de navegación

    const handleRegister = () => {
        // Aquí puedes agregar la lógica para registrar al usuario.
        // Por ejemplo, enviar datos a una API.

        console.log('Usuario registrado'); // Mensaje de prueba
        navigate('/usuarios'); // Redirigir a la página Usuarios.jsx
    };

    return (
        <div className="registrarusuarios-container">
            <Navbar />
            <img src={logoImage} alt="Logo del sistema" className="logo" />
            <h1 className="registrarusuarios-text">Registrar Usuario</h1>

            <div className="form-container">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input type="text" id="telefono" className="input-field" placeholder="Ingresa tu teléfono" />

                <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                <input type="text" id="nombre" className="input-field" placeholder="Ingresa tu nombre" />

                <label htmlFor="apellido" className="form-label">Apellido(s)</label>
                <input type="text" id="apellido" className="input-field" placeholder="Ingresa tu apellido" />

                <label htmlFor="contraseña" className="form-label">Contraseña</label>
                <input type="password" id="contraseña" className="input-field" placeholder="Ingresa tu contraseña" />

                <label htmlFor="perfil" className="form-label">Perfil (Rol)</label>
                <select id="perfil" className="select-field">
                    <option value="dueño">Dueño</option>
                    <option value="administrador">Administrador</option>
                    <option value="inquilino">Inquilino</option>
                </select>

                <label htmlFor="torre" className="form-label">Torre</label>
                <input type="text" id="torre" className="input-field" placeholder="Ingresa tu torre" />

                <label htmlFor="departamento" className="form-label">Departamento(s)</label>
                <input type="text" id="departamento" className="input-field" placeholder="Ingresa tu(s) departamento(s)" />

                <button className="btn-register" onClick={handleRegister}>Registrar Usuario</button>
            </div>
        </div>
    );
};

export default RegistrarUsuarios;
