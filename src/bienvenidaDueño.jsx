import React from 'react';
import './Bienvenida.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';

const bienvenidaDueño = () => {
    return (
        <div className="welcome-container">
            <Navbar />
            <img src={logoImage} alt="Logo del sistema" className="logo" />
            <h1 className="welcome-text">Bienvenido Al Sistema De Administracion Del Condominio (Dueño)</h1>
        </div>
    );
};

export default bienvenidaDueño;