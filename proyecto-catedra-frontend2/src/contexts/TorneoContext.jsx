// src/contexts/TorneoContext.jsx
import React, { createContext } from 'react';
import { useTorneos } from '../hooks/useTorneo';

const TorneoContext = createContext();

export const TorneoProvider = ({ children }) => {
  const {
    torneos,
    loading,
    error,
    fetchTorneos,
    getById,
    createTorneo,
    updateTorneo,
    deleteTorneo
  } = useTorneos();

  return (
    <TorneoContext.Provider
      value={{
        torneos,
        loading,
        error,
        fetchTorneos,
        getById,
        createTorneo,
        updateTorneo,
        deleteTorneo
      }}
    >
      {children}
    </TorneoContext.Provider>
  );
};

export { TorneoContext };
