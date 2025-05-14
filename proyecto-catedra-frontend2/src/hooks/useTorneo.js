import { useState, useEffect } from 'react';
import { torneoService } from '../services/TorneoService';

export function useTorneos() {
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTorneos = async () => {
    setLoading(true);
    try {
      const data = await torneoService.getAll();
      setTorneos(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id) => {
    const torneo = await torneoService.getById(id);
    return torneo;
  };

  const createTorneo = async (nuevo) => {
    const torneo = await torneoService.create(nuevo);
    return torneo;
  };

  const updateTorneo = async (id, actualizado) => {
    const torneo = await torneoService.update(id, actualizado);
    return torneo;
  };

  const deleteTorneo = async (id) => {
    await torneoService.delete(id);
  };

  return {
    torneos,
    loading,
    error,
    fetchTorneos,
    getById,
    createTorneo,
    updateTorneo,
    deleteTorneo
  };
}
