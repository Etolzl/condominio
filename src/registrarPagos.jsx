import React from 'react';
import { useNavigate } from 'react-router-dom';
import './registrarPagos.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';

const RegistrarPagos = () => {
    const navigate = useNavigate();

    const handleRegisterPago = () => {
        // Lógica para registrar el pago (por ejemplo, enviar datos a una API)
        console.log('Pago registrado');
        navigate('/pagos'); // Redirigir a la página principal de pagos
    };

    return (
        <div className="registrarpagos-container">
            <Navbar />
            <img src={logoImage} alt="Logo del sistema" className="logo" />
            <h1 className="registrarpagos-text">Registrar Pago</h1>

            <div className="form-container">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <select id="usuario" className="select-field">
                    <option value="">Selecciona un usuario</option>
                    <option value="usuario1">Usuario 1</option>
                    <option value="usuario2">Usuario 2</option>
                    <option value="usuario3">Usuario 3</option>
                </select>

                <label htmlFor="concepto" className="form-label">Concepto</label>
                <input
                    type="text"
                    id="concepto"
                    className="input-field"
                    placeholder="Ingresa el concepto del pago"
                />

                <label htmlFor="monto" className="form-label">Monto</label>
                <input
                    type="number"
                    id="monto"
                    className="input-field"
                    placeholder="Ingresa el monto"
                />

                <label htmlFor="fecha" className="form-label">Fecha</label>
                <input
                    type="date"
                    id="fecha"
                    className="input-field"
                />

                <label htmlFor="estado" className="form-label">Estado de Pago</label>
                <select id="estado" className="select-field">
                    <option value="">Selecciona el estado</option>
                    <option value="pagado">Pagado</option>
                    <option value="pendiente">Pendiente</option>
                </select>

                <label htmlFor="comentario" className="form-label">Comentario</label>
                <textarea
                    id="comentario"
                    className="textarea-field"
                    placeholder="Ingresa un comentario (opcional)"
                ></textarea>

                <button className="btn-register" onClick={handleRegisterPago}>Registrar Pago</button>
            </div>
        </div>
    );
};

export default RegistrarPagos;
