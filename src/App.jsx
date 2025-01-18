import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Bienvenida from './Bienvenida';
import Dashboard from './Dashboard';
import Usuarios from './Usuarios';
import Pagos from './Pagos';
import Multas from './Multas';
import Permisos from './Permisos';
import RegistrarUsuarios from './registrarUsuarios';
import RegistrarPagos from './registrarPagos';
import RegistrarMultas from './registrarMultas';
import AsignarPermiso from './asignarPermiso';


const App = () => {
    return (
        <Routes>
            {/* Redirige la ruta principal al Login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bienvenida" element={<Bienvenida />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/multas" element={<Multas />} />
            <Route path="/permisos" element={<Permisos />} />
            <Route path="/registrar-usuario" element={<RegistrarUsuarios />} />
            <Route path="/registrar-pagos" element={<RegistrarPagos />} />
            <Route path="/registrar-multas" element={<RegistrarMultas />} />
            <Route path="/asignar-permiso" element={<AsignarPermiso />} />
        </Routes>
    );
};

export default App;

