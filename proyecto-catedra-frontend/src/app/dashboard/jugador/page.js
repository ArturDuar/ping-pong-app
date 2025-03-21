import JugadorCard from "@/components/JugadoresCard";
import Link from "next/link";



export const jugadores = [
    {
      id: 1,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/MujerJugador.png",
    },
    {
      id: 2,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/HombreJugador.png", 
    },
    {
      id: 3,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/MujerJugador.png",
    },
    {
      id: 4,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/HombreJugador.png", 
    },
    {
      id: 5,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/MujerJugador.png",
    },
    {
      id: 6,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/HombreJugador.png",
    },
    {
      id: 7,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/MujerJugador.png", 
    },
    {
      id: 8,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/HombreJugador.png", 
    },
    {
      id: 9,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/MujerJugador.png", 
    },
    {
      id: 10,
      nombre: "Nombre Completo",
      datos: ["Dato 1", "Dato 2"],
      imagen: "/img/Jugadores/HombreJugador.png", 
    },
  ];
  
  const Jugadores = () => {
    return (
        <div className="content">
            <h2 className="content-title">Jugadores</h2>
        
            <div className="jugadores-page row">
                <div className="jugadores-grid col-lg-8 order-1 order-lg-0">
                    {jugadores.map((jugador) => (
                        <JugadorCard jugador={jugador} key={jugador.id}></JugadorCard>
                    ))}
                </div>
        
                <div className="nuevo-jugador-card col-lg-4 order-0 order-lg-1 m-md-0 mb-3">
                    <p>¿Quieres ingresar un nuevo jugador?</p>
                    <Link href="/ingresarjugador">
                    <button className="nuevo-jugador-button">Crear nuevo jugador</button>
                    </Link>
                </div>
            </div>
        </div>
    );
  };
  
  
  export default Jugadores;