"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import '@/app/globals.css';
import { getJugadorbyId, saveJugador, updateJugador } from '@/service/JugadorService';
import { useParams, useRouter } from 'next/navigation';


const CrearJugador = () => {
    const params = useParams();
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const [jugador, setJugador] = useState({
        nombre_jugador: '',
        nacionalidad: '',
        fecha_nacimiento: '',
        enlace_fotografia: null,
        genero: '',
    });

    // Cargar los datos del jugador si es modo edición
    useEffect(() => {
        if (params.id) {
            // Cargar los datos del jugador para editar
            const fetchJugador = async () => {
                try {
                    setIsLoading(true);
                    // Asume que tienes una función `getJugador` que hace una solicitud GET para obtener el jugador por ID
                    const { data } = await getJugadorbyId(params.id);
                    console.log('Datos del jugador:', data);
                    setJugador({
                        nombre_jugador: data.nombre_jugador,
                        nacionalidad: data.nacionalidad,
                        fecha_nacimiento: data.fecha_nacimiento,
                        enlace_fotografia: data.enlace_fotografia,
                        genero: data.genero,
                    });
                    setIsLoading(false);
                } catch (err) {
                    setError(err.message);
                    setIsLoading(false);
                }
            };
            fetchJugador();
        }
    }, [params.id]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJugador((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log('Jugador:', jugador);
    };

    const handleFileChange = (e) => {
        setJugador((prev) => ({
            ...prev,
            enlace_fotografia: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            let data;
            if (params.id) {
                // Llamar a la función para editar
                data = await updateJugador(params.id, jugador.nombre_jugador, jugador.genero, jugador.enlace_fotografia, jugador.fecha_nacimiento, jugador.nacionalidad);
                console.log('Jugador editado correctamente:', data);
            } else {
                // Llamar a la función para crear
                data = await saveJugador(jugador.nombre_jugador, jugador.genero, jugador.enlace_fotografia, jugador.fecha_nacimiento, jugador.nacionalidad);
                console.log('Jugador creado correctamente:', data);
            }
            console.log(`Redigiriendo a la ruta /dashboard/jugador/ver-jugador/${data.id}`);
            router.push(`/dashboard/jugador/ver-jugador/${data.id}`);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="content my-5 border border-2 rounded container" style={{ backgroundColor: 'var(--card-bg)' }}>
            <h2 className="title">{params.id ? 'Editar jugador' : 'Crear nuevo jugador'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="row container row-cols-lg-2 row-gap-3">
                    <div className="form-group">
                        <label htmlFor="nombre_jugador">Nombre del jugador</label>
                        <input
                            type="text"
                            id="nombre_jugador"
                            name="nombre_jugador"
                            placeholder="Ej. Arturo Duarte"
                            value={jugador.nombre_jugador}
                            onChange={handleChange}
                            required
                            className='border-0 text-white'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nacionalidad">Nacionalidad</label>
                        <input
                            type="text"
                            id="nacionalidad"
                            name="nacionalidad"
                            placeholder="Ej. Salvadoreña"
                            value={jugador.nacionalidad}
                            onChange={handleChange}
                            required
                            className='border-0 text-white'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                        <input
                            type="date"
                            id="fecha_nacimiento"
                            name="fecha_nacimiento"
                            value={jugador.fecha_nacimiento}
                            onChange={handleChange}
                            required
                            className='border-0 text-white'
                        />
                    </div>
                    <div className="form-group file-upload">
                        <label htmlFor="enlace_fotografia">Fotografía del jugador</label>
                        <input
                            type="file"
                            id="enlace_fotografia"
                            name="enlace_fotografia"
                            onChange={handleFileChange}
                            className='form-control rounded-1 file-update-custom border-0'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genero">Genero</label>
                        <select
                            id="genero"
                            name="genero"
                            value={jugador.genero}
                            onChange={handleChange}
                            className='border-0 text-white'
                            required
                        >
                            <option value="">Seleccione un genero</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>
                </div>
                <div className="button-group">
                    {isloading ? (
                        <button type="submit" className="button button-success" disabled={isloading}>
                            {params.id ? 'Editando jugador...' : 'Creando jugador...'}
                        </button>
                    ) : (
                        <button type="submit" className="button button-primary">{params.id ? 'Editar jugador' : 'Crear jugador'}</button>
                    )}

                    <Link href="/dashboard/jugador">
                        <button type="button" className="button button-secondary">Cancelar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CrearJugador;
