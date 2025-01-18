import React, { useState, useEffect } from 'react';
import './Multas.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Multas = () => {
    const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir
    const [multas, setMultas] = useState([]);
    const [filteredMultas, setFilteredMultas] = useState([]);
    const [searchFilters, setSearchFilters] = useState({
        fechaInicio: '',
        fechaFin: '',
        estado: '',
    });

    // Datos de ejemplo para las multas
    useEffect(() => {
        const multasSimuladas = [
            { id: 1, fecha: '2025-01-10', monto: 1500, estado: 'Pendiente', usuario: 'Juan Pérez' },
            { id: 2, fecha: '2025-01-08', monto: 2000, estado: 'Pagada', usuario: 'Ana López' },
            { id: 3, fecha: '2025-01-05', monto: 1200, estado: 'Pendiente', usuario: 'Carlos García' },
            { id: 4, fecha: '2024-12-25', monto: 1800, estado: 'Pagada', usuario: 'Marta Rodríguez' },
        ];
        setMultas(multasSimuladas);
        setFilteredMultas(multasSimuladas);
    }, []);

    // Filtrar multas basado en los filtros seleccionados
    useEffect(() => {
        const { fechaInicio, fechaFin, estado } = searchFilters;
        const multasFiltradas = multas.filter((multa) => {
            const fechaMulta = new Date(multa.fecha);
            const cumpleFechaInicio = fechaInicio ? new Date(fechaInicio) <= fechaMulta : true;
            const cumpleFechaFin = fechaFin ? new Date(fechaFin) >= fechaMulta : true;
            const cumpleEstado = estado ? multa.estado === estado : true;
            return cumpleFechaInicio && cumpleFechaFin && cumpleEstado;
        });
        setFilteredMultas(multasFiltradas);
    }, [searchFilters, multas]);

    const handleActualizarEstado = (id) => {
        const nuevasMultas = multas.map((multa) =>
            multa.id === id ? { ...multa, estado: multa.estado === 'Pendiente' ? 'Pagada' : 'Pendiente' } : multa
        );
        setMultas(nuevasMultas);
    };

    const handleCrearMulta = () => {
        navigate('/registrar-multas');
    };

    return (
        <div className="multas-container">
            <Navbar />
            <img src={logoImage} alt="Logo del sistema" className="logo" />
            <h1 className="multas-text">Administración de Multas</h1>

            <div className="multas-actions">
                <div className="filtros">
                    <input
                        type="date"
                        placeholder="Fecha Inicio"
                        value={searchFilters.fechaInicio}
                        onChange={(e) => setSearchFilters({ ...searchFilters, fechaInicio: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Fecha Fin"
                        value={searchFilters.fechaFin}
                        onChange={(e) => setSearchFilters({ ...searchFilters, fechaFin: e.target.value })}
                    />
                    <select
                        value={searchFilters.estado}
                        onChange={(e) => setSearchFilters({ ...searchFilters, estado: e.target.value })}
                    >
                        <option value="">Estado</option>
                        <option value="Pagada">Pagada</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                    <button onClick={handleCrearMulta} className="btn-action">Crear Nueva Multa</button>
                </div>
            </div>

            <div className="multas-list">
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMultas.map((multa) => (
                            <tr key={multa.id}>
                                <td>{multa.usuario}</td>
                                <td>{multa.fecha}</td>
                                <td>${multa.monto}</td>
                                <td>{multa.estado}</td>
                                <td>
                                    <button
                                        onClick={() => handleActualizarEstado(multa.id)}
                                        className="btn-accion"
                                    >
                                        {multa.estado === 'Pendiente' ? 'Marcar como Pagada' : 'Marcar como Pendiente'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Multas;
