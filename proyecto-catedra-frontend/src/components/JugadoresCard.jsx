import Link from "next/link";


export default function JugadorCard({jugador}){
    return(
        <div key={jugador.id} className="jugador-card ">
            <img src={jugador.imagen} alt={jugador.nombre} className="jugador-imagen" />
            <h3 className="jugador-nombre">{jugador.nombre}</h3>
            <p className="jugador-datos">Datos de jugador:</p>
            <ul>
                {jugador.datos.map((dato, index) => {
                    <li key={index}>- {dato}</li>
                })}
            </ul>
            <Link href="/dashboard/jugador/ver-jugador">
                <button className="ver-mas-button">Ver más</button>
            </Link>
        </div>
    );
}