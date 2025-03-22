import React, { useState } from 'react';
import Link from "next/link";
import '@/app/globals.css';

const CrearJugador = () => {
    return (
        <div className="content my-5 border border-2 rounded container" style={{ backgroundColor: 'var(--card-bg)' }}>
            <h2 className="title">Crear nuevo jugador</h2>
            <div className="row container row-cols-lg-2 row-gap-3">
                <div>
                    <label className="section-label">Nombre Completo del jugador</label>
                    <div className='row row-gap-3 mb-3'>
                        <div className='form-group col-lg-6'>
                            <input type="text" id="primerNombre" placeholder="Primer Nombre" />
                        </div>
                        <div className='form-group col-lg-6'>
                            <input type="text" id="segundoNombre" placeholder="Segundo Nombre" />
                        </div>
                    </div>
                    <div className='row row-gap-3'>
                        <div className="form-group col-lg-6">
                            <input type="text" id="primerApellido" placeholder="Primer Apellido" />
                        </div>
                        <div className="form-group col-lg-6">
                            <input type="text" id="segundoApellido" placeholder="Segundo Apellido" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                        <label htmlFor="lugar">Nacionalidad</label>
                        <input type="text" id="nacionalidades" placeholder="Ej. Salvadoreña" />
                </div>
                <div className="form-group">
                        <label htmlFor="fechanacimiento">Fecha de nacimiento</label>
                        <input type="text" id="fechanacimiento" placeholder="dd/mm/aa" />
                </div>
                <div className="form-group file-upload">
                        <label htmlFor="foto">Fotografía del jugador</label>
                        <input type="file" id="foto" className='form-control rounded-0 file-update-custom' />
                </div>
                
                <div className="form-group">
                    <label htmlFor="genero">Genero</label>
                    <select id="generos">
                        <option value="">Seleccione un genero</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>
            </div>
            <div className="button-group">
                    <Link href="/dashboard/jugador">
                        <button className="button button-primary">Crear jugador</button>
                    </Link>
                    <Link href="/dashboard/jugador">
                        <button className="button button-secondary">Cancelar</button>
                    </Link>
                </div>
        </div>
    );
};

export default CrearJugador;