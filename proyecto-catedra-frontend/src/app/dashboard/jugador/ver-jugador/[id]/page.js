"use client";

import { useParams } from "next/navigation";
import { jugadores } from "@/app/dashboard/jugador/page";
import JugadorCard from "@/components/Jugador";

export default function VerJugador() {
  const params = useParams();
  const jugador = jugadores.find((j) => j.id === Number(params.id)); // Busca el jugador por ID

  if (!jugador) {
    return (
      <div className="content">
        <h2 className="content-title">Jugador no encontrado</h2>
        <p>No se encontró ningún jugador con el ID: {params.id}</p>
      </div>
    );
  }

  return (
    <JugadorCard
      nombre={jugador.nombre}
      imagen={jugador.imagen}
      nacionalidad={jugador.nacionalidad || "No definida"}
      fechaNacimiento={jugador.fechaNacimiento || "No definida"}
      genero={jugador.genero || "No definido"}
      onEditar={() => console.log("Editar jugador", jugador.id)}
      onEliminar={() => console.log("Eliminar jugador", jugador.id)}
    />
  );
}
