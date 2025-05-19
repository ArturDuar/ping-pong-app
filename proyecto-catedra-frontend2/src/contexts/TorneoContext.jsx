// src/contexts/TorneoContext.jsx
import React, { createContext, useContext } from 'react';
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
    deleteTorneo,
    addJugadores
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
        deleteTorneo,
        addJugadores
      }}
    >
      {children}
    </TorneoContext.Provider>
  );
};

export const useTorneoContext = () => useContext(TorneoContext);
