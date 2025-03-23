"use client";

import { deleteTorneo } from "@/service/TorneoService";
import { useRouter } from "next/navigation";
import React from "react";

const TorneoCard = ({ nombre, imagen, ubicacion, fechaInicio, fechaFinalizacion, categoria, descripcion, id, onEditar}) => {
  
  const router = useRouter();
  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      if(confirm('¿Estás seguro de eliminar este torneo?')){
        const response = await deleteTorneo(id);
        console.log('Respuesta de eliminación:', response);
        router.push('/dashboard/torneo');
      }
      console.log('Eliminación cancelada');
    } catch (error) {
      console.log('Error al eliminar el torneo:', error);
    }
  }
  
  return (
    <div className="content container">
      <h1 className="content-title">{nombre}</h1>
      
      <div className="card-container" style={{ minHeight: '100%',minWidth: '100%', background: 'var(--card-bg)', border: '2px solid var(--card-border)', borderRadius: '12px', padding: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* Imagen del torneo */}
        <div style={{ textAlign: 'center' , minHeight: '50%'}} className="col-lg-6 col-12 h-100">
          <div style={{ backgroundColor: 'var(--primary)', width: '100%', borderRadius: '4px', margin: '0 auto'}} className="ratio ratio-1x1">
            <img
              src={imagen || "https://via.placeholder.com/200x250/8E2F6F/FFFFFF?text=Torneo"}
              alt="/*Aqui debería ir los brackets o esquemas del torneo*/"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
            />
          </div>

          <button className="card-button" style={{ marginTop: '15px', width: '100%' }} onClick={onEditar}>Editar Torneo</button>
          <button className="button button-secondary" style={{ marginTop: '10px', width: '100%' }} onClick={handleDelete}>Eliminar Torneo</button>
        </div>

        {/* Detalles del torneo */}
        <div style={{ flex: '1', color: 'var(--text-light)' }}>
          <h3 style={{ marginBottom: '15px' }}>Detalles del torneo</h3>
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

export default TorneoCard;
