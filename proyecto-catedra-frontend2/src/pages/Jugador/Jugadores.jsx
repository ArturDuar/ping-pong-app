import { Link } from "react-router-dom";
import Dashboard from "../../layout/Dashboard";
import { useJugadorContext } from "../../contexts/JugadorContext";
import { useEffect } from "react";

const Jugadores = () => {
  const { jugadores, fetchJugadores } = useJugadorContext();

  useEffect(() => {
    fetchJugadores();
  }, []);

  return (
    <Dashboard>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-row gap-2">
          <h2 className="mb-0">Jugadores</h2>
          <Link to="/jugadores/crear-jugador" className="btn btn-primary">
            Crear nuevo jugador
          </Link>
        </div>

        {jugadores && jugadores.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {jugadores.map((jugador) => (
              <div
                key={jugador.id}
                className="card card-bg p-3 shadow-sm border-0"
              >
                <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                  {/* Imagen */}
                  <img
                    src={jugador.enlace_fotografia}
                    alt={jugador.nombre_jugador}
                    className="rounded-circle m-auto"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Info */}
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{jugador.nombre_jugador}</h6>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                      {jugador.nacionalidad} | {jugador.genero} | {jugador.edad} años
                    </div>
                  </div>

                  {/* Botón */}
                  <div className="text-sm-end">
                    <Link
                      to={`/jugadores/${jugador.id}`}
                      className="btn btn-sm btn-primary w-100 w-sm-auto"
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
            <p className="text-muted">No hay jugadores disponibles.</p>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Jugadores;

