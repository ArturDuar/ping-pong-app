import Dashboard from "../../layout/Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { estadisticasService } from "../../services/EstadisticasService"; // importa el servicio

const VerEstadisticas = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("");
  const [jugadores, setJugadores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const data = await estadisticasService.getAll();
        setJugadores(data);
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener estadísticas:", err);
      }
    };

    fetchEstadisticas();
  }, []);

  return (
    <Dashboard>
      <div className="container py-5">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
          <h2 className="fw-bold mb-3 mb-md-0 text-center w-100" style={{ color: "#fff" }}>
            Estadísticas generales
          </h2>
          
        </div>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <div className="table-responsive mb-4">
          <table className="table table-bordered" style={{ background: "#181818", color: "#fff" }}>
            <thead>
              <tr className="bg-pink-header">
                <th>Nombre del Jugador</th>
                <th>Partidos Jugados</th>
                <th>Partidos Ganados</th>
                <th>Torneos Ganados</th>
              </tr>
            </thead>
            <tbody>
              {jugadores.length > 0 ? (
                jugadores.map((jugador) => (
                  <tr key={jugador.id}>
                    <td>{jugador.nombre_jugador}</td>
                    <td>{jugador.partidos_jugados}</td>
                    <td>{jugador.partidos_ganados}</td>
                    <td>{jugador.torneos_ganados}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No hay datos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  );
};

export default VerEstadisticas;
