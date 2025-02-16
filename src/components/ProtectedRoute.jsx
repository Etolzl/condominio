import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Obtener el token del localStorage

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
