import React, { useState } from 'react';
import Link from 'next/link'; // Cambia a Link de Next.js
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../globals.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <img src="/img/Logo/nombreSolo_blanco.png" alt="Logo Ping Pong" className="logo" />
      <nav className="nav">
        <Link href="/paginaPrincipal/creartorneo" className="nav-link">Torneos</Link>
        <Link href="/paginaPrincipal/ingresarjugador" className="nav-link">Jugadores</Link>
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

const CrearJugador = () => {
  return (
      <div className="content">
          <h2 className="title">Crear nuevo jugador</h2>
          <br></br>
          <br></br>
          <div className="form-container">
              <div className="form-section">
                  <label className="section-label">Nombre Completo del jugador</label>
                  <div className="form-row">
                      <div className="form-group">
                          <input type="text" id="primerNombre" placeholder="Primer Nombre" />
                      </div>
                      <div className="form-group">
                          <input type="text" id="segundoNombre" placeholder="Segundo Nombre" />
                      </div>
                  </div>
                  <div className="form-row">
                      <div className="form-group">
                          <input type="text" id="primerApellido" placeholder="Primer Apellido" />
                      </div>
                      <div className="form-group">
                          <input type="text" id="segundoApellido" placeholder="Segundo Apellido" />
                      </div>
                  </div>
              </div>

              <div className="form-section2">
                  <div className="form-group">
                      <label htmlFor="lugar">Nacionalidad</label>
                      <input type="text" id="nacionalidades" placeholder="Ej. Salvadoreña" />
                  </div>
                  <br></br>
                  <div className="form-group">
                      <label htmlFor="fechanacimiento">Fecha de nacimiento</label>
                      <input type="text" id="fechanacimiento" placeholder="dd/mm/aa" />
                  </div>
              </div>

              <div className="form-section1">
                  <div className="form-group file-upload">
                      <label htmlFor="foto">Fotografía del jugador</label>
                      <input type="file" id="foto" />
                      <span>Elije un archivo</span>
                  </div>
                  <div className='mensajefoto'>
                      <span>Ningun archivo Seleccionado</span>
                  </div>
              </div>
              <div className="form-group">
                      <label htmlFor="genero">Genero</label>
                      <select id="generos">
                          <option value="">Seleccione un genero</option>
                          <option value="masculino">Masculino</option>
                          <option value="femenino">Femenino</option>
                      </select>
                  </div>
              
              <div className="button-group">
                  <button className="button button-primary">Crear jugador</button>
                  <button className="button button-secondary">Cancelar</button>
              </div>
              <br></br>
          </div>
      </div>
  );
};

export default CrearJugador;
