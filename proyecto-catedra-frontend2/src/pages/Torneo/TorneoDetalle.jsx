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
              <Link to={`/torneos/editar-torneo/${torneo.id}`}>
                <button className="btn btn-primary w-100">Editar Torneo</button>
              </Link>
              
              <button className="btn btn-danger w-100" onClick={handleDelete}>
                Eliminar Torneo
              </button>
            </div>

            {/* Detalles del torneo */}
            <div className="col-md-9 col-12">
              <div className="card p-3">
                <h4>{torneo.nombre_torneo}</h4>
                <table className="table">
                  <tbody>
                    
                    <tr>
                      <td><strong>Ubicación:</strong></td>
                      <td>{torneo.lugar_evento}</td>
                    </tr>
                    <tr>
                      <td><strong>Fecha de inicio:</strong></td>
                      <td>{torneo.fecha_inicio}</td>
                    </tr>
                    <tr>
                      <td><strong>Fecha de fin:</strong></td>
                      <td>{torneo.fecha_fin}</td>
                    </tr>
                    <tr>
                      <td><strong>Categoria:</strong></td>
                      <td>{torneo.categoria_genero}</td>
                    </tr>
                    <tr>
                        <td><strong>Estado:</strong></td>
                        <td>{torneo.estado}</td>
                    </tr>
                    <tr>
                      <td><strong>Descripción:</strong></td>
                      <td>{torneo.descripcion}</td>
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

export default TorneoDetalle;
