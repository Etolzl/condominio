import React, { useEffect, useState } from 'react';
import './Notificaciones.css';

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        const iddepa = localStorage.getItem('iddepa');

        if (iddepa) {
            const fetchNotificaciones = async () => {
                try {
                    const response = await fetch(`http://localhost:4001/api/multas/notificaciones/${iddepa}`);
                    const data = await response.json();
                    setNotificaciones(data);
                } catch (error) {
                    console.error('Error al obtener notificaciones:', error);
                }
            };

            fetchNotificaciones();
        }
    }, []);

    const eliminarNotificacion = (id) => {
        setNotificaciones((prev) => prev.filter((multa) => multa._idmulta !== id));

        // Opcional: Aquí podrías enviar una solicitud al servidor para registrar la eliminación.
        /*
        fetch(`http://localhost:4001/api/notificaciones/eliminar/${id}`, {
            method: 'DELETE',
        }).catch((error) => console.error('Error al eliminar notificación:', error));
        */
    };

    return (
        <div className="notificaciones-container">
            <h1>Notificaciones</h1>
            {notificaciones.length === 0 ? (
                <p>No hay nuevas notificaciones.</p>
            ) : (
                <ul>
                    {notificaciones.map((multa) => (
                        <li key={multa._idmulta}>
                            <strong>Motivo:</strong> {multa.motivo} <br />
                            <strong>Monto:</strong> ${multa.monto} <br />
                            <strong>Estado:</strong> {multa.estadoDelPago} <br />
                            <strong>Fecha:</strong> {new Date(multa.fecha).toLocaleDateString()} <br />
                            <button
                                className="eliminar-notificacion"
                                onClick={() => eliminarNotificacion(multa._idmulta)}
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
