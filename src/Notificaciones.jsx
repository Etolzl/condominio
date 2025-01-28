import React, { useEffect, useState } from 'react';
import './Notificaciones.css';

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        const iddepa = localStorage.getItem('iddepa');

        if (iddepa) {
            const fetchNotificaciones = async () => {
                try {
                    const response = await fetch(`https://api-condominio-su1h.onrender.com/api/multas/notificaciones/${iddepa}`);
                    const data = await response.json();
                    setNotificaciones(data);
                } catch (error) {
                    console.error('Error al obtener notificaciones:', error);
                }
            };

            fetchNotificaciones();
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
