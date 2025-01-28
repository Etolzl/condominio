import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './registrarMultas.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';

const RegistrarMultas = () => {
  const navigate = useNavigate();

  const [departamentos, setDepartamentos] = useState([]);
  const [motivo, setMotivo] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('');
  const [comentario, setComentario] = useState('');
  const [selectedDepartamento, setSelectedDepartamento] = useState('');

  // Obtener departamentos desde la API
  useEffect(() => {
    fetch('http://localhost:4001/api/departamentos') // URL para obtener departamentos
      .then((response) => response.json())
      .then((data) => setDepartamentos(data))
      .catch((error) => console.error('Error obteniendo departamentos:', error));
  }, []);

// registrarMultas.jsx
const handleRegisterMulta = () => {
  const departamentoSeleccionado = departamentos.find(
    (departamento) => departamento.nombreDepartamento === selectedDepartamento
  );

  const multaData = {
    departamento: {
      _iddepa: departamentoSeleccionado._iddepa,
      nombreDepartamento: departamentoSeleccionado.nombreDepartamento,
      torre: departamentoSeleccionado.Torre, // Asegúrate de que este campo esté presente
    },
    motivo,
    monto,
    fecha,
    estadoDelPago: estado,  // Asegúrate de que 'estado' está correctamente asignado
    comentarios: comentario  // Aquí estás pasando el estado de 'comentario'
  };

  fetch('http://localhost:4001/api/multas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(multaData),
  })
    .then((response) => response.json())
    .then(() => {
      console.log('Multa registrada');
      navigate('/multas'); // Redirigir a la página principal de multas
    })
    .catch((error) => {
      console.error('Error registrando la multa:', error);
    });
};




  return (
    <div className="registrarmultas-container">
      <Navbar />
      <img src={logoImage} alt="Logo del sistema" className="logo" />
      <h1 className="registrarmultas-text">Registrar Multa</h1>

      <div className="form-container">
        <label htmlFor="departamento" className="form-label">Departamento</label>
        <select
          id="departamento"
          className="select-field"
          value={selectedDepartamento}
          onChange={(e) => setSelectedDepartamento(e.target.value)}
        >
          <option value="">Selecciona un departamento</option>
          {departamentos.map((departamento) => (
            <option key={departamento._id} value={departamento.nombreDepartamento}>
              {departamento.nombreDepartamento}
            </option>
          ))}
        </select>

        <label htmlFor="motivo" className="form-label">Motivo</label>
        <input
          type="text"
          id="motivo"
          className="input-field"
          placeholder="Ingresa el motivo de la multa"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <label htmlFor="monto" className="form-label">Monto</label>
        <input
          type="number"
          id="monto"
          className="input-field"
          placeholder="Ingresa el monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <label htmlFor="fecha" className="form-label">Fecha</label>
        <input
          type="date"
          id="fecha"
          className="input-field"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <label htmlFor="estadoDelPago" className="form-label">Estado de Pago</label>
        <select
        id="estado"
        className="select-field"
        value={estado}
        onChange={(e) => setEstado(e.target.value)} // Actualiza el estado cuando se cambia el valor
      >
        <option value="">Selecciona el estado</option>
        <option value="pagado">Pagado</option>
        <option value="pendiente">Pendiente</option>
      </select>


        <label htmlFor="comentarios" className="form-label">Comentario</label>
        <textarea
        id="comentario"
        className="input-field"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)} // Actualiza el estado con el valor del comentario
        placeholder="Escribe un comentario"
        ></textarea>

        <button className="btn-register" onClick={handleRegisterMulta}>Registrar Multa</button>
      </div>
    </div>
  );
};

export default RegistrarMultas;
