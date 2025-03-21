import Link from "next/link";

export const torneos = [
  {
    id: 1,
    nombre: "Torneo Nacional",
    ubicacion: "Estadio Nacional",
    fechaInicio: "01/02/2025",
    fechaFinalizacion: "10/02/2025",
    categoria: "Masculino",
    descripcion: "Un torneo de alto nivel con equipos nacionales.",
    imagen: "/img/Torneos/Torneo1.png",
  },
  {
    id: 2,
    nombre: "Torneo Regional",
    ubicacion: "Cancha Central",
    fechaInicio: "15/03/2025",
    fechaFinalizacion: "20/03/2025",
    categoria: "Femenino",
    descripcion: "Competencia regional con equipos locales.",
    imagen: "/img/Torneos/Torneo2.png",
  },
  // ...otros torneos
];

const Torneos = () => {
  return (
    <div className="content">
      <h2 className="content-title">Torneos</h2>

      <div className="torneos-page row">
        <div className="torneos-grid col-lg-8 order-1 order-lg-0">
          {torneos.map((torneo) => (
            <div key={torneo.id} className="torneo-card">
              <img src={torneo.imagen} alt={torneo.nombre} className="torneo-imagen" />
              <h3 className="torneo-nombre">{torneo.nombre}</h3>
              <p className="torneo-ubicacion">{torneo.ubicacion}</p>
              <Link href={`/dashboard/torneo/ver-torneo/${torneo.id}`}>
                <button className="ver-mas-button">Ver más</button>
              </Link>
            </div>
          ))}
        </div>

        <div className="nuevo-torneo-card col-lg-4 order-0 order-lg-1 m-md-0 mb-3">
          <p>¿Quieres crear un nuevo torneo?</p>
          <Link href="/dashboard/torneo/crear-torneo">
            <button className="nuevo-torneo-button">Crear nuevo torneo</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Torneos;
