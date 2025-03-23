"use client";

import { useParams } from "next/navigation";
import { jugadores } from "@/app/dashboard/jugador/page";
import JugadorCard from "@/components/Jugador";
import { useState, useEffect } from "react";
import { getJugadorbyId } from "@/service/JugadorService";
import LoadingScreen from "@/components/LoadingScreen";

export default function VerJugador() {
  const params = useParams();
  const [jugador, setJugador] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJugador = async () => {
      try{
        const response = await getJugadorbyId(params.id);
        console.log('Datos del jugador:', response.data);

        console.log('Jugador obtenido:', response);
        setJugador(response.data);
      } catch (error) {
        setError(error.message);
        console.log('Error al obtener el jugador:', error);
      } 
    };

    fetchJugador();
  }, []);
  
  if (error) {
    return (
      <div className="content">
        <h2 className="content-title">Jugador no encontrado</h2>
        <p>No se encontró ningún jugador con el ID: {params.id}</p>
      </div>
    );
  }

  return (
    <>
        {jugador ? (
            <JugadorCard 
                nombre={jugador.nombre_jugador}
                imagen={jugador.imagen}
                nacionalidad={jugador.nacionalidad}
                fecha_nacimiento={jugador.fecha_nacimiento}
                genero={jugador.genero || "No definido"}
                id={jugador.id}
            />
        ) : (
            <LoadingScreen/>
        )}
    </>
  );
}
