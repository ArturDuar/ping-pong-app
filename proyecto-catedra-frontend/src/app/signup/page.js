"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard } from 'react-icons/fa';
import styles from './signup.module.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    usuario: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    contrasena: ''
  });

  const router = useRouter(); // Inicializa useRouter

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

    // Redirige a la página principal
    router.push('/paginaPrincipal'); // Asegúrate de que esta ruta sea válida
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.signupWrapper}>
          <div className={styles.formSection}>
            <h1 className={styles.pingPongTitle}>ping pong</h1>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <FaUser className={styles.inputIcon} />
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
                <FaIdCard className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <FaIdCard className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <FaPhone className={styles.inputIcon} />
                <input
                  type="tel"
                  placeholder="Telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <FaLock className={styles.inputIcon} />
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
              
              <button type="submit" className={styles.submitButton}>
                Crear Cuenta
              </button>
            </form>
            
            <div className={styles.loginLink}>
              <Link href="./">
                <button className={styles.loginButton}>Volver al Login</button>
              </Link>
            </div>
          </div>
          
          <div className={styles.logoSection}>
            <div className={styles.logoWrapper}>
              <Image
                src="/img/image1.png"
                alt="Ping Pong Team Logo"
                width={650}
                height={607}
                priority
              />
            </div>
          </div>
        </div>
        
        <div className={styles.footerBar}></div>
      </main>
    </div>
  );
}