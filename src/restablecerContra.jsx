import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importar jwtDecode
import './restablecerContra.css';

const RestablecerContra = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [telefono, setTelefono] = useState('');
    const [nuevaContra, setNuevaContra] = useState('');
    const [confirmarContra, setConfirmarContra] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const verificarToken = async () => {
            try {
                const response = await fetch(`https://api-condominio-su1h.onrender.com/api/verificar-token/${token}`);
                const data = await response.json();
                
                if (!response.ok) {
                    setError("Token inválido o expirado.");
                    return;
                }

                // Decodificar el token para obtener los datos del usuario
                const decodedToken = jwtDecode(token);
                console.log("Datos del token:", decodedToken);

                // Establecer el teléfono en el estado
                setTelefono(decodedToken.telefono);

            } catch (err) {
                setError("Error de conexión.");
            }
        };

        verificarToken();
    }, [token]);

    const handleSubmit = async () => {
        if (!nuevaContra || !confirmarContra) {
            setError('Debe completar todos los campos.');
            return;
        }
    
        if (nuevaContra !== confirmarContra) {
            setError('Las contraseñas no coinciden.');
            return;
        }
    
        setLoading(true);
        setError('');
    
        try {
            const response = await fetch('https://api-condominio-su1h.onrender.com/api/cambiar-contra', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, nuevaContra }), // Envía el token y la nueva contraseña
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Contraseña cambiada con éxito.');
                navigate('/login');
            } else {
                setError(data.error || 'Error al cambiar la contraseña.');
            }
        } catch (error) {
            setError('Error de red, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Cambiar-contra-container">
            <div className="Cambiar-contra-form">
                <h2>Cambiar Contraseña</h2>
                <div>
                    <label>Teléfono:</label>
                    <input type="text" value={telefono} disabled />
                </div>
                <div>
                    <label>Nueva Contraseña:</label>
                    <input type="password" value={nuevaContra} onChange={(e) => setNuevaContra(e.target.value)} />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input type="password" value={confirmarContra} onChange={(e) => setConfirmarContra(e.target.value)} />
                </div>
                {error && <p>{error}</p>}
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                </button>
            </div>
        </div>
    );
};

export default RestablecerContra;