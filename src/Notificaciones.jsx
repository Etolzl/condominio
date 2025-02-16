import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importar jwtDecode
import './Notificaciones.css';

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded = jwtDecode(token); // Decodificar token correctamente
                const iddepa = decoded.iddepa;
                console.log("ID Departamento obtenido del token:", iddepa);

                if (iddepa) {
                    fetch(`https://api-condominio-su1h.onrender.com/api/multas/notificaciones/${iddepa}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log("Notificaciones recibidas:", data);
                            setNotificaciones(data);
                        })
                        .catch(error => console.error('Error al obtener notificaciones:', error));
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        }
    }, []);

    const eliminarNotificacion = async (id) => {
        try {
            const response = await fetch(`https://api-condominio-su1h.onrender.com/api/multas/notificaciones/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setNotificaciones((prev) => prev.filter((notificacion) => notificacion._id !== id));
            } else {
                console.error('Error al eliminar la notificación');
            }
        } catch (error) {
            console.error('Error al eliminar la notificación:', error);
        }
    };

    return (
        <div className="notificaciones-container">
            <h1>Notificaciones</h1>
            {notificaciones.length === 0 ? (
                <p>No hay nuevas notificaciones.</p>
            ) : (
                <ul>
                    {notificaciones.map((notificacion) => (
                        <li key={notificacion._id}>
                            <strong>Mensaje:</strong> {notificacion.mensaje} <br />
                            <strong>Departamento:</strong> {notificacion.departamento.nombreDepartamento} <br />
                            <button
                                className="eliminar-notificacion"
                                onClick={() => eliminarNotificacion(notificacion._id)}
                            >
                                Eliminar Notificación
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notificaciones;
