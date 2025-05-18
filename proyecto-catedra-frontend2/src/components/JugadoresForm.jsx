import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useJugadorContext } from "../contexts/JugadorContext";

const JugadoresForm = ({ tipo, jugadorInicial = null, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_jugador: "",
    nacionalidad: "",
    fecha_nacimiento: "",
    genero: "",
    fotografia: null,
  });

  useEffect(() => {
    if (jugadorInicial) {
      setFormData({
        ...jugadorInicial,
        fotografia: null, // no prellenes el input file
      });
    }
  }, [jugadorInicial]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await onSubmit(formData);
    navigate(`/jugadores/${data.id}`);
  };

  return (
    <div className="container">
      <div className="my-5 border-0 shadow rounded py-5 card-bg">
        <h2 className="title text-center mb-4">
          {tipo === "crear" ? "Crear nuevo jugador" : "Editar jugador"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="row row-cols-lg-2 row-gap-3 text-start px-3">
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="nombre_jugador">Nombre del jugador</label>
              <input
                type="text"
                id="nombre_jugador"
                name="nombre_jugador"
                value={formData.nombre_jugador}
                onChange={handleChange}
                placeholder="Ej. Arturo Duarte"
                className="form-control border-0 text-white"
              />
            </div>
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="nacionalidad">Nacionalidad</label>
              <input
                type="text"
                id="nacionalidad"
                name="nacionalidad"
                value={formData.nacionalidad}
                onChange={handleChange}
                placeholder="Ej. Salvadoreña"
                className="form-control border-0 text-white"
              />
            </div>
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
              <input
                type="date"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                className="form-control border-0 text-white"
              />
            </div>
            <div className="form-group file-upload d-flex flex-column gap-2">
              <label htmlFor="fotografia">Fotografía del jugador</label>
              <input
                type="file"
                accept="image/*"
                id="fotografia"
                name="fotografia"
                onChange={handleChange}
                className="form-control rounded-1 file-update-custom border-0  text-white"
              />
            </div>
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="genero">Género</label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="form-control border-0 text-white form-select"
              >
                <option value="">Seleccione un género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
          <div className="button-group d-flex justify-content-center gap-3 mt-4 flex-column flex-md-row px-3">
            <button type="submit" className="btn btn-primary border-0">
              {tipo === "crear" ? "Crear jugador" : "Editar jugador"}
            </button>
            <button type="reset" className="btn btn-secondary ">
              Limpiar
            </button>

            <Link
              to="/jugadores"
              className="btn btn-secondary text-decoration-none align-items-center justify-content-center"
            >
              <p className="mb-0">Cancelar</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JugadoresForm;
