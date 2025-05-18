// src/pages/Torneo/IngresarResultados.jsx
import React, { useState, useEffect, useRef } from "react";
import Dashboard from "../../layout/Dashboard";
import { createBracket } from "bracketry";
import { Button } from "react-bootstrap";

const partidosMock = [
  { id: 1, label: "Jugador 1 vs Jugador 2", jugadores: ["Jugador 1", "Jugador 2"] },
  { id: 2, label: "Jugador 3 vs Jugador 4", jugadores: ["Jugador 3", "Jugador 4"] },
];

const initialSeries = [
  { id: 1, puntaje1: 0, puntaje2: 0 },
];

const bracketDataMock = {
  rounds: [
    {
      title: "Cuartos",
      seeds: [
        { id: 1, teams: ["Jugador 1", "Jugador 2"], score: [0, 0] },
        { id: 2, teams: ["Jugador 3", "Jugador 4"], score: [0, 0] },
      ],
    },
    {
      title: "Semis",
      seeds: [
        { id: 3, teams: ["Ganador 1", "Ganador 2"], score: [0, 0] },
      ],
    },
    {
      title: "Final",
      seeds: [
        { id: 4, teams: ["Ganador Semis", "Ganador Semis"], score: [0, 0] },
      ],
    },
  ],
};

