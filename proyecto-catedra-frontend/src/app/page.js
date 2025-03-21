"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.loginForm}>
          <div className={styles.userIcon}>
            <Image 
              src="/img/icono.png" 
              alt="User Icon" 
              width={70} 
              height={70}
            />
          </div>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
            
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            
            <button type="submit" className={styles.loginButton}>
              Iniciar sesión
            </button>
          </form>
          
          <div className={styles.registerSection}>
            <span>¿No tienes cuenta?</span>
            <Link href="/signup" className={styles.registerLink}>
              Registrarse
            </Link>
          </div>
        </div>

        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <Image
              src="/img/logo.png"
              alt="Ping Pong Championship"
              width={200}
              height={80}
              priority
            />
            <p className={styles.description}>
              Gestor de torneos de Ping Pong para 
              que organices los mejores partidos 
              con tu organización.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}