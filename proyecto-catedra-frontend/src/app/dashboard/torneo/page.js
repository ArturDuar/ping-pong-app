"use client";

import Link from "next/link";
import TorneosCard from "@/components/TorneosCard";
import { getTorneos } from "@/service/TorneoService";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";


const Torneos = () => {
  const [torneos, setTorneos] = useState(null); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTorneos = async () => {
      try{
        const response = await getTorneos();

        console.log('Torneos obtenidos:', response);
        setTorneos(response);
      } catch (error) {
        console.log('Error al obtener los torneos:', error);
      } 
    };

    fetchTorneos();
  }, []);

  return (
    <div className="content">
      <h2 className="content-title">Torneo</h2>

      <div className="jugadores-page row">
        {torneos ? 
        ( <div className="jugadores-grid col-lg-8 order-1 order-lg-0">
                    {torneos.map((torneo) => (
                        <TorneosCard key={torneo.id} torneo={torneo}/>
                    ))}
          </div>
            ) : (
                <LoadingScreen/>
            )}

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