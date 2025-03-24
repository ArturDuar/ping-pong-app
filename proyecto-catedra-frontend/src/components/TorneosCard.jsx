import Link from "next/link";

export default function TorneoCard({ torneo }) {
    return(
            <div key={torneo.index} className="jugador-card">
                    <h5 className="h3">{torneo.nombre_torneo}</h5>
                    <hr />
                    <p className="card-text"><strong>Cantidad de jugadores: </strong>{torneo.cantidadJugadores}</p>
                    <p className="card-text"><strong>Ubicación: </strong>{torneo.lugar_evento}</p>
                    <p className="card-text"><strong>Categoría </strong>{torneo.categoria_genero}</p>
                    <div className="justify-content-between my-2">
                        <div>
                            <small className="fw-bolder">Fecha inicio</small>
                            <p>{torneo.fecha_inicio}</p>
                        </div>
                        <div>
                            <small className="fw-bolder">Fecha finalización</small>
                            <p>{torneo.fecha_fin}</p>
                        </div>
                    </div>
                    <Link href={`/dashboard/torneo/ver-torneo/${torneo.id}`}>
                        <button className="ver-mas-button">Ver más</button>
                    </Link>
            </div>
    )
}