"use client"; 

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaUser, FaChartBar, FaUsers, FaTableTennis, FaSignOutAlt } from "react-icons/fa";
import "./globals.css";
import CrearTorneo from './creartorneo';
import CrearJugador from './ingresarjugador';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
      <header className="header">
          <img src="/img/Logo/nombreSolo_blanco.png" alt="Logo Ping Pong" className="logo" />
          <nav className="nav">
              <Link to="/torneos" className="nav-link">Torneos</Link>
              <Link to="/jugadores" className="nav-link">Jugadores</Link>
              <Link to="/estadisticas" className="nav-link">Estadísticas</Link>
          </nav>
          <div className="user-menu">
              <button className="user-button" onClick={() => setMenuOpen(!menuOpen)}>
                  <FaUser size={20} />
                  <span>Username</span>
              </button>
              {menuOpen && (
                  <div className="dropdown">
                      <Link to="/perfil" className="dropdown-item">Ver Perfil</Link>
                      <button className="dropdown-item flex items-center">
                          <FaSignOutAlt size={16} className="icon" /> Cerrar sesión
                      </button>
                  </div>
              )}
          </div>
      </header>
  );
};

const Footer = () => (
  <footer className="footer">&copy; 2025 Ping Pong Championship</footer>
);

const Home = () => (
  <div className="home">
    <div className="logo-container"> 
      <div className="logo-wrapper">
        <img src="/img/Logo/logo_blanco.png" alt="Logo Ping Pong" className="logo" />
      </div>
    </div>
    <br></br>
    
    <div className="card-container"> 
      <Card icon={<FaTableTennis size={200} />} title="Gestionar torneos" link="./creartorneo" />
      <Card icon={<FaUsers size={200} />} title="Gestionar jugadores" link="./ingresarjugador" />
      <Card icon={<FaChartBar size={200} />} title="Ver estadísticas" link="" />
    </div>
  </div>
);

const Card = ({ icon, title, link }) => (
  <Link to={link} className="card">
    {icon}
    <button className="card-button">{title}</button>
  </Link>
);

const App = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/torneos" element={<h2 className="content-title">Gestión de torneos</h2>} />
        <Route path="/jugadores" element={<h2 className="content-title">Gestión de jugadores</h2>} />
        <Route path="/estadisticas" element={<h2 className="content-title">Estadísticas</h2>} />
        <Route path="/perfil" element={<h2 className="content-title">Perfil de Usuario</h2>} />
        <Route path="/creartorneo" element={<CrearTorneo />} />
        <Route path="/ingresarjugador" element={<CrearJugador />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;