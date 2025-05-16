import Dashboard from "../../layout/Dashboard";
import { useJugadorContext } from "../../contexts/JugadorContext";
import { useTorneoContext } from "../../hooks/useTorneoContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AgregarParticipantes = () => {
  const { jugadores, fetchJugadores } = useJugadorContext();
  const { getById, updateTorneo } = useTorneoContext();
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
  const [participantes, setParticipantes] = useState([]);
  const [torneo, setTorneo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar jugadores una sola vez
  useEffect(() => {
    fetchJugadores();
  }, []);

  // Cargar torneo una sola vez
  useEffect(() => {
    const fetchTorneo = async () => {
      if (id) {
        const data = await getById(id);
        setTorneo(data);
        // Si ya hay participantes, inicialízalos como IDs
        if (Array.isArray(data.participantes)) {
          setParticipantes(data.participantes);
        }
      }
    };
    fetchTorneo();
  }, [id, getById]);

  // Convierte los IDs de participantes a objetos jugador
  const participantesObj = participantes
    .map((pid) => jugadores.find((j) => j.id === pid))
    .filter(Boolean);

  // Jugadores aún no añadidos
  const jugadoresDisponibles = jugadores.filter(
    (j) => !participantes.includes(j.id)
  );

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setJugadorSeleccionado(value ? parseInt(value, 10) : null);
  };

  const handleAddJugador = () => {
    if (
      jugadorSeleccionado !== null &&
      !participantes.includes(jugadorSeleccionado)
    ) {
      setParticipantes((prev) => [...prev, jugadorSeleccionado]);
      setJugadorSeleccionado(null);
    }
  };

  const handleRemoveJugador = (pid) => {
    setParticipantes((prev) => prev.filter((j) => j !== pid));
  };

  const handleUpdate = async () => {
    if (!torneo) return;
    try {
      const updated = { ...torneo, participantes };
      await updateTorneo(torneo.id, updated);
      navigate(`/torneos/${torneo.id}`);
    } catch (error) {
      console.error("Error al actualizar el torneo:", error);
    }
  };

  const handleCancelar = () => {
    navigate(`/torneos/${torneo?.id || ""}`);
  };

  return (
    <Dashboard>
      <div className="container py-4">
        <h2 className="mb-4 fw-bold" style={{ color: "#fff", fontSize: "2.2rem" }}>
          {torneo ? torneo.nombre_torneo : "Nombre del torneo"}
        </h2>

        {/* Fila única para select y botones */}
        <div className="d-flex align-items-end flex-wrap gap-2 mb-4">
          <div className="flex-grow-1">
            <label className="form-label text-white mb-1">Elige un jugador</label>
            <select
              className="form-select border-0"
              style={{ background: "#141414", color: "#fff", minWidth: 220, height: 44 }}
              value={jugadorSeleccionado || ""}
              onChange={handleSelectChange}
            >
              <option value="">Selecciona un jugador...</option>
              {jugadoresDisponibles.map((jugador) => (
                <option key={jugador.id} value={jugador.id}>
                  {jugador.nombre_jugador}
                </option>
              ))}
            </select>
          </div>
          <button
            className="fw-bold"
            type="button"
            onClick={handleAddJugador}
            disabled={jugadorSeleccionado === null}
            style={{
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              minWidth: 140,
              height: 44,
              fontSize: "1rem",
              borderRadius: 8,
            }}
          >
            Añadir jugador
          </button>
          <button
            className="fw-bold"
            onClick={handleUpdate}
            style={{
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              minWidth: 160,
              height: 44,
              fontSize: "1rem",
              borderRadius: 8,
            }}
          >
            Actualizar torneo
          </button>
          <button
            className="fw-bold"
            onClick={handleCancelar}
            style={{
              background: "#555",
              color: "#fff",
              border: "none",
              minWidth: 120,
              height: 44,
              fontSize: "1rem",
              borderRadius: 8,
            }}
          >
            Cancelar
          </button>
        </div>

        <div className="card card-bg p-4" style={{ minHeight: 220, background: "#0B0000", borderRadius: 12, border: "none" }}>
          <div className="d-flex gap-3 flex-wrap">
            {participantesObj.length === 0 && <div className="text-white">No hay jugadores añadidos.</div>}
            {participantesObj.map((jugador) => (
              <div key={jugador.id} className="position-relative bg-dark" style={{ width: 120, borderRadius: 8, background: "#181818", boxShadow: "0 2px 8px #00000033", padding: 4 }}>
                <button className="btn p-0 position-absolute" title="Eliminar" onClick={() => handleRemoveJugador(jugador.id)} style={{ top: 4, right: 4, background: "transparent", border: "none", color: "#e74c3c", fontWeight: "bold", fontSize: 22, zIndex: 2 }}>
                  ×
                </button>
                <img src={jugador.enlace_fotografia || "/img/avatar_femenino.png"} alt="Jugador" className="rounded" style={{ width: "100%", height: 90, objectFit: "cover", background: "#222" }} />
                <div className="text-center mt-2 fw-bold" style={{ color: "#fff", fontSize: "1rem" }}>
                  {jugador.nombre_jugador}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default AgregarParticipantes;
