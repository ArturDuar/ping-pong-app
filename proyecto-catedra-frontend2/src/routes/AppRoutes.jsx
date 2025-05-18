import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import Jugadores from "../pages/Jugador/Jugadores";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import JugadorDetalle from "../pages/Jugador/JugadorDetalle";
import JugadorCrear from "../pages/Jugador/JugadorCrear";
import JugadorEditar from "../pages/Jugador/JugadorEditar";
import Torneos from "../pages/Torneo/Torneos";
import TorneoDetalle from "../pages/Torneo/TorneoDetalle";
import TorneoCrear from "../pages/Torneo/TorneoCrear";
import TorneoEditar from "../pages/Torneo/TorneoEditar";
import VerUser from "../pages/VerUser";
import AgregarParticipantes from "../pages/Torneo/AgregarParticipantes";
import VerEstadisticas from "../pages/Estadisticas/VerEstadisticas";
import IngresarResultados from "../pages/Torneo/IngresarResultados";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PaginaPrincipal />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/jugadores"
        element={
          <PrivateRoute>
            <Jugadores />
          </PrivateRoute>
        }
      />
      <Route
        path="/jugadores/:id"
        element={
          <PrivateRoute>
            <JugadorDetalle />
          </PrivateRoute>
        }
      />
      <Route
        path="/jugadores/crear-jugador"
        element={
          <PrivateRoute>
            <JugadorCrear />
          </PrivateRoute>
        }
      />
      <Route
        path="/jugadores/editar-jugador/:id"
        element={
          <PrivateRoute>
            <JugadorEditar />
          </PrivateRoute>
        }
      />
      <Route
        path="/torneos"
        element={
          <PrivateRoute>
            <Torneos />
          </PrivateRoute>
        }
      />
      <Route
        path="/torneos/:id"
        element={
          <PrivateRoute>
            <TorneoDetalle />
          </PrivateRoute>
        }
      />
      <Route
        path="/torneos/crear-torneo"
        element={
          <PrivateRoute>
            <TorneoCrear />
          </PrivateRoute>
        }
      />
      <Route
        path="torneos/editar-torneo/:id"
        element={
          <PrivateRoute>
            <TorneoEditar />
          </PrivateRoute>
        }
      />
      <Route
        path="/torneos/:id/agregar-participantes"
        element={
          <PrivateRoute>
            <AgregarParticipantes />
          </PrivateRoute>
        }
      />
      <Route
        path="/torneos/:id/ingresar-resultados"
        element={
          <PrivateRoute>
            <IngresarResultados />
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <VerUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/estadisticas"
        element={
          <PrivateRoute>
            <VerEstadisticas />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
