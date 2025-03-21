"use client";

import { useParams } from "next/navigation";
import { torneos } from "@/app/dashboard/torneo/page";
import TorneoCard from "@/components/Torneo";

export default function VerTorneo() {
  const params = useParams();
  const torneo = torneos.find((t) => t.id === Number(params.id)); // Busca el torneo por ID

  if (!torneo) {
    return (
      <div className="content">
        <h2 className="content-title">Torneo no encontrado</h2>
        <p>No se encontró ningún torneo con el ID: {params.id}</p>
      </div>
    );
  }

  return (
    <TorneoCard
      nombre={torneo.nombre}
      imagen={torneo.imagen}
      ubicacion={torneo.ubicacion}
      fechaInicio={torneo.fechaInicio}
      fechaFinalizacion={torneo.fechaFinalizacion}
      categoria={torneo.categoria}
      descripcion={torneo.descripcion}
      onEditar={() => console.log("Editar torneo", torneo.id)}
      onEliminar={() => console.log("Eliminar torneo", torneo.id)}
    />
  );
}
