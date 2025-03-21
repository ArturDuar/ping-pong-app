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

const JugadorIndividual = () => {
  return (
    <div className="content">
      <h1 className="content-title">Nombre del jugador</h1>
      
      <div className="card-container" style={{ maxWidth: '900px', background: 'var(--card-bg)', border: '2px solid var(--card-border)', borderRadius: '12px', padding: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* Imagen del jugador */}
        <div style={{ flex: '1', textAlign: 'center' }}>
          <div style={{ backgroundColor: 'var(--primary)', width: '200px', height: '250px', borderRadius: '4px', margin: '0 auto' }}>
            {/* Imagen simulada, puedes reemplazar por <img src={imagenJugador} /> */}
            <img
              src="https://via.placeholder.com/200x250/8E2F6F/FFFFFF?text=Jugador"
              alt="Jugador"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
            />
          </div>

          <button className="card-button" style={{ marginTop: '15px', width: '100%' }}>Editar Jugador</button>
          <button className="button button-secondary" style={{ marginTop: '10px', width: '100%' }}>Eliminar Jugador</button>
        </div>

        {/* Detalles del jugador */}
        <div style={{ flex: '1', color: 'var(--text-light)' }}>
          <h3 style={{ marginBottom: '15px' }}>Detalles del jugador</h3>
          <p><strong>Cantidad de jugadores:</strong> x</p>
          <p><strong>Ubicación:</strong> Cancha de San José de Las Lomas</p>
          <p><strong>Fecha inicio:</strong> dd/mm/aa</p>
          <p><strong>Fecha finalización:</strong> dd/mm/aa</p>
          <p><strong>Categoría:</strong> Masculino/Femenino/Mixto</p>
          <p><strong>Descripción:</strong></p>
          <p style={{ fontSize: '14px', color: '#CCCCCC' }}>
            Lorem ipsum dolor sit amet consectetur. Elementum quis rhoncus massa malesuada consequat nulla. Mauris egestas in eros ornare tellus mauris.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JugadorIndividual;