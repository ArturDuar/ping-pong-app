import Link from "next/link";

export default function JugadorCard({ jugador }) {
  if (!jugador) {
    return <div>Imagen no disponible</div>;
  }

  return (
    <div key={jugador.id} className="jugador-card">
      {!jugador.enlace_fotografia ? <div>Imagen no disponible</div> : <img src={jugador.imagen} alt={jugador.nombre_jugador} className="jugador-imagen" />}
      <h3 className="jugador-nombre">{jugador.nombre_jugador}</h3>
      <p className="jugador-datos"><strong>Nacionalidad:</strong> {jugador.nacionalidad}</p>
      <p className="jugador-datos"><strong>Fecha de nacimiento:</strong> {jugador.fecha_nacimiento}</p>
      <p className="jugador-datos"><strong>Género:</strong> {jugador.genero}</p>
      <Link href={`/dashboard/jugador/ver-jugador/${jugador.id}`}>
        <button className="ver-mas-button">Ver más</button>
      </Link>
    </div>
  );
}
