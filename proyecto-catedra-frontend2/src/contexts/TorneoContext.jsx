import React, { createContext, useContext } from 'react';
import { useTorneos } from '../hooks/useTorneo'; // Asegúrate de tener este hook

const TorneoContext = createContext();

export const TorneoProvider = ({ children }) => {
  const torneoData = useTorneos();

  return (
    <TorneoContext.Provider value={torneoData}>
      {children}
    </TorneoContext.Provider>
  );
};

export const useTorneoContext = () => useContext(TorneoContext);
