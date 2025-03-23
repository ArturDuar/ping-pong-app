"use client";

import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificamos la autenticación del usuario
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Si no hay token, redirigimos al login
      router.push("/");
    } else {
      // Si hay token, marcamos como autenticado y dejamos de mostrar la pantalla de carga
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  // Solo mostramos el contenido real si NO está cargando Y está autenticado
  return (
    <div>
      {isLoading || !isAuthenticated ? (
        <LoadingScreen />
      ) : (
        <>
          <Header/>
          <div className="min-vh-100">
            {children}
          </div>
          <Footer/>
        </>
      )}
    </div>
  );
}
