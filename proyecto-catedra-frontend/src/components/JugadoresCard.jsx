
export default function JugadorCard({ jugador }) {
  if (!jugador || !jugador.imagen) {
    return <div>Imagen no disponible</div>;
  }

  return (
    <div key={jugador.id} className="jugador-card">
      <img src={jugador.imagen} alt={jugador.nombre} className="jugador-imagen" />
      <h3 className="jugador-nombre">{jugador.nombre}</h3>
      <p className="jugador-datos"><strong>Nacionalidad:</strong> {jugador.nacionalidad}</p>
      <p className="jugador-datos"><strong>Fecha de nacimiento:</strong> {jugador.fechaNacimiento}</p>
      <p className="jugador-datos"><strong>Género:</strong> {jugador.genero}</p>
      <a href={`/dashboard/jugador/ver-jugador/${jugador.id}`}>
        <button className="ver-mas-button">Ver más</button>
      </a>
    </div>
  );
}
