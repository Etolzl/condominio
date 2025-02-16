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

    // Realizamos la consulta a la API de Express
    useEffect(() => {
        const token = localStorage.getItem('token'); 
        
        fetch('https://api-condominio-su1h.onrender.com/api/multas', {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
            //console.log("Multas recibidas:", data); // Agregar este console.log para depurar
            setMultas(data);
            setFilteredMultas(data);
        })
        .catch(error => console.error('Error al obtener las multas:', error));
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
            multa._idmulta === id ? { ...multa, estadoDelPago: multa.estadoDelPago === 'Pendiente' ? 'Pagada' : 'Pendiente' } : multa
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
                            <th>Departamento</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMultas.map((multa) => (
                            <tr key={multa._idmulta}>
                                <td>{multa.departamento.nombreDepartamento}</td>
                                <td>{multa.fecha}</td>
                                <td>${multa.monto}</td>
                                <td>{multa.estadoDelPago}</td>
                                <td>
                                    <button
                                        onClick={() => handleActualizarEstado(multa._idmulta)}
                                        className="btn-accion"
                                    >
                                        {multa.estadoDelPago === 'Pendiente' ? 'Marcar como Pagada' : 'Marcar como Pendiente'}
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
