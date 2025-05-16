import { Link } from "react-router-dom";
import Dashboard from "../../layout/Dashboard";
import { useEffect } from "react";
import { useTorneoContext } from "../../hooks/useTorneoContext";

const Torneos = () => {
  const { torneos, fetchTorneos } = useTorneoContext();

  useEffect(() => {
    fetchTorneos();
  }, []);

  return (
    <Dashboard>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-row gap-2">
          <h2 className="mb-0">Torneos</h2>
          <Link to="/torneos/crear-torneo" className="btn btn-primary">
            Crear nuevo torneo
          </Link>
        </div>

        {torneos && torneos.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {torneos.map((torneo) => (
              <div
                key={torneo.id}
                className="card card-bg p-3 shadow-sm border-0"
              >
                <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center">
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{torneo.nombre_torneo}</h5>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                      {torneo.lugar_evento} | {torneo.categoria_genero} | {torneo.estado}
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {new Date(torneo.fecha_inicio).toLocaleDateString()} -{" "}
                      {new Date(torneo.fecha_fin).toLocaleDateString()}
                    </div>
                    <p className="mb-0 mt-2">{torneo.descripcion}</p>
                  </div>
                  <div className="text-md-end">
                    <Link
                      to={`/torneos/${torneo.id}`}
                      className="btn btn-sm btn-primary w-100 w-md-auto"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">
            <p className="text-muted">No hay torneos disponibles.</p>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Torneos;
