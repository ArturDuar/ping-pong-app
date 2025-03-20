import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../globals.css'; 


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

const CrearTorneo = () => {
  const [torneo, setTorneo] = useState({
    nombre: '',
    fecha: '',
    lugar: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTorneo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Torneo creado:', torneo);
  };

  return (
    <div className="content">
      <h2 className="content-title">Crear nuevo torneo</h2>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="nombre">Nombre del torneo</label>
          <input type="text" id="nombre" placeholder="Escribe el nombre del torneo" />
        </div>

        <div className="form-group">
          <label htmlFor="lugar">Lugar del evento</label>
          <input type="text" id="lugar" placeholder="Ej. San Antonio" />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>
          <select id="categoria">
            <option value="">Elije una categoria</option>
            <option value="1">Categoría 1</option>
            <option value="2">Categoría 2</option>
            <option value="3">Categoría 3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea id="descripcion" placeholder="Ej. Las reglas del torneo son..."></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="fecha-inicio">Fecha de inicio</label>
          <input type="text" id="fecha-inicio" placeholder="dd/mm/aa" />
        </div>

        <div className="form-group">
          <label htmlFor="jugadores">Cantidad de jugadores</label>
          <select id="jugadores">
            <option value="4">4 Personas</option>
            <option value="8">8 Personas</option>
            <option value="16">16 Personas</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fecha-fin">Fecha de finalización</label>
          <input type="text" id="fecha-fin" placeholder="dd/mm/aa" />
        </div>
        <br></br>
        <br></br>

        <div className="button-group">
          <button className="button button-primary">Crear Torneo</button>
          <button className="button button-secondary">Cancelar</button>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default CrearTorneo;
