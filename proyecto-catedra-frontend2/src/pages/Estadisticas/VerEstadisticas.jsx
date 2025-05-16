import Dashboard from "../../layout/Dashboard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const mockData = [
  {
    numero: 10,
    partidos: 125,
    victorias: 100,
    derrotas: 25,
    ranking: "Posición N° 1",
  },
  {
    numero: 7,
    partidos: 110,
    victorias: 80,
    derrotas: 30,
    ranking: "Posición N° 2",
  },
  {
    numero: 15,
    partidos: 98,
    victorias: 60,
    derrotas: 38,
    ranking: "Posición N° 3",
  },
  {
    numero: 22,
    partidos: 90,
    victorias: 55,
    derrotas: 35,
    ranking: "Posición N° 4",
  },
  {
    numero: 3,
    partidos: 85,
    victorias: 50,
    derrotas: 35,
    ranking: "Posición N° 5",
  },
  {
    numero: 12,
    partidos: 80,
    victorias: 45,
    derrotas: 35,
    ranking: "Posición N° 6",
  },
  {
    numero: 5,
    partidos: 75,
    victorias: 40,
    derrotas: 35,
    ranking: "Posición N° 7",
  },
  {
    numero: 8,
    partidos: 70,
    victorias: 38,
    derrotas: 32,
    ranking: "Posición N° 8",
  },
  {
    numero: 18,
    partidos: 68,
    victorias: 36,
    derrotas: 32,
    ranking: "Posición N° 9",
  },
  {
    numero: 21,
    partidos: 65,
    victorias: 33,
    derrotas: 32,
    ranking: "Posición N° 10",
  },
  {
    numero: 9,
    partidos: 60,
    victorias: 30,
    derrotas: 30,
    ranking: "Posición N° 11",
  },
  {
    numero: 13,
    partidos: 58,
    victorias: 28,
    derrotas: 30,
    ranking: "Posición N° 12",
  },
  {
    numero: 17,
    partidos: 55,
    victorias: 25,
    derrotas: 30,
    ranking: "Posición N° 13",
  },
  {
    numero: 20,
    partidos: 52,
    victorias: 22,
    derrotas: 30,
    ranking: "Posición N° 14",
  },
  {
    numero: 23,
    partidos: 50,
    victorias: 20,
    derrotas: 30,
    ranking: "Posición N° 15",
  },
];

const VerEstadisticas = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("");

  return (
    <Dashboard>
      <div className="container py-5">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
          <h2 className="fw-bold mb-3 mb-md-0 text-center w-100" style={{ color: "#fff" }}>
            Estadísticas generales
          </h2>
          <div className="mb-0" style={{ minWidth: 320, maxWidth: 400 }}>
            <label className="form-label text-white" htmlFor="filtro">
              Filtro
            </label>
            <select
              id="filtro"
              className="form-select"
              style={{
                background: "#222",
                color: "#aaa",
                border: "none",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="">Selección de torneo</option>
              <option value="ganadas">Selección de partidos ganados</option>
            </select>
          </div>
        </div>
        <div className="table-responsive mb-4">
          <table className="table table-bordered" style={{ background: "#181818", color: "#fff" }}>
            <thead>
              <tr className="bg-pink-header">
                <th>N° de Jugador</th>
                <th>Partidos disputados</th>
                <th>Victorias</th>
                <th>Derrotas</th>
                <th>Posición / Ranking</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.numero}</td>
                  <td>{row.partidos} partidos</td>
                  <td>{row.victorias} Partidos</td>
                  <td>{row.derrotas}</td>
                  <td>{row.ranking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <button
            className="btn fw-bold"
            style={{
              background: "#B84F8C",
              color: "#fff",
              border: "none",
              minWidth: 220,
              fontSize: "1.2rem",
              borderRadius: 10,
              padding: "0.8rem 2.5rem",
            }}
            onClick={() => navigate("/")}
          >
            Ir a Inicio
          </button>
        </div>
      </div>
    </Dashboard>
  );
};

export default VerEstadisticas;
