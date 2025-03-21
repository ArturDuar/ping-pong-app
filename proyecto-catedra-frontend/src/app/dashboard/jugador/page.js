import JugadorCard from "@/components/JugadoresCard";
import Link from "next/link";

export const jugadores = [
  {
    id: 1,
    nombre: "Juan Pérez",
    nacionalidad: "Salvadoreña",
    fechaNacimiento: "15/03/1990",
    genero: "Masculino",
    imagen: "/img/Jugadores/MujerJugador.png",
  },
  {
    id: 2,
    nombre: "Ana López",
    nacionalidad: "Mexicana",
    fechaNacimiento: "22/07/1995",
    genero: "Femenino",
    imagen: "/img/Jugadores/HombreJugador.png",
  },
  {
    id: 3,
    nombre: "Carlos Martínez",
    nacionalidad: "Guatemalteca",
    fechaNacimiento: "10/12/1988",
    genero: "Masculino",
    imagen: "/img/Jugadores/MujerJugador.png",
  },
  {
    id: 4,
    nombre: "María González",
    nacionalidad: "Hondureña",
    fechaNacimiento: "05/06/1992",
    genero: "Femenino",
    imagen: "/img/Jugadores/HombreJugador.png",
  },
  // ...otros jugadores
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
          <Link href="/dashboard/jugador/crear-jugador">
            <button className="nuevo-jugador-button">Crear nuevo jugador</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Jugadores;