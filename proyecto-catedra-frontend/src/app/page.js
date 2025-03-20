"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // router de Next.js 13
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";
import styles from "../app/pages.module.css"; // Ajusta la ruta si es necesario

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // Hook de Next.js 13 para manejar redirecciones

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
    // Redirigir a la página principal después de un login exitoso
    router.push("/paginaPrincipal"); // Redirige a la página principal
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
              <a href="/signup">
                <button className={styles.signupButton}>Sign up</button>
              </a>
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
