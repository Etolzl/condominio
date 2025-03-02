import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
import BienvenidaUsuario from './bienvenidaUsuario';
import BienvenidaDueño from './bienvenidaDueño';
import Notificaciones from './Notificaciones';
import CambiarContraPerfil from './cambiarContra';
import { fetchInterceptor } from './fetchInterceptor';
import RestablecerContra from './restablecerContra';
import SolicitarRestablecer from './solicitarRestablecer';


const App = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    // Configurar el interceptor de fetch solo una vez cuando la app se monta
    useEffect(() => {
        fetchInterceptor(navigate, setError);
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cambiar-contraseña-perfil" element={<CambiarContraPerfil />} />
            <Route path="/cambiar-contra/:token" element={<RestablecerContra />} />
            <Route path="/solicitar-restablecimiento" element={<SolicitarRestablecer />} />


            <Route element={<ProtectedRoute />}>
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
                <Route path="/bienvenida-usuario" element={<BienvenidaUsuario />} />
                <Route path="/bienvenida-dueño" element={<BienvenidaDueño />} />
                <Route path="/notificaciones" element={<Notificaciones />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default App;
