"use client";

import { useParams } from "next/navigation";
import { jugadores } from "@/app/dashboard/jugador/page";
import JugadorCard from "@/components/Jugador"; // ✅ Usa el componente JugadorCard para mostrar detalles

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
      cantidadJugadores={jugador.datos[0]}
      ubicacion={jugador.datos[1]}
      fechaInicio="01/01/2025" // Datos estáticos de ejemplo
      fechaFinalizacion="10/01/2025"
      categoria="Masculino"
      descripcion="a."
      onEditar={() => console.log("Editar jugador", jugador.id)}
      onEliminar={() => console.log("Eliminar jugador", jugador.id)}
    />
  );
}
