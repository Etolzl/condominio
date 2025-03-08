import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    const perfil = localStorage.getItem("perfil");
    const location = useLocation();

    // Páginas accesibles solo por Administrador
    const rutasAdmin = ["/usuarios", "/permisos"];

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si el usuario no es Administrador y quiere acceder a una página restringida
    if (rutasAdmin.includes(location.pathname) && perfil !== "Administrador") {
        return <Navigate to="/bienvenida" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
