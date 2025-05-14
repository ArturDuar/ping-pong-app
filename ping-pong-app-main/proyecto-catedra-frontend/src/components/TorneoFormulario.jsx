"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import '@/app/globals.css';
import { saveTorneo, getTorneobyId, updateTorneo } from '@/service/TorneoService';  // Asegúrate de tener estos servicios creados
import { useParams, useRouter } from 'next/navigation';


const CrearTorneo = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const [torneo, setTorneo] = useState({
        nombre_torneo: '',
        descripcion: '',
        lugar_evento: '',
        fecha_inicio: '',
        fecha_fin: '',
        categoria_genero: '',
    });

    // Cargar los datos del torneo si es modo edición
    useEffect(() => {
        if (params.id) {
            // Cargar los datos del torneo para editar
            const fetchTorneo = async () => {
                try {
                    setIsLoading(true);
                    // Asume que tienes una función `getTorneoById` que hace una solicitud GET para obtener el torneo por ID
                    const { data } = await getTorneobyId(params.id);
                    console.log('Datos del torneo:', data);
                    setTorneo({
                        nombre_torneo: data.nombre_torneo,
                        descripcion: data.descripcion,
                        lugar_evento: data.lugar_evento,
                        fecha_inicio: data.fecha_inicio,
                        fecha_fin: data.fecha_fin,
                        categoria_genero: data.categoria_genero,
                    });
                    setIsLoading(false);
                } catch (err) {
                    setError(err.message);
                    setIsLoading(false);
                }
            };
            fetchTorneo();
        }
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTorneo((prev) => ({
            ...prev,
            [name]: value,
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
                data = await updateTorneo(params.id, torneo.nombre_torneo, torneo.descripcion, torneo.lugar_evento, torneo.fecha_inicio, torneo.fecha_fin, torneo.categoria_genero);
                console.log('Torneo editado correctamente:', data);
            } else {
                // Llamar a la función para crear
                data = await saveTorneo(torneo.nombre_torneo, torneo.descripcion, torneo.lugar_evento, torneo.fecha_inicio, torneo.fecha_fin, torneo.categoria_genero);
                console.log('Torneo creado correctamente:', data.data);
                data = data.data; // Ajuste para mantener consistencia entre crear y editar
            }
            console.log(`Redigiriendo a la ruta /dashboard/torneo/ver-torneo/${data.id}`);
            router.push(`/dashboard/torneo/ver-torneo/${data.id}`);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="content my-5 border border-2 rounded container" style={{ backgroundColor: 'var(--card-bg)' }}>
            <h2 className="title">{params.id ? 'Editar torneo' : 'Crear nuevo torneo'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="row container row-cols-lg-2 row-gap-3">
                    <div className="form-group">
                        <label htmlFor="nombre_torneo">Nombre del torneo</label>
                        <input
                            type="text"
                            id="nombre_torneo"
                            name="nombre_torneo"
                            placeholder="Escribe el nombre del torneo"
                            value={torneo.nombre_torneo}
                            onChange={handleChange}
                            required
                            className='border-0 text-white'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lugar_evento">Lugar del evento</label>
                        <input
                            type="text"
                            id="lugar_evento"
                            name="lugar_evento"
                            placeholder="Ej. San Antonio"
                            value={torneo.lugar_evento}
                            onChange={handleChange}
                            required
                            className='border-0 text-white'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoria_genero">Categoría/Género</label>
                        <select
                            id="categoria_genero"
                            name="categoria_genero"
                            value={torneo.categoria_genero}
                            onChange={handleChange}
                            className='border-0 text-white'
                            required
                        >
                            <option value="">Elige una categoría o género</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="mixto">Mixto</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha_inicio">Fecha de inicio</label>
                        <input
                            type="date"
                            id="fecha_inicio"
                            name="fecha_inicio"
                            value={torneo.fecha_inicio}
                            onChange={handleChange}
                            required
                            className='border-0 text-white'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha_fin">Fecha de finalización</label>
                        <input
                            type="date"
                            id="fecha_fin"
                            name="fecha_fin"
                            value={torneo.fecha_fin}
                            onChange={handleChange}
                            required
                            className='border-0 text-white'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            placeholder="Ej. Las reglas del torneo son..."
                            value={torneo.descripcion || ''}
                            onChange={handleChange}
                            className='border-0 text-white'
                        ></textarea>
                    </div>
                </div>
                <div className="button-group">
                    {isLoading ? (
                        <button type="submit" className="button button-success" disabled={isLoading}>
                            {params.id ? 'Editando torneo...' : 'Creando torneo...'}
                        </button>
                    ) : (
                        <button type="submit" className="button button-primary">{params.id ? 'Editar torneo' : 'Crear torneo'}</button>
                    )}
                    <Link href="/dashboard/torneo">
                        <button type="button" className="button button-secondary">Cancelar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CrearTorneo;

