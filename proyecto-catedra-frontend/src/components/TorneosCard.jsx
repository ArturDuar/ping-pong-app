
export default function TorneoCard({ torneo }) {
    return(
            <div key={torneo.index} className="jugador-card">
                    <h5 className="h3">{torneo.nombre}</h5>
                    <hr />
                    <p className="card-text"><strong>Cantidad de jugadores: </strong>{torneo.cantidadJugadores}</p>
                    <p className="card-text"><strong>Ubicación: </strong>{torneo.ubicacion}</p>
                    <div className="justify-content-between my-2">
                        <div>
                            <small className="fw-bolder">Fecha inicio</small>
                            <p>{torneo.fechaInicio}</p>
                        </div>
                        <div>
                            <small className="fw-bolder">Fecha finalización</small>
                            <p>{torneo.fechaFinalizacion}</p>
                        </div>
                    </div>
                    <a href={`/dashboard/torneo/ver-torneo/${torneo.id}`}>
                        <button className="ver-mas-button">Ver más</button>
                    </a>
            </div>
    )
}