import Dashboard from "../layout/Dashboard";
import { FaTableTennis, FaUsers, FaChartBar } from "react-icons/fa";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PaginaPrincipal = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    // console.log("user:", user); // Puedes quitar este log si no lo necesitas
  }, []); // Solo al montar

  return (
    <Dashboard>
      <div className="container m-auto">
        <div className="row justify-content-center align-items-center m-auto g-5">
          <div className="col-lg-6 d-flex flex-column gap-4 mb-4">
            <Image
              src="/img/logos/logo_blanco.png"
              alt="Logo Ping Pong"
              width="75%"
              className="m-auto"
            />
            <h2 className="content-title fw-bolder">
              Bienvenido, {user}
            </h2>
            <p className="text-white">¿Que deseas hacer hoy?</p>
          </div>
          <div className="container col-lg-6">
            <div className="row g-4">
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="card-bg text-center  rounded shadow d-flex flex-column justify-content-between h-100">                                                             
                  <FaTableTennis size="100" className="m-auto my-4"/>
                  <Link to={"/torneos"} className="card-button text-decoration-none btn btn-primary rounded-top-0 mt-2 p-3">
                    Gestionar torneos
                  </Link>
                </div>                      
              </div>

              <div className="col-12 col-sm-6 col-lg-4">
                <div className="card-bg text-center  rounded shadow d-flex flex-column justify-content-between h-100">                                                             
                  <FaUsers size="100" className="m-auto my-4"/>
                  <Link to={"/jugadores"} className="card-button text-decoration-none btn btn-primary rounded-top-0 mt-2 p-3">
                    Gestionar Jugadores
                  </Link>
                </div>                      
              </div>

              <div className="col-12 col-sm-6 col-lg-4">
                <div className="card-bg text-center rounded shadow d-flex flex-column justify-content-between h-100">                                                             
                  <FaChartBar size="100" className="m-auto my-4"/>
                  <Link to="/estadisticas" className="card-button text-decoration-none btn btn-primary rounded-top-0 mt-2 p-3">
                    Ver Estadísticas
                  </Link>
                </div>                      
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default PaginaPrincipal;
