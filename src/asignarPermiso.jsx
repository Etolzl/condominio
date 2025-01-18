import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './asignarPermiso.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';

const AsignarPermiso = () => {
    const navigate = useNavigate(); // Inicializar el hook de navegación

    const handleAssignPermission = () => {
        // Lógica para asignar el permiso.
        console.log('Permiso asignado'); // Mensaje de prueba
        navigate('/permisos'); // Redirigir a la página de permisos
    };

    return (
        <div className="asignarpermiso-container">
            <Navbar />
            <img src={logoImage} alt="Logo del sistema" className="logo" />
            <h1 className="asignarpermiso-text">Asignar Permiso de Portón</h1>

            <div className="form-container">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <select id="usuario" className="select-field">
                    <option value="" disabled selected>Selecciona un usuario</option>
                    <option value="usuario1">Usuario 1</option>
                    <option value="usuario2">Usuario 2</option>
                    <option value="usuario3">Usuario 3</option>
                </select>

                <label htmlFor="motivo" className="form-label">Motivo</label>
                <textarea id="motivo" className="textarea-field" placeholder="Ingresa el motivo"></textarea>

                <label htmlFor="torre" className="form-label">Torre</label>
                <input type="text" id="torre" className="input-field" placeholder="Ingresa la torre" />

                <button className="btn-assign" onClick={handleAssignPermission}>Asignar Permiso</button>
            </div>
        </div>
    );
};

export default AsignarPermiso;
