"use client";

import { useState } from "react";
import { FaUser, FaChartBar, FaUsers, FaTableTennis, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import '../globals.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <img src="/img/Logo/nombreSolo_blanco.png" alt="Logo Ping Pong" className="logo" />
      <nav className="nav">
        <Link href="/paginaPrincipal/crearTorneo" className="nav-link">Torneos</Link>
        <Link href="/paginaPrincipal/ingresarJugador" className="nav-link">Jugadores</Link>
        <Link href="/paginaPrincipal/estadisticas" className="nav-link">Estadísticas</Link>
      </nav>
      <div className="user-menu">
        <button className="user-button" onClick={() => setMenuOpen(!menuOpen)}>
          <FaUser size={20} />
          <span>Username</span>
        </button>
        {menuOpen && (
          <div className="dropdown">
            <Link href="/perfil" className="dropdown-item">Ver Perfil</Link>
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
    <br />
    
    <div className="card-container">
      <Card icon={<FaTableTennis size={200} />} title="Gestionar torneos" link="/paginaPrincipal/crearTorneo" />
      <Card icon={<FaUsers size={200} />} title="Gestionar jugadores" link="/paginaPrincipal/ingresarJugador" />
      <Card icon={<FaChartBar size={200} />} title="Ver estadísticas" link="/paginaPrincipal/estadisticas" />
    </div>
  </div>
);

const Card = ({ icon, title, link }) => (
  <Link href={link} className="card">
    {icon}
    <button className="card-button">{title}</button>
  </Link>
);

const paginaPrincipal = () => (
  <>
    <Header />
    <Home />
    <Footer />
  </>
);

export default paginaPrincipal;
