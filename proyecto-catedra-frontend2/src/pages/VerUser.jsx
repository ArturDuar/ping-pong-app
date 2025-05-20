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
        <div
          className="card shadow"
          style={{
            maxWidth: 370,
            width: "100%",
            background: "#180d0f",
            borderRadius: 12,
            border: "none",
            marginBottom: 24,
          }}
        >
          <div className="d-flex flex-column align-items-center mb-3 pt-4">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mb-3"
              style={{
                width: 100,
                height: 100,
                background: "#222",
                overflow: "hidden",
              }}
            >
              <img
                src="/img/icono.png"
                alt="Avatar"
                style={{ width: 70, height: 70, objectFit: "cover" }}
              />
            </div>
            <h2 className="fw-bold text-white mb-3" style={{ fontSize: "2rem" }}>
              Información
            </h2>
          </div>
          <div className="text-white text-center mb-4" style={{ fontSize: "1.1rem" }}>
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
          </div>
        </div>
        {/* Botones fuera de la tarjeta */}
        <div className="d-flex flex-row gap-3 justify-content-center mt-2">
          <button
            className="fw-bold"
            style={{
              background: "#B84F8C",
              color: "#fff",
              border: "none",
              minWidth: 120,
              fontSize: "1rem",
              borderRadius: 8,
              padding: "0.7rem 1.5rem",
              fontWeight: 600,
            }}
            onClick={logout}
          >
            Cerrar Sesión
          </button>

        </div>
      </div>
    </Dashboard>
  );
};

export default VerUser;
