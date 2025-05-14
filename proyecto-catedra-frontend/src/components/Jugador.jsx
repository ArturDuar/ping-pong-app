
import React from "react";

const JugadorCard = ({ nombre, imagen, nacionalidad, fecha_nacimiento, genero, id }) => {
  

  
  return (
      <div className="content">
        <h1 className="content-title">{nombre}</h1>
        
        <div className="card-container" style={{ maxWidth: '900px', background: 'var(--card-bg)', border: '2px solid var(--card-border)', borderRadius: '12px', padding: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          
          {/* Imagen del jugador */}
          <div style={{ textAlign: 'center' }} className="col-12 col-md-6 h-100">
            <div style={{ backgroundColor: 'var(--primary)', width: '100%', borderRadius: '4px', margin: '0 auto' }}>
              <img
                src={imagen || "https://via.placeholder.com/200x250/8E2F6F/FFFFFF?text=Jugador"}
                alt={nombre}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
              />
            </div>
  
            <button className="card-button" style={{ marginTop: '15px', width: '100%' }} onClick={handleEdit}>Editar Jugador</button>
            <button className="button button-secondary" style={{ marginTop: '10px', width: '100%' }} onClick={handleDelete}>Eliminar Jugador</button>
          </div>
  
          {/* Detalles del jugador */}
          <div style={{ flex: '1', color: 'var(--text-light)' }}>
            <h3 style={{ marginBottom: '15px' }}>Detalles del jugador</h3>
            <p><strong>Nacionalidad:</strong> {nacionalidad}</p>
            <p><strong>Fecha de nacimiento:</strong> {fecha_nacimiento}</p>
            <p><strong>Género:</strong> {genero}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default JugadorCard;
