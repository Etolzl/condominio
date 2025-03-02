import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./cambiarContra.css";
import logoImage from "./assets/imgs/logo.png";

const CambiarContraPerfil = () => {
    const [telefono, setTelefono] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleChangePassword = async () => {
        try {
            const response = await fetch('https://api-condominio-su1h.onrender.com/api/cambiar-contra', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ telefono, nuevaContraseña }),
            });
    
            const data = await response.json();
    
            if (data.eliminarToken) {
                localStorage.clear();
                sessionStorage.clear();
                alert('Tu sesión ha sido cerrada. Inicia sesión nuevamente.');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            setError('Error en el servidor');
        }
    };
    
    return (
        <div className="Cambiar-contra-container">
            <div className="Cambiar-contra-form">
                <img src={logoImage} alt="Logo" />
                <h1>Cambiar contraseña</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
                    <label htmlFor="telefono">Teléfono:</label>
                    <input 
                        type="text" 
                        id="telefono" 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)} 
                        required 
                    />
                    
                    <label htmlFor="nueva-contraseña">Nueva contraseña:</label>
                    <input 
                        type="password" 
                        id="nueva-contraseña" 
                        value={nuevaContraseña} 
                        onChange={(e) => setNuevaContraseña(e.target.value)} 
                        required 
                    />

                    <button type="submit">Cambiar contraseña</button>
                </form>
                {mensaje && <p className="success-message">{mensaje}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default CambiarContraPerfil
