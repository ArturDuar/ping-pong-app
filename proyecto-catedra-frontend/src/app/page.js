"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaLock } from 'react-icons/fa';
import styles from '../app/pages.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.loginWrapper}>
          <div className={styles.loginForm}>
            <h1 className={styles.pingPongTitle}>ping pong</h1>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              
              <button type="submit" className={styles.loginButton}>
                Login
              </button>
            </form>
            
            <div className={styles.signupSection}>
              <p>No tienes cuenta?</p>
              <Link href="/signup">
                <button className={styles.signupButton}>Sign up</button>
              </Link>
            </div>
          </div>
          
          <div className={styles.logoSection}>
            <div className={styles.logoWrapper}>
              <Image
                src="/img/image1.png"
                alt="Ping Pong Team Logo"
                width={700}
                height={607}
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}