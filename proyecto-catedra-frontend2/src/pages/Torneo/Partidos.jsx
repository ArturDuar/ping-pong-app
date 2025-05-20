import React, { useEffect, useState } from "react";
import Dashboard from "../../layout/Dashboard";
import { useParams } from "react-router-dom";
import { partidoService } from "../../services/PartidoService";
import { Link } from "react-router-dom";

const Partidos = () => {
  const { id } = useParams(); // id del torneo
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generando, setGenerando] = useState(false); // para mostrar carga al generar

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

  const handleGenerarPartidos = async () => {
    try {
      setGenerando(true);
      setError(null);
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
          <div key={ronda} className="mb-4">
            <h3 className="w-100">Ronda {ronda}</h3>
            <div className="d-flex flex-row flex-wrap gap-3">
              {partidosPorRonda[ronda].map((partido) => (
                <div
                  key={partido.id}
                  className="card bg-dark text-white shadow"
                  style={{ minWidth: "150px", maxWidth: "280px" }}
                >
                  <div className="card-body">
                    <p className="card-text mb-1">
                      <strong>Jugador 1:</strong> {partido.jugador1?.nombre}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Jugador 2:</strong> {partido.jugador2?.nombre}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Ganador:</strong>{" "}
                      {partido.ganador ? (
                        partido.ganador.nombre
                      ) : (
                        <span className="text-muted">Sin definir</span>
                      )}
                    </p>
                    <Link to={`/torneos/partidos/${partido.id}/series`}>
                      <button className="btn btn-primary mt-3">
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
