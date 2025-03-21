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

const TorneoIndividual = () => {
  return (
    <main className="torneo-container">
      <h1 className="torneo-title">Torneo: Nombre del torneo</h1>

      <div className="torneo-content">
        {/* Gráfico del torneo */}
        <div className="torneo-graphic-card">
          <img
            src="/GraficoTorneoIndividual.png"
            alt="Gráfico Torneo"
            className="/img/Jugadores/HombreJugador.png"
          />
          <button className="btn-proximo">Próximo</button>
        </div>

        {/* Detalles del torneo */}
        <div className="torneo-detalles-card">
          <h2 className="torneo-detalles-title">Detalles del torneo</h2>
          <ul className="torneo-detalles-list">
            <li><strong>Cantidad de jugadores:</strong> x</li>
            <li><strong>Ubicación:</strong> Cancha de San José de Las Lomas</li>
            <li><strong>Fecha inicio:</strong> dd/mm/aa</li>
            <li><strong>Fecha finalización:</strong> dd/mm/aa</li>
            <li><strong>Categoría:</strong> Masculino/Femenino/Mixto</li>
            <li>
              <strong>Descripción:</strong> Lorem ipsum dolor sit amet consectetur. 
              Elementum quis rhoncus massa malesuada consequat nulla. 
              Mauris egestas in eros ornare tellus mauris.
            </li>
          </ul>

          {/* Botones de acción */}
          <div className="torneo-buttons">
            <button className="btn-pink">Agregar participantes</button>
            <button className="btn-white">Editar Torneo</button>
            <button className="btn-dark">Eliminar torneo</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TorneoIndividual;