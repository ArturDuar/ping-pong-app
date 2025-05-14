// src/routes/PublicRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
