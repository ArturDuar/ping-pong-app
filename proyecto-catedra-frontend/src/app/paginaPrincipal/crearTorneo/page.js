"use client";

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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del torneo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Escribe el nombre del torneo"
              value={torneo.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lugar">Lugar del evento</label>
            <input
              type="text"
              id="lugar"
              name="lugar"
              placeholder="Ej. San Antonio"
              value={torneo.lugar}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoria</label>
            <select id="categoria" name="categoria" onChange={handleChange}>
              <option value="">Elije una categoria</option>
              <option value="1">Categoría 1</option>
              <option value="2">Categoría 2</option>
              <option value="3">Categoría 3</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Ej. Las reglas del torneo son..."
              value={torneo.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha de inicio</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={torneo.fecha}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="button button-primary">Crear Torneo</button>
            <button type="button" className="button button-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearTorneo;
