import { useParams, useNavigate, Links } from "react-router-dom";
import Dashboard from "../../layout/Dashboard";
import { useEffect, useState } from "react";
import { useJugadorContext } from "../../contexts/JugadorContext";
import { Link } from "react-router-dom";

const JugadorDetalle = () => {
  const navigate = useNavigate();
  const [jugador, setJugador] = useState(null);
  const { getById, deleteJugador } = useJugadorContext();
  const { id } = useParams();

  useEffect(() => {
    const getJugadorActual = async () => {
      const data = await getById(id);
      setJugador(data);
    };

    if (id) {
      getJugadorActual();
    }
  }, [id, getById]);

  if (!jugador) {
    return <p className="text-center mt-5">Jugador no disponible</p>;
  }

  const handleDelete = async () => {
    console.log("id:", id);
    if (window.confirm("¿Estás seguro de que deseas eliminar este jugador?")) {
      await deleteJugador(id);
      navigate("/jugadores");
    }
  };

  return (
    <Dashboard>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center my-4 gap-2 flex-row">
          <h2 className="mb-0">Detalles del jugador</h2>
          <Link to="/jugadores/crear-jugador" className="btn btn-primary">
            Crear nuevo jugador
          </Link>
        </div>

        <div className="card border-0 card-bg rounded shadow">
          <div className="row gx-4 gy-4 ">
            {/* Imagen del jugador */}
            <div className="col-md-3 col-12 d-flex flex-column gap-3">
              <div className="col-6 col-md-12 m-auto">
                <img
                  className="img-fluid rounded"
                  src={jugador.enlace_fotografia}
                  alt={"Imagen del jugador"}
                />
              </div>

              <Link to={`/jugadores/editar-jugador/${jugador.id}`}>
                <button className="btn btn-primary w-100">Editar Jugador</button>
              </Link>
              
              <button className="btn btn-danger w-100" onClick={handleDelete}>
                Eliminar Jugador
              </button>
            </div>

            {/* Detalles del jugador */}
            <div className="col-md-9 col-12">
              <div className="card p-3">
                <h4>{jugador.nombre_jugador}</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Género:</strong>
                      </td>
                      <td>{jugador.genero}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Nacionalidad:</strong>
                      </td>
                      <td>{jugador.nacionalidad}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Fecha de nacimiento:</strong>
                      </td>
                      <td>{jugador.fecha_nacimiento}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Edad:</strong>
                      </td>
                      <td>{jugador.edad}</td>
                    </tr>
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

export default JugadorDetalle;
