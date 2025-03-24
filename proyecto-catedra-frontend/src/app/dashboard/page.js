"use client"; 

import {OpcionCard as Card} from '@/components/OpcionCard';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaUsers , FaTableTennis, FaChartBar} from 'react-icons/fa';
 

export default function PaginaPrincipal(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        setUser(user);
    }, []);

    return(
        <div className="home container row m-auto">
          <div className="row justify-content-center align-items-center m-auto g-5">
            <div className="col-lg-6">
              <div > 
                <div>
                  <Image 
                  src="/img/logos/logo_blanco.png" 
                  alt="Logo Ping Pong" 
                  width={300} 
                  height={80} 
                  layout="responsive"
                  />
                </div>
              </div>
              <div>
                <h1 className="content-title fw-bolder">Bienvenido, {user}</h1>
                <p className="text-white">¿Que deseas hacer hoy?</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-2 g-lg-3 ">
                <div className="col-6 col-md-4 col-lg-6">
                  <Card icon={<FaTableTennis size="75%" color="#129FFF"/>} title="Gestionar torneos" link="/dashboard/torneo"/>
                </div> 
                <div className="col-6 col-md-4 col-lg-6">
                  <Card icon={<FaUsers size="75%" color="#AA12AF"/>} title="Gestionar jugadores" link="dashboard/jugador"/>
                </div>
                <div className="col-6 col-md-4 col-lg-6 mx-auto">
                  <Card icon={<FaChartBar size="75%" color="#129FAF"/>} title="Ver estadísticas" link=""/>
                </div>
              </div>
            </div>
          </div>    
        </div>
    );
}
