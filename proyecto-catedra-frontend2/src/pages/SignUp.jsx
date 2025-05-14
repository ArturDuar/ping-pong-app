import { Link } from "react-router-dom";
import LoginSignUp from "../layout/Login-SignUp";

const SignUp = () => {
  return (
    <LoginSignUp>
      <div className="row d-flex flex-column flex-md-row gap-lg-0 gap-4 m-auto">
        <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column p-5 order-md-2 order-1">
            <img
              src="/img/Logo/nombre_blanco.png"
              alt="Ping Pong Championship"
              width="75%"
              className="mb-5"
            />
            <p className="fs-lg-1 text-center">
              Crea tu cuenta y empieza a organizar los mejores torneos de Ping Pong
            </p>
        </div>
        <div className="col-lg-6 card-bg d-flex flex-column gap-3 p-5 rounded-3 shadow-lg order-2 order-md-1">
          <h2 className="text-center mb-4">Crear cuenta</h2>

          <form className="d-flex flex-column gap-3">
            <div>
              <input
                type="text"
                placeholder="Usuario"
                name="name"
                className="form-control input-text"
                autoComplete="off"
                required
              />
            </div>

            <div className="">
              <input
                type="email"
                placeholder="Correo Electrónico"
                name="email"
                className="form-control input-text"
                autoComplete="off"
                required
              />
            </div>

            <div className="">
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                className="form-control input-text"
                autoComplete="off"
                required
              />
            </div>

            <div className="">
              <input
                type="password"
                placeholder="Confirmar contraseña"
                name="passwordConfirmation"
                className="form-control input-text"
                autoComplete="off"
                required
              />
            </div>

            <button type="submit" className="btn-primary rounded my-3">
              Crear Cuenta
            </button>
          </form>

          <div className="loginLink">
            <span>¿Ya tienes cuenta? </span>
            <Link to="/login">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </LoginSignUp>
  );
};

export default SignUp;
