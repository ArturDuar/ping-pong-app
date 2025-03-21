import Link from "next/link"; // ✅ Importa Link de Next.js

export default function JugadorCard({ jugador }) {
  if (!jugador || !jugador.imagen) {
    return <div>Imagen no disponible</div>;
  }

  return (
    <div key={jugador.id} className="jugador-card">
      <img src={jugador.imagen} alt={jugador.nombre} className="jugador-imagen" />
      <h3 className="jugador-nombre">{jugador.nombre}</h3>
      <p className="jugador-datos">Datos de jugador:</p>
      <ul>
        {jugador.datos.map((dato, index) => (
          <li key={index}>- {dato}</li>
        ))}
      </ul>
      <Link href={`/dashboard/jugador/ver-jugador/${jugador.id}`}>
        <button className="ver-mas-button">Ver más</button>
      </Link>
    </div>
  );
}
