import React, { createContext, useContext } from 'react';
import { useJugadores } from '../hooks/useJugador';

const JugadorContext = createContext();

export const JugadorProvider = ({ children }) => {
  const jugadorData = useJugadores();

  return (
    <JugadorContext.Provider value={jugadorData}>
      {children}
    </JugadorContext.Provider>
  );
};

export const useJugadorContext = () => useContext(JugadorContext);
