import React, { useEffect, useState } from "react";
import Dashboard from "../../layout/Dashboard";
import { useParams } from "react-router-dom";
import { partidoService } from "../../services/PartidoService";
import { Link } from "react-router-dom";
import { useTorneoContext } from "../../contexts/TorneoContext";

const Partidos = () => {
  const { id } = useParams(); // id del torneo
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generando, setGenerando] = useState(false);
  const [torneo, setTorneo] = useState(null);
  const { getById } = useTorneoContext();
  // para mostrar carga al generar

  useEffect(() => {
    const fetchPartidosdelTorneo = async () => {
      try {
        setLoading(true);
        setError(null);
        const partidosdelTorneo = await partidoService.getAll(id);
        setPartidos(partidosdelTorneo);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidosdelTorneo();
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchTorneo = async () => {
        const data = await getById(id);
        console.log("data:", data);
        setTorneo(data);
      };
      fetchTorneo();
    }
  }, [id, getById]);

  const handleGenerarPartidos = async () => {
    try {
      setGenerando(true);
      setError(null);

      if (!torneo.jugadores || torneo.jugadores.length === 0) {
        alert("No hay jugadores añadidos");
        return;
      }

      await partidoService.generarPartidos(id); // genera en el backend
      const partidosActualizados = await partidoService.getAll(id); // vuelve a pedirlos
      setPartidos(partidosActualizados); // actualiza la vista
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerando(false);
    }
  };

  const partidosPorRonda = partidos.reduce((acc, partido) => {
    if (!acc[partido.ronda]) {
      acc[partido.ronda] = [];
    }
    acc[partido.ronda].push(partido);
    return acc;
  }, {});

  // Obtenemos las rondas ordenadas descendente:
  const rondasOrdenadas = Object.keys(partidosPorRonda)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <Dashboard>
      <h2 className="mt-4 mb-4">Partidos del Torneo #{id}</h2>

      {loading && <p>Cargando partidos...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && partidos.length === 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center container">
          <button
            className="btn btn-primary w-25 mb-4"
            onClick={handleGenerarPartidos}
            disabled={generando}
          >
            {generando ? "Generando..." : "Generar partidos"}
          </button>
          <p className="text-muted">
            No hay partidos registrados para este torneo.
          </p>
        </div>
      )}

      <div className="d-flex flex-wrap gap-3 container">
        {rondasOrdenadas.map((ronda) => (
          <div key={ronda} className="mb-4 w-100">
            <h3 className="w-100">Ronda {ronda}</h3>
            <div className="d-flex flex-row flex-wrap gap-3">
              {partidosPorRonda[ronda].map((partido) => (
                <div
                  key={partido.id}
                  className="card card-bg text-white shadow-lg p-3 mb-4"
                  style={{
                    borderRadius: "1rem",
                    minWidth: "260px",
                    maxWidth: "340px",
                    margin: "auto",
                  }}
                >
                  <div className="card-body text-center">
                    <h5 className="mb-3">Partido #{partido.id}</h5>

                    <div className="d-flex justify-content-around align-items-center mb-4">
                      <div className="text-center">
                        <img
                          src={partido.jugador1?.fotografia}
                          alt="Jugador 1"
                          className="rounded-circle mb-2"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                        <p className="mb-0">
                          <strong>{partido.jugador1?.nombre}</strong>
                        </p>
                      </div>

                      <div className="text-white-50 mx-2">vs</div>

                      <div className="text-center">
                        <img
                          src={partido.jugador2?.fotografia}
                          alt="Jugador 2"
                          className="rounded-circle mb-2"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                        <p className="mb-0">
                          <strong>{partido.jugador2?.nombre}</strong>
                        </p>
                      </div>
                    </div>

                    <p className="card-text">
                      <strong>Ganador:</strong>{" "}
                      {partido.ganador ? (
                        <span className="text-success">
                          {partido.ganador.nombre}
                        </span>
                      ) : (
                        <span className="text-muted">Sin definir</span>
                      )}
                    </p>

                    <Link to={`/torneos/partidos/${partido.id}/series`}>
                      <button className="btn btn-primary mt-2">
                        Ver series
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
};

export default Partidos;
