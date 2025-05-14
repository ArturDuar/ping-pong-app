import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useJugadorContext } from "../../contexts/JugadorContext";
import JugadoresForm from "../../components/JugadoresForm";
import Dashboard from "../../layout/Dashboard";

const JugadorEditar = () => {
    const { id } = useParams();
    const { getById, updateJugador } = useJugadorContext();
    const [jugador, setJugador] = useState(null);

    useEffect(() => {
        const fetchJugador = async () => {
            const data = await getById(id);
            setJugador(data);
        };
        fetchJugador();
    }, [id]);

    const handleUpdate = async (formData) => {
        console.log('formData:', formData);
        if(window.confirm('¿Estás seguro de que deseas editar este jugador?')) {
            return await updateJugador(id, formData);
        }
    };

    return (
        jugador ? (
            <Dashboard>
                <JugadoresForm tipo="editar" jugadorInicial={jugador} onSubmit={handleUpdate} />
            </Dashboard>
        ) : (
            <p className="text-center mt-5">Cargando jugador...</p>
        )
    );
};

export default JugadorEditar;
