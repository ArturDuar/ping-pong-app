"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import { register } from '@/service/RegisterService';

export default function SignUp() {
    const [loading, setLoading] = useState(true);  
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  
    const [error, setError] = useState('');
  
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    });

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

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      console.log('Form Data:', formData);
    };

    const handleSubmit = async (e) => {
        setError('');
        e.preventDefault();
        setIsLoading(true);  // Activar el estado de carga

        try {

          if(formData.password !== formData.passwordConfirmation){
            setError('Las contraseñas no son iguales');
            setIsLoading(false);

            return;
          }

          const data = await register(formData.name, formData.email, formData.password);
          console.log('Registro existoso:', data);
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
          <div className="formContainer p-5">
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
            
            <form onSubmit={handleSubmit}>
              <div className="inputGroup">
                <input
                  type="text"
                  placeholder="Usuario"
                  name="name"
                  className="inputStyle w-100"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="inputGroup">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  name="email"
                  className="inputStyle w-100"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="inputGroup">
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  className="inputStyle w-100"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="inputGroup">
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  name="passwordConfirmation"
                  className="inputStyle w-100"
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p style={{ color: 'red' }}>{error}</p>}
              
              {isLoading ? (
                <button type="submit" className="submitButton" disabled={isLoading}>
                  Creando cuenta...
                </button>
              ) : (
                <button type="submit" className="submitButton" disabled={isLoading}>
                  Crear Cuenta
                </button>
              )}
            </form>
            
            <div className="loginLink">
              <span>¿Ya tienes cuenta?</span>
              <Link href="/" className="inicioSesion">
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
    )}
    </div>
  );
}