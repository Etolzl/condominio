import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
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
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetch('https://api-condominio-su1h.onrender.com/api/departamentos')
      .then((response) => response.json())
      .then((data) => setDepartamentos(data))
      .catch((error) => console.error('Error obteniendo departamentos:', error));
  }, []);

  const handleRegisterMulta = () => {
    const departamentoSeleccionado = departamentos.find(
      (departamento) => departamento.nombreDepartamento === selectedDepartamento
    );

    if (!departamentoSeleccionado) {
      setModalMessage('Por favor, selecciona un departamento válido.');
      setShowModal(true);
      return;
    }

    setLoading(true);
    const multaData = {
      departamento: {
        _iddepa: departamentoSeleccionado._iddepa,
        nombreDepartamento: departamentoSeleccionado.nombreDepartamento,
        torre: departamentoSeleccionado.Torre,
      },
      motivo,
      monto,
      fecha,
      estadoDelPago: estado,
      comentarios: comentario,
    };

    fetch('https://api-condominio-su1h.onrender.com/api/multas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(multaData),
    })
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
        setModalMessage('Multa registrada exitosamente.');
        setShowModal(true);
      })
      .catch((error) => {
        console.error('Error registrando la multa:', error);
        setLoading(false);
        setModalMessage('Error registrando la multa. Inténtalo de nuevo.');
        setShowModal(true);
      });
  };

  return (
    <div className="registrarmultas-container">
      <Navbar />
      <img src={logoImage} alt="Logo del sistema" className="logo" />
      <h1 className="registrarmultas-text">Registrar Multa</h1>

      <div className="form-container">
        <label htmlFor="departamento" className="form-label">Departamento</label>
        <select id="departamento" className="select-field" value={selectedDepartamento} onChange={(e) => setSelectedDepartamento(e.target.value)}>
          <option value="">Selecciona un departamento</option>
          {departamentos.map((departamento) => (
            <option key={departamento._id} value={departamento.nombreDepartamento}>{departamento.nombreDepartamento}</option>
          ))}
        </select>

        <label htmlFor="motivo" className="form-label">Motivo</label>
        <input type="text" id="motivo" className="input-field" placeholder="Ingresa el motivo de la multa" value={motivo} onChange={(e) => setMotivo(e.target.value)} />

        <label htmlFor="monto" className="form-label">Monto</label>
        <input type="number" id="monto" className="input-field" placeholder="Ingresa el monto" value={monto} onChange={(e) => setMonto(e.target.value)} />

        <label htmlFor="fecha" className="form-label">Fecha</label>
        <input type="date" id="fecha" className="input-field" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        <label htmlFor="estado" className="form-label">Estado de Pago</label>
        <select id="estado" className="select-field" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Selecciona el estado</option>
          <option value="pagado">Pagado</option>
          <option value="pendiente">Pendiente</option>
        </select>

        <label htmlFor="comentario" className="form-label">Comentario</label>
        <textarea id="comentario" className="input-field" value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Escribe un comentario" />

        <button className="btn-register" onClick={handleRegisterMulta} disabled={loading}>
          {loading ? 'Cargando...' : 'Registrar Multa'}
        </button>
      </div>

      <CSSTransition in={showModal} timeout={300} classNames="fade" unmountOnExit>
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default RegistrarMultas;
