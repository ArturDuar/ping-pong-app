// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as LoginService from '../services/LoginService';
import * as RegisterService from '../services/RegisterService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(LoginService.isAuthenticated());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (LoginService.isAuthenticated()) {
        const data = await LoginService.getUser();
        if (data) {
          setUser(data.user);
          setIsAuth(true);
        } else {
          logout(); // token inválido
        }
      }
      setLoading(false); // finaliza la carga
    };
    initAuth();
  }, []);
  
  const login = async (email, password) => {
    const data = await LoginService.login(email, password);
    setIsAuth(true);
    console.log('user:', data.user);
    setUser(data.user );
  };

  const logout = () => {
    LoginService.logout();
    setIsAuth(false);
    setUser(null);
  };

  const register = async (name, email, password) => {
    const data = await RegisterService.register(name, email, password);
    setIsAuth(true);
    setUser(data.user);

  }

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, loading, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
