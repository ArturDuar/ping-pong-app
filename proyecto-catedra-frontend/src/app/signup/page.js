"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './signup.module.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    console.log('Sign up data:', formData);
  };

  return (
    <div className="containerCard">
      <main className="main">
        <div className="signupWrapper">
          <div className="formContainer">
            <div className="titleSection">
              <img 
                src="/img/logos/logo_blanco.png" 
                alt="PING PONG CHAMPIONSHIP" 
                width="200"
                height="80"
                className="logo"
              />
            </div>
            
            <h2 className="crearCuenta">Crear cuenta</h2>
            
            <form>
              <div className="inputGroup">
                <input
                  type="text"
                  placeholder="Usuario"
                  name="usuario"
                  className="input"
                  required
                />
              </div>
              
              <div className="inputGroup">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  name="email"
                  className="input"
                  required
                />
              </div>
              
              <div className="inputGroup">
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="contrasena"
                  className="input"
                  required
                />
              </div>
              
              <div className="inputGroup">
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  name="confirmarContrasena"
                  className="input"
                  required
                />
              </div>
              
              <button type="submit" className="submitButton">
                Crear Cuenta
              </button>
            </form>
            
            <div className="loginLink">
              <span>¿Ya tienes cuenta?</span>
              <a href="/" className="inicioSesion">
                Inicia sesión
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}