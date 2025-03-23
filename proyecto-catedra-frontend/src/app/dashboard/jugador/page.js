"use client";
import JugadorCard from "@/components/JugadoresCard";
import LoadingScreen from "@/components/LoadingScreen";
import { getJugadores } from "@/service/JugadorService";
import Link from "next/link";
import { useEffect, useState } from "react";

const Jugadores = () => {
  const [jugadores, setJugadores] = useState(null); 

  useEffect(() => {
    const fetchJugadores = async () => {
      try{
        const response = await getJugadores();
        console.log('Jugadores obtenidos:', response);
        setJugadores(response);
      } catch (error) {
        console.log('Error al obtener los jugadores:', error);
        setJugadores([]);
      } 
    };

    fetchJugadores();
  }, []);


  return (
    <div className="content">
      <h2 className="content-title">Jugadores</h2>

      <div className="jugadores-page row justify-content-center">
        
          {jugadores === null ? (
            <LoadingScreen />
          ) : jugadores.length === 0 ? (
            // No hay jugadores
            <p className="text-center text-light">No hay jugadores registrados</p>
          ) : (
            // Mostrar jugadores
            <div className="jugadores-grid col-lg-8 order-1 order-lg-0">
              {jugadores.map((jugador) => (
                <JugadorCard jugador={jugador} key={jugador.id}></JugadorCard>
              ))}
            </div>
          )}

      
      <div className="nuevo-jugador-card m-lg-0 mb-3 order-0 order-lg-1 col-lg-4" >
            <p>¿Quieres ingresar un nuevo jugador? </p>
            <Link href="/dashboard/jugador/crear-jugador">
              <button className="nuevo-jugador-button">Crear nuevo jugador</button>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Jugadores;