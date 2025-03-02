import { Navigate, Outlet, useParams, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");  // Token normal
    const { token: urlToken } = useParams();  // Token desde la URL
    const location = useLocation();

    // Permitir acceso si hay un token en localStorage o en la URL
    return token || (location.pathname.includes("cambiar-contra") && urlToken) 
        ? <Outlet /> 
        : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
