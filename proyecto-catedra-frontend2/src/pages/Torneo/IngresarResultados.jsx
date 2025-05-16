// src/pages/Torneo/IngresarPuntosForm.jsx
import React, { useState, useEffect, useRef } from "react";
import Dashboard from "../../layout/Dashboard";
import { createBracket } from "bracketry";
import { Button } from "react-bootstrap";
import {
  partidosMock,
  jugadoresMock,
  seriesMock,
  bracketData,
} from "./bracketData";

const IngresarPuntosForm = () => {
  const [partido, setPartido] = useState("");
  const [series]  = useState(seriesMock);

  // Ref para el contenedor del bracket
  const bracketContainer = useRef(null);

  // (Re)dibuja el bracket cada vez que cambian los datos
  useEffect(() => {
    if (bracketContainer.current) {
      bracketContainer.current.innerHTML = "";
      createBracket(bracketData, bracketContainer.current);
    }
  }, [bracketData]);

  return (
    <Dashboard>
      <div className="container py-4">
        <div className="row">
          {/* Columna izquierda */}
          <div className="col-md-7">
            <h2
              className="fw-bold mb-4"
              style={{ color: "#fff", fontSize: "2.2rem" }}
            >
              Nombre del torneo
            </h2>

            <div className="mb-3 d-flex gap-3 align-items-end">
              <div className="flex-grow-1">
                <label className="form-label text-white mb-1">
                  Elige el partido
                </label>
                <select
                  className="form-select"
                  style={{
                    background: "#222",
                    color: "#aaa",
                    border: "none",
                    minWidth: 220,
                  }}
                  value={partido}
                  onChange={(e) => setPartido(e.target.value)}
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
                style={{
                  background: "#B84F8C",
                  border: "none",
                  minWidth: 140,
                  height: 44,
                }}
              >
                Añadir serie
              </Button>
            </div>

            <div className="mb-3">
              <label className="form-label text-white mb-1">
                Puntos totales por jugador
              </label>
              <div className="d-flex gap-2">
                {jugadoresMock.map((j, idx) => (
                  <div
                    key={idx}
                    className="flex-fill bg-dark text-white rounded p-2 text-center"
                    style={{ minWidth: 120 }}
                  >
                    <div className="fw-bold">{j.nombre}</div>
                    <div style={{ fontSize: "1.5rem" }}>{j.puntos}</div>
                  </div>
                ))}
              </div>
            </div>

            {series.map((serie, idx) => (
              <div key={serie.id} className="mb-3">
                <div className="fw-bold text-white mb-2">
                  Puntaje serie {idx + 1}
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    className="form-control bg-dark text-white"
                    value={serie.puntaje1}
                    readOnly
                    style={{ minWidth: 120 }}
                  />
                  <input
                    type="number"
                    className="form-control bg-dark text-white"
                    value={serie.puntaje2}
                    readOnly
                    style={{ minWidth: 120 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Columna derecha */}
          <div className="col-md-5">
            <h4 className="fw-bold text-white mb-3">Resultados</h4>
            <div
              ref={bracketContainer}
              className="bg-white rounded p-3 mb-3"
              style={{ minHeight: 240 }}
            />
            <div className="text-white text-center mb-3">
              Ganador del enfrentamiento <br />
              <span
                className="fw-bold"
                style={{ fontSize: "1.2rem" }}
              >
                Jugador 2
              </span>
            </div>
            <div className="d-flex gap-3 justify-content-center">
              <Button
                style={{
                  background: "#B84F8C",
                  border: "none",
                  minWidth: 180,
                  fontWeight: "bold",
                }}
              >
                Actualizar Resultados
              </Button>
              <Button
                style={{
                  background: "#555",
                  border: "none",
                  minWidth: 120,
                  fontWeight: "bold",
                }}
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

export default IngresarPuntosForm;
