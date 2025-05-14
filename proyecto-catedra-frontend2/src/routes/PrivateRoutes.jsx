// src/routes/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return <p className="text-white">Cargando...</p>; // Puedes poner un spinner aquí
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
