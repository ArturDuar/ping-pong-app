import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const TorneosForm = ({ tipo, torneoInicial = null, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_torneo: "",
    descripcion: "",
    lugar_evento: "",
    fecha_inicio: "",
    fecha_fin: "",
    categoria_genero: "",
    num_participantes: 0,
  });

  useEffect(() => {
    if (torneoInicial) {
      setFormData(torneoInicial);
    }
  }, [torneoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await onSubmit(formData);
    navigate(`/torneos/${data.id}`);
  };

  return (
    <div className="container">
      <div className="my-5 border-0 shadow rounded py-5 card-bg">
        <h2 className="title text-center mb-4">
          {tipo === "crear" ? "Crear nuevo torneo" : "Editar torneo"}
        </h2>
        {torneoInicial && torneoInicial.estado !== "Próximo" && <p className="text-danger mb-3">Ya no puedes editar este torneo.</p>}
        <form onSubmit={handleSubmit}>
          <div className="row row-cols-lg-2 row-gap-3 text-start px-3">
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="nombre_torneo">Nombre del torneo</label>
              <input
                type="text"
                id="nombre_torneo"
                name="nombre_torneo"
                value={formData.nombre_torneo}
                onChange={handleChange}
                placeholder="Ej. Copa Nacional"
                className="form-control border-0 text-white"
                disabled={torneoInicial && torneoInicial.estado !== "Próximo"}
              />
            </div>
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="lugar_evento">Lugar del evento</label>
              <input
                type="text"
                id="lugar_evento"
                name="lugar_evento"
                value={formData.lugar_evento}
                onChange={handleChange}
                placeholder="Ej. Estadio Nacional"
                className="form-control border-0 text-white"
                disabled={torneoInicial && torneoInicial.estado !== "Próximo"}
              />
            </div>
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="fecha_inicio">Fecha de inicio</label>
              <input
                type="date"
                id="fecha_inicio"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                className="form-control border-0 text-white"
                disabled={torneoInicial && torneoInicial.estado !== "Próximo"}
              />
            </div>
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="fecha_fin">Fecha de fin</label>
              <input
                type="date"
                id="fecha_fin"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
                className="form-control border-0 text-white"
                disabled={torneoInicial && torneoInicial.estado !== "Próximo"}
                required
              />
            </div>
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="categoria_genero">Categoría/Género</label>
              <select
                id="categoria_genero"
                name="categoria_genero"
                value={formData.categoria_genero}
                onChange={handleChange}
                className="form-control border-0 text-white form-select"
                disabled={torneoInicial && torneoInicial.estado !== "Próximo"}
                required
              >
                <option value="">Seleccione una categoría</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Mixto">Mixto</option>
              </select>
            </div>
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="num_participantes">Número de participantes</label>
              <select
                id="num_participantes"
                name="num_participantes"
                value={formData.num_participantes}
                onChange={handleChange}
                className="form-select border-0 text-white"
                disabled={torneoInicial && torneoInicial.estado !== "Próximo"}
                required
              >
                <option value="">Selecciona una cantidad de participantes</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
              </select>
            </div>
          </div>
          <div className="form-group d-flex flex-column gap-2 px-3 text-start mt-3">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Detalles del torneo..."
                className="form-control border-0 text-white"
                disabled={torneoInicial && torneoInicial.estado !== "Próximo"}
              ></textarea>
            </div>
          <div className="button-group d-flex justify-content-center gap-3 mt-4 flex-column flex-md-row px-3">
            <button type="submit" className="btn btn-primary border-0" disabled={torneoInicial && torneoInicial.estado !== "Próximo"}>
              {tipo === "crear" ? "Crear torneo" : "Editar torneo"}
            </button>
            <button type="reset" className="btn btn-secondary" disabled={torneoInicial && torneoInicial.estado !== "Próximo"}>
              Limpiar
            </button>
            <Link
              to="/torneos"
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

export default TorneosForm;
