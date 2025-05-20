import { useState } from 'react';
import { partidoService } from '../services/PartidoService';

export function usePartidos() {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPartidos = async (id) => {
    setLoading(true);
    try {
      const data = await partidoService.getAll(id);
      setPartidos(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id) => {
    const partido = await partidoService.getById(id);
    return partido;
  }
 
  const createPartido = async (nuevo) => {
    const partido = await partidoService.create(nuevo);
    return partido;
  };

  return {
    partidos,
    loading,
    error,
    fetchPartidos,
    getById,
    createPartido
  }
}
