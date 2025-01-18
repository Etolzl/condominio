import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Permisos.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';

const Permisos = () => {
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleAssignTempAccess = () => {
        navigate('/asignar-permiso'); // Redirigir a la página de asignar permiso
    };

    return (
        <div className="permisos-container">
            <Navbar />
            <img src={logoImage} alt="Logo del sistema" className="logo" />
            <h1 className="permisos-text">Permisos de Portones</h1>

            <div className="panel-accesos">
                <h2>Panel de Accesos</h2>

                {/* Lista de usuarios con acceso permitido */}
                <div className="accesos-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Juan Pérez</td>
                                <td>Activo</td>
                                <td>
                                    <button className="btn-action">Desactivar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>María López</td>
                                <td>Inactivo</td>
                                <td>
                                    <button className="btn-action">Activar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Registro de accesos recientes */}
                <div className="registro-accesos">
                    <h3>Accesos Recientes</h3>
                    <ul>
                        <li>12:45 PM - Juan Pérez</li>
                        <li>01:30 PM - María López</li>
                        <li>03:00 PM - Juan Pérez</li>
                    </ul>
                </div>

                {/* Botones de acción */}
                <div className="acciones-permisos">
                    <button className="btn-action" onClick={handleAssignTempAccess}>
                        Asignar Acceso Temporal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Permisos;
