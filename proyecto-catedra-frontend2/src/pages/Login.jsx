import { Link, useNavigate } from "react-router-dom";
import LoginSignUp from "../layout/Login-SignUp";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      alert("Error: " + error.message);
    }
    
  };

  return (
    <LoginSignUp>
      <div className="row gap-lg-0 gap-4 m-auto">
        <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column p-5">
          <img
            src="/img/logo.png"
            alt="Ping Pong Championship"
            width="100%"
            className="mb-5"
          />
          <p className="fs-lg-1 text-center">
            Gestor de torneos de Ping Pong para que organices los mejores
            partidos con tu organización.
          </p>
        </div>
        <div className="col-lg-6 card-bg p-5 rounded-3 shadow-lg ">
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <div>
            <img src="/img/icono.png" alt="User Icon" className="mb-3" />
          </div>

          <form
            className="d-flex flex-column gap-3"
            onSubmit={handleSubmit}
            method="POST"
          >
            <input
              className="form-control input-text"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
              required
              autoComplete="email"
            />
            <input
              className="form-control input-text"
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button className="btn-primary rounded my-3">Iniciar sesión</button>
          </form>

          <div>
            <span>¿No tienes cuenta? </span>
            <Link to="/signup" className="registerLink">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </LoginSignUp>
  );
};

export default Login;
