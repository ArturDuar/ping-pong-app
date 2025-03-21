import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import './globals.css';

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

const jugadores = [
  {
    id: 1,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/MujerJugador.png",
  },
  {
    id: 2,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/HombreJugador.png", 
  },
  {
    id: 3,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/MujerJugador.png",
  },
  {
    id: 4,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/HombreJugador.png", 
  },
  {
    id: 5,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/MujerJugador.png",
  },
  {
    id: 6,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/HombreJugador.png",
  },
  {
    id: 7,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/MujerJugador.png", 
  },
  {
    id: 8,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/HombreJugador.png", 
  },
  {
    id: 9,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/MujerJugador.png", 
  },
  {
    id: 10,
    nombre: "Nombre Completo",
    datos: ["Dato 1", "Dato 2"],
    imagen: "/img/Jugadores/HombreJugador.png", 
  },
];

const VerJugador = () => {
  return (
<div className="content">
  <h2 className="content-title">Jugadores</h2>

  <div className="jugadores-page">
    <div className="jugadores-grid">
      {jugadores.map((jugador) => (
        <div key={jugador.id} className="jugador-card">
          <img src={jugador.imagen} alt={jugador.nombre} className="jugador-imagen" />
          <h3 className="jugador-nombre">{jugador.nombre}</h3>
          <p className="jugador-datos">Datos de jugador:</p>
          <ul>
            {jugador.datos.map((dato, index) => (
              <li key={index}>• {dato}</li>
            ))}
          </ul>
          <Link to="/JugadorIndividual">
            <button className="ver-mas-button">Ver más</button>
          </Link>
        </div>
      ))}
    </div>

    <div className="nuevo-jugador-card">
      <p>¿Quieres ingresar un nuevo jugador?</p>
      <Link to="/ingresarjugador">
        <button className="nuevo-jugador-button">Crear nuevo jugador</button>
      </Link>
    </div>
  </div>
</div>

  );
};


export default VerJugador;
