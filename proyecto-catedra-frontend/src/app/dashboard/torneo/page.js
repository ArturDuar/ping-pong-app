"use client";

import Link from "next/link";
import TorneosCard from "@/components/TorneosCard";

// Datos de ejemplo para torneos
export const torneos = [
  {
    id: 1,
    nombre: "Nombre del torneo",
    cantidadJugadores: "x",
    ubicacion: "Ubicación",
    fechaInicio: "dd/mm/aa",
    fechaFinalizacion: "dd/mm/aa",
  },
  {
    id: 2,
    nombre: "Nombre del torneo",
    cantidadJugadores: "x",
    ubicacion: "Ubicación",
    fechaInicio: "dd/mm/aa",
    fechaFinalizacion: "dd/mm/aa",
  },
  {
    id: 3,
    nombre: "Nombre del torneo",
    cantidadJugadores: "x",
    ubicacion: "Ubicación",
    fechaInicio: "dd/mm/aa",
    fechaFinalizacion: "dd/mm/aa",
  },
  {
    id: 4,
    nombre: "Nombre del torneo",
    cantidadJugadores: "x",
    ubicacion: "Ubicación",
    fechaInicio: "dd/mm/aa",
    fechaFinalizacion: "dd/mm/aa",
  },
];


const Torneos = () => {
  return (
    <div className="content">
      <h2 className="content-title">Torneo</h2>

      <div className="jugadores-page row">
        <div className="jugadores-grid col-lg-8 order-1 order-lg-0">
          {torneos.map((torneo, index) => (
            <TorneosCard torneo={torneo} key={index}></TorneosCard>
          ))}
        </div>

        <div className="nuevo-jugador-card col-lg-4 order-0 order-lg-1 m-lg-0 mb-3">
          <p>¿Quieres crear un nuevo torneo?</p>
          <Link href="/dashboard/torneo/crear-torneo">
            <button className="nuevo-jugador-button">Crear nuevo torneo</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Torneos;