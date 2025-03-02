import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './solicitarRestablecer.css';

const SolicitarRestablecer = () => {
    const [lada, setLada] = useState('+52');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRequestReset = async () => {
        if (!telefono) {
            setError('Por favor, ingrese su número de teléfono.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('https://api-condominio-su1h.onrender.com/api/solicitar-restablecimiento', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lada, telefono })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(true); // Mostrar mensaje de éxito
                console.log("Mensaje enviado correctamente:", data.mensaje);
            } else {
                setError(data.error || 'Número de teléfono no encontrado.');
            }
        } catch (error) {
            setError('Error de conexión, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Solicitar-restablecer-container">
            <div className="Solicitar-restablecer-form">
                <h2>Solicitar Restablecimiento de Contraseña</h2>
                <div className="Solicitar-restablecer-input-group">
                    <div className="Solicitar-restablecer-input lada-input">
                        <label htmlFor="lada">Lada:</label>
                        <select id="lada" value={lada} onChange={(e) => setLada(e.target.value)}>
                            <option value="+52">+52 (México)</option>
                        </select>
                    </div>
                    <div className="Solicitar-restablecer-input telefono-input">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input 
                            type="text" 
                            id="telefono" 
                            value={telefono} 
                            onChange={(e) => setTelefono(e.target.value)} 
                            placeholder="1234567890"
                        />
                    </div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Mensaje enviado correctamente. Revise su WhatsApp.</p>}
                <button onClick={handleRequestReset} disabled={loading}>
                    {loading ? 'Enviando...' : 'Solicitar Restablecimiento'}
                </button>
            </div>
        </div>
    );
};

export default SolicitarRestablecer;