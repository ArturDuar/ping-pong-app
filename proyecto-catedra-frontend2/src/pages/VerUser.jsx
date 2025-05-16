import Dashboard from "../layout/Dashboard";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const VerUser = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Dashboard>
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div className="card card-bg p-5 shadow" style={{ maxWidth: 400, width: "100%" }}>
          <div className="d-flex flex-column align-items-center mb-4">
            <div
              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-3"
              style={{ width: 120, height: 120 }}
            >
              <img src="/img/icono.png" alt="Avatar" style={{ width: 80, height: 80 }} />
            </div>
            <h2 className="fw-bold text-white mb-3">Información</h2>
          </div>
          <div className="text-white text-center mb-4">
            <div className="mb-2">
              <span className="fw-bold">Username:</span>
              <br />
              {user.name}
            </div>
            <div className="mb-2">
              <span className="fw-bold">Correo Electrónico:</span>
              <br />
              {user.email}
            </div>
            <div className="mb-2">
              <span className="fw-bold">Contraseña:</span>
              <br />
              ********
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row gap-2 justify-content-center">
            <button className="btn btn-light fw-bold" disabled>Editar perfil</button>
            <button className="btn btn-primary fw-bold" onClick={logout}>Cerrar Sesión</button>
            <button className="btn btn-secondary fw-bold" disabled>Eliminar cuenta</button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default VerUser;
