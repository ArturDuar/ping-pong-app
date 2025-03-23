"use client";

import { useParams } from "next/navigation";
import TorneoCard from "@/components/Torneo";
import { useEffect, useState } from "react";
import { getTorneobyId } from "@/service/TorneoService";
import LoadingScreen from "@/components/LoadingScreen";

export default function VerTorneo() {
  const params = useParams();
  const [torneo, setTorneo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTorneo = async () => {
      try{
        const response = await getTorneobyId(params.id);
        console.log('Datos del torneo:', response.data);

        console.log('Torneo obtenido:', response);
        setTorneo(response.data);
      } catch (error) {
        setError(error.message);
        console.log('Error al obtener el torneo:', error);
      } 
    };

    fetchTorneo();
  }, []);

  
  if (error) {
    return (
      <div className="content">
        <h2 className="content-title">Torneo no encontrado</h2>
        <p>{error}</p>
        <p>No se encontró ningún torneo con el ID: {params.id}</p>
      </div>
    );
  }

  return (
    <>
        {torneo ? (
            <TorneoCard 
                nombre={torneo.nombre_torneo}
                imagen={torneo.imagen}
                ubicacion={torneo.lugar_evento}
                fechaInicio={torneo.fecha_inicio}
                fechaFinalizacion={torneo.fecha_fin}
                categoria={torneo.categoria_genero}
                descripcion={torneo.descripcion}
                id={torneo.id}
            />
        ) : (
            <LoadingScreen/>
        )}
    </>
  )
}
