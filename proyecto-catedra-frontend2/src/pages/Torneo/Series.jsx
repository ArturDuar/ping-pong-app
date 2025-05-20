import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { partidoService } from "../../services/PartidoService";
import Dashboard from "../../layout/Dashboard";

const Series = () => {
  const { id } = useParams();
  const [series, setSeries] = useState([]);
  const [partido, setPartido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      const data = await partidoService.getById(id);
      setPartido(data);
      setSeries(data.series);
      setLoading(false);
    };
    fetchSeries();
  }, [id]);

  const handleAddSerie = () => {
    const nuevaSerie = {
      id: Date.now(), // temporal
      puntos_jugador1: 0,
      puntos_jugador2: 0,
    };
    setSeries([...series, nuevaSerie]);
  };

  const handleChangePuntos = (index, jugador, value) => {
    const actualizadas = [...series];
    actualizadas[index][jugador] = parseInt(value) || 0;
    setSeries(actualizadas);
  };

  const handleElegirGanador = () => {
    const total1 = series.reduce((acc, s) => acc + s.puntos_jugador1, 0);
    const total2 = series.reduce((acc, s) => acc + s.puntos_jugador2, 0);

    if (total1 > total2) {
      alert(`Ganador: ${partido.jugador1.nombre}`);
    } else if (total2 > total1) {
      alert(`Ganador: ${partido.jugador2.nombre}`);
    } else {
      alert("Empate");
    }
  };

  const handleEliminarSerie = (index) => {
    const nuevasSeries = series.filter((_, i) => i !== index);
    setSeries(nuevasSeries);
  };

  const handleGuardarSeries = async () => {
    try {
      await partidoService.syncSeries(id, series);
      alert("Series guardadas correctamente");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <Dashboard>
      <div className="container my-4">
        <h2 className="mb-4">Series del Partido</h2>
        {loading ? (
          <p>Cargando series...</p>
        ) : (
          <div className="row">
            {/* Columna de jugadores */}
            <div className="col-lg-6 d-flex flex-row justify-content-around align-items-start mb-4">
              <div className="text-center">
                <img
                  className="img-fluid rounded mb-2"
                  style={{ maxHeight: "200px", maxWidth: "150px" }}
                  src={partido.jugador1.fotografia}
                  alt="Jugador 1"
                />
                <h5>{partido.jugador1.nombre}</h5>
              </div>

              <div className="fw-bold fs-3 mx-3">VS</div>

              <div className="text-center">
                <img
                  className="img-fluid rounded mb-2"
                  style={{ maxHeight: "200px", maxWidth: "150px" }}
                  src={partido.jugador2.fotografia}
                  alt="Jugador 2"
                />
                <h5>{partido.jugador2.nombre}</h5>
              </div>
            </div>

            {/* Columna de series */}
            <div className="col-lg-6">
              {series.map((serie, index) => (
                <div key={serie.id} className="card card-bg mb-3 p-3">
                  <div className="row align-items-center">
                    <div className="col-5">
                      <label>Puntos {partido.jugador1.nombre}</label>
                      <input
                        type="number"
                        className="form-control"
                        value={serie.puntos_jugador1}
                        onChange={(e) =>
                          handleChangePuntos(
                            index,
                            "puntos_jugador1",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-5">
                      <label>Puntos {partido.jugador2.nombre}</label>
                      <input
                        type="number"
                        className="form-control"
                        value={serie.puntos_jugador2}
                        onChange={(e) =>
                          handleChangePuntos(
                            index,
                            "puntos_jugador2",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-2 d-flex justify-content-end">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleEliminarSerie(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="d-flex gap-3">
                <button onClick={handleAddSerie} className="btn btn-primary">
                  Agregar Serie
                </button>
                <button
                  onClick={handleElegirGanador}
                  className="btn btn-success"
                >
                  Elegir Ganador
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Series;
