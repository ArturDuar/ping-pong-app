import { useParams, useNavigate, Link } from "react-router-dom";
import Dashboard from "../../layout/Dashboard";
import { useEffect, useState } from "react";
import { useTorneoContext } from "../../contexts/TorneoContext";

const TorneoDetalle = () => {
  const navigate = useNavigate();
  const [torneo, setTorneo] = useState(null);
  const { getById, deleteTorneo } = useTorneoContext();
  const { id } = useParams();

  useEffect(() => {
    const getTorneoActual = async () => {
      const data = await getById(id);
      setTorneo(data);
    };

    if (id) {
      getTorneoActual();
    }
  }, [id, getById]);

  if (!torneo) {
    return <p className="text-center mt-5">Torneo no disponible</p>;
  }

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este torneo?")) {
      await deleteTorneo(id);
      navigate("/torneos");
    }
  };

  const handleIngresarResultados = () => {
    if (confirm("¿Deseas comenzar este torneo?")) {
      if (torneo.jugadores.length < torneo.num_participantes) {
        alert(
          "No se puede dar por comenzado el torneo, no hay suficientes jugadores para el torneo."
        );
        return;
      }
      navigate(`/torneos/${torneo.id}/ingresar-resultados`);
    }
  };

  return (
    <Dashboard>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center my-4 gap-2 flex-row">
          <h2 className="mb-0">Detalles del Torneo</h2>
          <Link to="/torneos/crear-torneo" className="btn btn-primary">
            Crear nuevo torneo
          </Link>
        </div>

        <div className="card border-0 card-bg rounded shadow">
          <div className="row gx-4 gy-4">
            {/* Controles de acción */}
            <div className="col-md-3 col-12 d-flex flex-column gap-3">
              <Link to={`/torneos/${torneo.id}/agregar-participantes`}>
                <button className="w-100 btn btn-primary rounded ">
                  Agregar participantes
                </button>
              </Link>

              <Link to={`/torneos/${torneo.id}/partidos`}>
                <button className="w-100 btn btn-success rounded ">
                  Ver Partidos
                </button>
              </Link>

              <Link to={`/torneos/editar-torneo/${torneo.id}`}>
                <button className="w-100 btn btn-secondary rounded ">
                  Editar Torneo
                </button>
              </Link>

              <button
                className="w-100 btn btn-danger rounded "
                onClick={handleDelete}
              >
                Eliminar torneo
              </button>
            </div>

            {/* Detalles del torneo */}
            <div className="col-md-9 col-12">
              <div className="card p-3">
                <h4>{torneo.nombre_torneo}</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Ubicación:</strong>
                      </td>
                      <td>{torneo.lugar_evento}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Fecha de inicio:</strong>
                      </td>
                      <td>{torneo.fecha_inicio}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Fecha de fin:</strong>
                      </td>
                      <td>{torneo.fecha_fin}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Categoria:</strong>
                      </td>
                      <td>{torneo.categoria_genero}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Estado:</strong>
                      </td>
                      <td>{torneo.estado}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Número de participantes:</strong>
                      </td>
                      <td>{torneo.num_participantes}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Descripción:</strong>
                      </td>
                      <td>{torneo.descripcion}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table w-100">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Jugadores</strong>
                      </td>
                    </tr>
                    {torneo.jugadores.length === 0 ? (
                      <tr>
                        <td className="text-center">
                          <div className="text-white">
                            No hay jugadores añadidos.
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>
                          {/* Contenedor con scroll horizontal */}
                          <div
                            className="d-flex overflow-auto"
                            style={{
                              whiteSpace: "nowrap",
                              width: "100%",
                            }}
                          >
                            {torneo.jugadores.map((jugador) => (
                              <div
                                key={jugador.id}
                                className="position-relative bg-dark shadow cursor-pointer me-2 text-center text-white"
                                style={{
                                  width: "100px",
                                  minWidth: "100px",
                                  flex: "0 0 auto",
                                }}
                                onClick={() =>
                                  navigate(`/jugadores/${jugador.id}`)
                                }
                              >
                                <img
                                  src={
                                    jugador.enlace_fotografia ||
                                    "/img/avatar_femenino.png"
                                  }
                                  alt="Jugador"
                                  className="rounded w-100"
                                  style={{
                                    height: "100px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="mt-2 text-wrap">
                                  {jugador.nombre_jugador}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default TorneoDetalle;
