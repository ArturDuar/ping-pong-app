import React, { useState } from 'react';
import Link from "next/link";
import '@/app/globals.css';


const CrearTorneo = () => {
    const [torneo, setTorneo] = useState({
        nombre: '',
        fecha: '',
        lugar: '',
        descripcion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTorneo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Torneo creado:', torneo);
    };

    return (
        <div className="content my-5 border border-2 rounded" style={{ backgroundColor: 'var(--card-bg)' }}>
            <h2 className="title">Crear nuevo torneo</h2>
            <div className="row container row-cols-lg-2 row-gap-3">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del torneo</label>
                    <input type="text" id="nombre" placeholder="Escribe el nombre del torneo" />
                </div>

                <div className="form-group">
                    <label htmlFor="lugar">Lugar del evento</label>
                    <input type="text" id="lugar" placeholder="Ej. San Antonio" />
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria">
                        <option value="">Elije una categoria</option>
                        <option value="1">Categoría 1</option>
                        <option value="2">Categoría 2</option>
                        <option value="3">Categoría 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fecha-inicio">Fecha de inicio</label>
                    <input type="text" id="fecha-inicio" placeholder="dd/mm/aa" />
                </div>

                <div className="form-group">
                    <label htmlFor="jugadores">Cantidad de jugadores</label>
                    <select id="jugadores">
                        <option value="4">4 Personas</option>
                        <option value="8">8 Personas</option>
                        <option value="16">16 Personas</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fecha-fin">Fecha de finalización</label>
                    <input type="text" id="fecha-fin" placeholder="dd/mm/aa" />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea id="descripcion" placeholder="Ej. Las reglas del torneo son..."></textarea>
                </div>
                <br></br>
            </div>
            <div className='w-100'>
                    <div className="button-group">
                        <Link href="/dashboard/torneo">
                            <button className="button button-primary">Crear Torneo</button>
                        </Link>
                        <Link href="/dashboard/torneo">
                            <button className="button button-secondary">Cancelar</button>
                        </Link>
                    </div>
                </div>
        </div>
    );
};

export default CrearTorneo;