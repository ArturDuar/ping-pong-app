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
    e.preventDefault();
    console.log('Sign up data:', formData);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.signupWrapper}>
          <div className={styles.formContainer}>
            <div className={styles.titleSection}>
              <Image 
                src="/img/logo.png" 
                alt="PING PONG CHAMPIONSHIP" 
                width={200}
                height={80}
                className={styles.logo}
              />
            </div>
            
            <h2 className={styles.crearCuenta}>Crear cuenta</h2>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Usuario"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  name="confirmarContrasena"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <button type="submit" className={styles.submitButton}>
                Crear Cuenta
              </button>
            </form>
            
            <div className={styles.loginLink}>
              <span>¿Ya tienes cuenta?</span>
              <Link href="/" className={styles.inicioSesion}>
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.footerbar}></div>
      </main>
    </div>
  );
}