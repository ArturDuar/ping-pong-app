import Link from "next/link";
import React from "react";

const JugadorCard = ({ nombre, imagen, cantidadJugadores, ubicacion, fechaInicio, fechaFinalizacion, categoria, descripcion, onEditar, onEliminar }) => {
    return (
      <div className="content">
        <h1 className="content-title">{nombre}</h1>
        
        <div className="card-container" style={{ maxWidth: '900px', background: 'var(--card-bg)', border: '2px solid var(--card-border)', borderRadius: '12px', padding: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          
          {/* Imagen del jugador */}
          <div style={{ flex: '1', textAlign: 'center' }}>
            <div style={{ backgroundColor: 'var(--primary)', width: '200px', height: '250px', borderRadius: '4px', margin: '0 auto' }}>
              <img
                src={imagen || "https://via.placeholder.com/200x250/8E2F6F/FFFFFF?text=Jugador"}
                alt={nombre}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
              />
            </div>
  
            <button className="card-button" style={{ marginTop: '15px', width: '100%' }} onClick={onEditar}>Editar Jugador</button>
            <button className="button button-secondary" style={{ marginTop: '10px', width: '100%' }} onClick={onEliminar}>Eliminar Jugador</button>
          </div>
  
          {/* Detalles del jugador */}
          <div style={{ flex: '1', color: 'var(--text-light)' }}>
            <h3 style={{ marginBottom: '15px' }}>Detalles del jugador</h3>
            <p><strong>Cantidad de jugadores:</strong> {cantidadJugadores}</p>
            <p><strong>Ubicación:</strong> {ubicacion}</p>
            <p><strong>Fecha inicio:</strong> {fechaInicio}</p>
            <p><strong>Fecha finalización:</strong> {fechaFinalizacion}</p>
            <p><strong>Categoría:</strong> {categoria}</p>
            <p><strong>Descripción:</strong></p>
            <p style={{ fontSize: '14px', color: '#CCCCCC' }}>{descripcion}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default JugadorCard;
  