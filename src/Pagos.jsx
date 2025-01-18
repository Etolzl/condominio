import React, { useState, useEffect } from 'react';
import './Pagos.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Pagos = () => {
    const navigate = useNavigate();
    const [pagos, setPagos] = useState([]);
    const [filteredPagos, setFilteredPagos] = useState([]);
    const [searchFilters, setSearchFilters] = useState({
        fechaInicio: '',
        fechaFin: '',
        departamento: '',
        estado: '',
    });
    

    // Datos para el gráfico
    const ingresosPorMes = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Ingresos ($)',
                data: [5000, 3000, 4000, 7000, 2000, 6000],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    // Simulación de datos de pagos
    useEffect(() => {
        const pagosSimulados = [
            { id: 1, departamento: 'A101', estado: 'Pagado', monto: 1500, fecha: '2025-01-10' },
            { id: 2, departamento: 'B202', estado: 'Pendiente', monto: 2000, fecha: '2025-01-08' },
            { id: 3, departamento: 'C303', estado: 'Pagado', monto: 1200, fecha: '2025-01-05' },
            { id: 4, departamento: 'A101', estado: 'Pagado', monto: 1800, fecha: '2024-12-25' },
        ];
        setPagos(pagosSimulados);
        setFilteredPagos(pagosSimulados);
    }, []);

    // Filtrar pagos basado en los filtros seleccionados
    useEffect(() => {
        const { fechaInicio, fechaFin, departamento, estado } = searchFilters;
        const pagosFiltrados = pagos.filter((pago) => {
            const fechaPago = new Date(pago.fecha);
            const cumpleFechaInicio = fechaInicio ? new Date(fechaInicio) <= fechaPago : true;
            const cumpleFechaFin = fechaFin ? new Date(fechaFin) >= fechaPago : true;
            const cumpleDepartamento = departamento ? pago.departamento.includes(departamento) : true;
            const cumpleEstado = estado ? pago.estado === estado : true;
            return cumpleFechaInicio && cumpleFechaFin && cumpleDepartamento && cumpleEstado;
        });
        setFilteredPagos(pagosFiltrados);
    }, [searchFilters, pagos]);

    const handleAddPago = () => {
        navigate('/registrar-pagos'); // Redirige a la ruta de RegistrarPagos
    };

    return (
        <div className="pagos-container">
            <Navbar />
            <img src={logoImage} alt="Logo del sistema" className="logo" />
            <h1 className="pagos-text">Administración de Pagos</h1>

            <div className="pagos-actions">
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
                    <input
                        type="text"
                        placeholder="Departamento"
                        value={searchFilters.departamento}
                        onChange={(e) => setSearchFilters({ ...searchFilters, departamento: e.target.value })}
                    />
                    <select
                        value={searchFilters.estado}
                        onChange={(e) => setSearchFilters({ ...searchFilters, estado: e.target.value })}
                    >
                        <option value="">Estado</option>
                        <option value="Pagado">Pagado</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                    <button onClick={handleAddPago} className="btn-action">Registrar Nuevo Pago</button>
                </div>

                <div className="grafico">
                    <Bar data={ingresosPorMes} />
                </div>
            </div>

            <div className="pagos-list">
                <table>
                    <thead>
                        <tr>
                            <th>Departamento</th>
                            <th>Estado</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPagos.map((pago) => (
                            <tr key={pago.id}>
                                <td>{pago.departamento}</td>
                                <td>{pago.estado}</td>
                                <td>${pago.monto}</td>
                                <td>{pago.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pagos;
