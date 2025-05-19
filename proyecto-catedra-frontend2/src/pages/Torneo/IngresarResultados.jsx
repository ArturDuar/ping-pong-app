// src/pages/Torneo/IngresarResultados.jsx
import React, { useState, useEffect, useRef } from "react";
import Dashboard from "../../layout/Dashboard";
import { createBracket } from "bracketry";
import { Button } from "react-bootstrap";
import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";

const partidosMock = [
  {
    id: 1,
    label: "Jugador 1 vs Jugador 2",
    jugadores: ["Jugador 1", "Jugador 2"],
  },
  {
    id: 2,
    label: "Jugador 3 vs Jugador 4",
    jugadores: ["Jugador 3", "Jugador 4"],
  },
];

const initialSeries = [{ id: 1, puntaje1: 0, puntaje2: 0 }];

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
      seeds: [{ id: 3, teams: ["Ganador 1", "Ganador 2"], score: [0, 0] }],
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

  useEffect(() => {
    const partidoSel = partidosMock.find((p) => p.id === Number(partido));
    if (partidoSel) {
      setJugadores([
        {
          nombre: partidoSel.jugadores[0],
          puntos: series.reduce((acc, s) => acc + s.puntaje1, 0),
        },
        {
          nombre: partidoSel.jugadores[1],
          puntos: series.reduce((acc, s) => acc + s.puntaje2, 0),
        },
      ]);
    } else {
      setJugadores([]);
    }
  }, [partido, series]);

  useEffect(() => {
    if (bracketContainer.current) {
      bracketContainer.current.innerHTML = "";
      createBracket(bracketData, bracketContainer.current);
    }
  }, [bracketData]);

  const handleAddSerie = () => {
    setSeries((prev) => [
      ...prev,
      { id: prev.length + 1, puntaje1: 0, puntaje2: 0 },
    ]);
  };

  const handlePuntajeChange = (serieId, idx, value) => {
    setSeries((prev) =>
      prev.map((s) =>
        s.id === serieId
          ? { ...s, [idx === 0 ? "puntaje1" : "puntaje2"]: Number(value) }
          : s
      )
    );
  };

  const handleActualizarResultados = () => {
    setBracketData((prev) => ({
      ...prev,
      rounds: prev.rounds.map((r) => ({
        ...r,
        seeds: r.seeds.map((seed) =>
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

  const ganador =
    jugadores.length === 2
      ? jugadores[0].puntos > jugadores[1].puntos
        ? jugadores[0].nombre
        : jugadores[1].nombre
      : "";

  return (
    <Dashboard>
      <div className="container py-5">
        <div className="card-bg rounded shadow-lg p-4">
          <div className="row g-4">
            {/* Columna izquierda */}
            <div className="col-12 col-lg-6">
              <h2 className="fw-bold text-white mb-4 text-center text-lg-start">
                Resultados del Torneo
              </h2>

              <div className="mb-4">
                <label className="form-label text-white">
                  Selecciona un partido
                </label>
                <select
                  className="form-select"
                  value={partido}
                  onChange={(e) => {
                    setPartido(e.target.value);
                    setSeries(initialSeries);
                  }}
                >
                  <option value="">Elige un partido a disputarse</option>
                  {partidosMock.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleAddSerie}
                disabled={!partido}
                className="mb-4 w-100"
                variant="light"
              >
                Añadir serie
              </Button>

              <div className="mb-4">
                <label className="form-label text-white">
                  Puntos totales por jugador
                </label>
                <div className="d-flex flex-wrap gap-3">
                  {jugadores.map((j, idx) => (
                    <div
                      key={idx}
                      className="bg-dark text-white rounded p-3 text-center flex-fill"
                      style={{ minWidth: "140px" }}
                    >
                      <div className="fw-semibold">{j.nombre}</div>
                      <div className="display-6">{j.puntos}</div>
                    </div>
                  ))}
                </div>
              </div>

              {series.map((serie, idx) => (
                <div key={serie.id} className="mb-3">
                  <label className="form-label text-white">
                    Puntaje serie {idx + 1}
                  </label>
                  <div className="d-flex gap-2">
                    <input
                      type="number"
                      className="form-control bg-dark text-white text-center"
                      value={serie.puntaje1}
                      min={0}
                      onChange={(e) =>
                        handlePuntajeChange(serie.id, 0, e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="form-control bg-dark text-white text-center"
                      value={serie.puntaje2}
                      min={0}
                      onChange={(e) =>
                        handlePuntajeChange(serie.id, 1, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Columna derecha */}
            <div className="col-12 col-lg-6">
              <h4 className="fw-bold text-white mb-3 text-center text-lg-start">
                Visualización del Torneo
              </h4>

              {/* Contenedor del bracket con scroll horizontal */}
              <div className="bg-white rounded p-3 mb-3 overflow-auto">
                <div
                  className="d-inline-block min-width-bracket"
                  ref={bracketContainer}
                ></div>
              </div>

              <div className="text-white text-center mb-3">
                Ganador del enfrentamiento: <br />
                <span className="fw-bold fs-5">{ganador}</span>
              </div>

              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                <Button
                  onClick={handleActualizarResultados}
                  disabled={!partido}
                  className="w-100 w-md-auto"
                  variant="success"
                >
                  Actualizar Resultados
                </Button>
                <Button
                  onClick={() => window.history.back()}
                  className="w-100 w-md-auto"
                  variant="secondary"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default IngresarResultados;
