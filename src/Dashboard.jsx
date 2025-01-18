import React from 'react';
import './Dashboard.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
    ArcElement,  // Para gráficos tipo pastel o de anillo
    CategoryScale, // Para las escalas de categorías
    LinearScale, // Para escalas lineales
    BarElement, // Para gráficos de barras
    Title, // Para el título del gráfico
    Tooltip, // Para los tooltips
    Legend // Para la leyenda
);
const Dashboard = () => {
    // Datos de ejemplo para los gráficos
    const paymentsData = {
        labels: ['Mensualidad', 'Mantenimiento', 'Otros'],
        datasets: [
            {
                label: 'Pagos realizados',
                data: [1200, 800, 300],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
        ],
    };

    const finesData = {
        labels: ['Pendientes', 'Pagadas'],
        datasets: [
            {
                label: 'Multas',
                data: [15, 25],
                backgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="header">
                <img src={logoImage} alt="Logo del sistema" className="logo" />
                <h1 className="dashboard-text">Panel de Control</h1>
            </div>
            <div className="content">
                <div className="kpis">
                    <div className="kpi-card">Total de usuarios registrados: 500</div>
                    <div className="kpi-card">Pagos realizados este mes: $2300</div>
                    <div className="kpi-card">Multas pendientes: 15</div>
                    <div className="kpi-card">Permisos de portón activos: 40</div>
                </div>
                <div className="charts">
                    <div className="chart">
                        <h3>Pagos Realizados</h3>
                        <Pie data={paymentsData} />
                    </div>
                    <div className="chart">
                        <h3>Multas</h3>
                        <Bar data={finesData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
