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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetch('https://api-condominio-su1h.onrender.com/api/departamentos')
      .then(response => response.json())
      .then(data => setDepartamentos(data))
      .catch(error => console.error('Error obteniendo departamentos:', error));
  }, []);

  const handleRegisterMulta = () => {
    setLoading(true);
    const departamentoSeleccionado = departamentos.find(
      departamento => departamento.nombreDepartamento === selectedDepartamento
    );

    if (!departamentoSeleccionado) {
      setLoading(false);
      setModalMessage('Por favor selecciona un departamento válido.');
      setModalVisible(true);
      return;
    }

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
      .then(response => response.json())
      .then(() => {
        setLoading(false);
        setModalMessage('Multa registrada exitosamente.');
        setModalVisible(true);
        setTimeout(() => navigate('/multas'), 2000);
      })
      .catch(error => {
        setLoading(false);
        setModalMessage('Error registrando la multa. Inténtalo de nuevo.');
        setModalVisible(true);
      });
  };

  return (
    <div className="registrarmultas-container">
      <Navbar />
      <img src={logoImage} alt="Logo del sistema" className="logo" />
      <h1 className="registrarmultas-text">Registrar Multa</h1>
      <div className="form-container">
        <label className="form-label">Departamento</label>
        <select className="select-field" value={selectedDepartamento} onChange={e => setSelectedDepartamento(e.target.value)}>
          <option value="">Selecciona un departamento</option>
          {departamentos.map(departamento => (
            <option key={departamento._id} value={departamento.nombreDepartamento}>
              {departamento.nombreDepartamento}
            </option>
          ))}
        </select>

        <label className="form-label">Motivo</label>
        <input type="text" className="input-field" value={motivo} onChange={e => setMotivo(e.target.value)} />

        <label className="form-label">Monto</label>
        <input type="number" className="input-field" value={monto} onChange={e => setMonto(e.target.value)} />

        <label className="form-label">Fecha</label>
        <input type="date" className="input-field" value={fecha} onChange={e => setFecha(e.target.value)} />

        <label className="form-label">Estado de Pago</label>
        <select className="select-field" value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="">Selecciona el estado</option>
          <option value="pagado">Pagado</option>
          <option value="pendiente">Pendiente</option>
        </select>

        <label className="form-label">Comentario</label>
        <textarea className="input-field" value={comentario} onChange={e => setComentario(e.target.value)}></textarea>

        <button className="btn-register" onClick={handleRegisterMulta} disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Multa'}
        </button>
      </div>
      <CSSTransition in={modalVisible} timeout={300} classNames="modal" unmountOnExit>
        <div className="modal-overlay" onClick={() => setModalVisible(false)}>
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setModalVisible(false)}>Cerrar</button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default RegistrarMultas;
