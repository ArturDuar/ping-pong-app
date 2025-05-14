import { useState, useEffect } from 'react';
import { jugadorService } from '../services/JugadorService';

export function useJugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJugadores = async () => {
    setLoading(true);
    try {
      const data = await jugadorService.getAll();
      setJugadores(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id) => {
    const jugador = await jugadorService.getById(id);
    return jugador;
  }
 
  const createJugador = async (nuevo) => {
    const jugador = await jugadorService.create(nuevo);
    return jugador;
  };

  const updateJugador = async (id, actualizado) => {
    console.log('actualizado:', actualizado);
    const jugador = await jugadorService.update(id, actualizado);
    
    return jugador;
  };

  const deleteJugador = async (id) => {
    await jugadorService.delete(id);
  };


  return {
    jugadores,
    loading,
    error,
    getById,
    fetchJugadores,
    createJugador,
    updateJugador,
    deleteJugador
  };
}