const IngresarResultados = () => {
  const [partido, setPartido] = useState("");
  const [series, setSeries] = useState(initialSeries);
  const [jugadores, setJugadores] = useState([]);
  const [bracketData, setBracketData] = useState(bracketDataMock);
  const bracketContainer = useRef(null);

  // Actualiza jugadores según partido seleccionado
  useEffect(() => {
    const partidoSel = partidosMock.find(p => p.id === Number(partido));
    if (partidoSel) {
      setJugadores([
        { nombre: partidoSel.jugadores[0], puntos: series.reduce((acc, s) => acc + s.puntaje1, 0) },
        { nombre: partidoSel.jugadores[1], puntos: series.reduce((acc, s) => acc + s.puntaje2, 0) },
      ]);
    } else {
      setJugadores([]);
    }
  }, [partido, series]);

  // Renderiza el bracket
  useEffect(() => {
    if (bracketContainer.current) {
      bracketContainer.current.innerHTML = "";
      createBracket(bracketData, bracketContainer.current);
    }
  }, [bracketData]);

  // Añadir nueva serie
  const handleAddSerie = () => {
    setSeries(prev => [
      ...prev,
      { id: prev.length + 1, puntaje1: 0, puntaje2: 0 }
    ]);
  };

  // Cambiar puntaje de una serie
  const handlePuntajeChange = (serieId, idx, value) => {
    setSeries(prev =>
      prev.map(s =>
        s.id === serieId
          ? { ...s, [idx === 0 ? "puntaje1" : "puntaje2"]: Number(value) }
          : s
      )
    );
  };

  // Actualizar bracket (simulado)
  const handleActualizarResultados = () => {
    // Aquí puedes enviar los resultados al backend
    console.log("Partido:", partido);
    console.log("Series:", series);
    // Simula actualizar el bracket
    setBracketData(prev => ({
      ...prev,
      rounds: prev.rounds.map(r => ({
        ...r,
        seeds: r.seeds.map(seed =>
          seed.id === Number(partido)
            ? {
                ...seed,
                score: [
                  series.reduce((acc, s) => acc + s.puntaje1, 0),
                  series.reduce((acc, s) => acc + s.puntaje2, 0),
                ],
              }
            : seed
        ),
      })),
    }));
  };

  // Ganador simulado
  const ganador =
    jugadores.length === 2
      ? jugadores[0].puntos > jugadores[1].puntos
        ? jugadores[0].nombre
        : jugadores[1].nombre
      : "";

  return (
    <Dashboard>
      <div className="container py-4" style={{ background: "#181818", borderRadius: 16 }}>
        <div className="row">
          {/* Columna izquierda */}
          <div className="col-md-7">
            <h2 className="fw-bold mb-4" style={{ color: "#fff", fontSize: "2.5rem" }}>
              Nombre del torneo
            </h2>
            <div className="mb-4 d-flex gap-3 align-items-end">
              <div className="flex-grow-1">
                <label className="form-label text-white mb-2" style={{ fontSize: "1.1rem" }}>
                  Elije el partido
                </label>
                <select
                  className="form-select"
                  style={{
                    background: "#222",
                    color: "#aaa",
                    border: "none",
                    minWidth: 220,
                    height: 44,
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    borderRadius: 8,
                  }}
                  value={partido}
                  onChange={e => {
                    setPartido(e.target.value);
                    setSeries(initialSeries);
                  }}
                >
                  <option value="">Elije un partido a disputarse</option>
                  {partidosMock.map(p => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>
              <Button
                style={{
                  background: "#B84F8C",
                  border: "none",
                  minWidth: 140,
                  height: 44,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: 8,
                }}
                onClick={handleAddSerie}
                disabled={!partido}
              >
                Añadir serie
              </Button>
            </div>
            <div className="mb-4">
              <label className="form-label text-white mb-2" style={{ fontSize: "1.1rem" }}>
                Puntos totales por jugador
              </label>
              <div className="d-flex gap-2">
                {jugadores.map((j, idx) => (
                  <div
                    key={idx}
                    className="flex-fill text-white rounded p-2 text-center"
                    style={{
                      minWidth: 120,
                      background: "#333",
                      borderRadius: 8,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    <div style={{ borderBottom: "1px solid #555", marginBottom: 8, paddingBottom: 4 }}>
                      {j.nombre}
                    </div>
                    <div style={{ fontSize: "1.6rem" }}>{j.puntos}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Series */}
            {series.map((serie, idx) => (
              <div key={serie.id} className="mb-3">
                <div
                  className="fw-bold text-white mb-2"
                  style={{ fontSize: "1.1rem" }}
                >
                  Puntaje serie {idx + 1}
                </div>
                <div
                  className="d-flex gap-2 p-3"
                  style={{
                    background: "#0B0000",
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <input
                    type="number"
                    className="form-control bg-dark text-white text-center"
                    value={serie.puntaje1}
                    min={0}
                    onChange={e => handlePuntajeChange(serie.id, 0, e.target.value)}
                    style={{
                      minWidth: 120,
                      background: "#222",
                      border: "none",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      borderRadius: 8,
                    }}
                  />
                  <input
                    type="number"
                    className="form-control bg-dark text-white text-center"
                    value={serie.puntaje2}
                    min={0}
                    onChange={e => handlePuntajeChange(serie.id, 1, e.target.value)}
                    style={{
                      minWidth: 120,
                      background: "#222",
                      border: "none",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Columna derecha */}
          <div className="col-md-5">
            <h4 className="fw-bold text-white mb-3" style={{ fontSize: "2rem" }}>
              Resultados
            </h4>
            <div
              className="bg-white rounded p-3 mb-3 d-flex align-items-center justify-content-center"
              style={{
                minHeight: 240,
                border: "2px solid #B84F8C",
                borderRadius: 12,
                width: "100%",
                maxWidth: 380,
                margin: "0 auto",
              }}
            >
              <div ref={bracketContainer} style={{ width: "100%" }} />
            </div>
            <div className="text-white text-center mb-3" style={{ fontSize: "1.1rem" }}>
              Ganador del enfrentamiento <br />
              <span className="fw-bold" style={{ fontSize: "1.3rem" }}>{ganador}</span>
            </div>
            <div className="d-flex gap-3 justify-content-center">
              <Button
                style={{
                  background: "#B84F8C",
                  border: "none",
                  minWidth: 180,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: 8,
                }}
                onClick={handleActualizarResultados}
                disabled={!partido}
              >
                Actualizar Resultados
              </Button>
              <Button
                style={{
                  background: "#555",
                  border: "none",
                  minWidth: 120,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: 8,
                }}
                onClick={() => window.history.back()}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default IngresarResultados;
