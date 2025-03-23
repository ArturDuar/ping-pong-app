"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { login } from '@/service/LoginService';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificamos la autenticación del usuario
    const token = localStorage.getItem("token");
    
    if (token) {
      router.push("/dashboard");
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();
    setIsLoading(true);  // Activar el estado de carga

    try {
      const data = await login(email, password);
      console.log('Inicio de sesión exitoso:', data);
      router.push('/dashboard');
      setIsLoading(false);

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    };
  }

    
  return (
    <div>
      {loading || !isAuthenticated ? (
      <LoadingScreen/> 
      ): (
        <div className="min-vh-100 container d-flex justify-content-center align-items-center">
          <div>
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
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="inputStyle w-100 mb-3"
                    required
                  />
                  
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="inputStyle w-100 mb-3"
                    required
                  />
                  
                  {error && <p style={{ color: 'red' }}>{error}</p>}

                  {isLoading ? (
                    <button
                    type="submit" 
                    className="bg-success loginButton" 
                    disabled={isLoading}>
                    Cargando...
                    </button>
                  ) : (
                    <button
                    type="submit" 
                    className="loginButton" 
                    disabled={isLoading}>
                    Iniciar sesión
                  </button>
                  )}
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
      )}
    </div>
  );
}