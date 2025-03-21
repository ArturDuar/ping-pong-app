"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    window.location.href = '/dashboard';
  };

  return (
    <div className="home">
      <div className="containerCard">
        <div className="row loginCard m-1">
          <div className="logoSection col-lg-6 col-12">
            <div className="logoContainer">
              <Image
                src="/img/logo.png"
                alt="Ping Pong Championship"
                width={200}
                height={80}
                priority
                style={{objectFit: "contain"}}
              />
              <p className="description">
                Gestor de torneos de Ping Pong para 
                que organices los mejores partidos 
                con tu organización.
              </p>
            </div>
          </div>
          <div className="loginForm col-lg-6 col-12">
            <div className="userIcon">
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
                className="input"
                required
              />
              
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
              
              <button 
                type="submit" 
                className="loginButton">
                Iniciar sesión
              </button>
            </form>
            
            <div className="registerSection">
              <span>¿No tienes cuenta?</span>
              <Link href="/signup" className="registerLink">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}