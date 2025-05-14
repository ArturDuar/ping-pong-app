import JugadoresForm from "../../components/JugadoresForm";
import { useJugadorContext } from "../../contexts/JugadorContext";
import Dashboard from "../../layout/Dashboard";

const JugadorCrear = () => {
    const { createJugador } = useJugadorContext();

    const handleCreate = async (data) => {
        return await createJugador(data);
    };

    return (
        <Dashboard>
            <JugadoresForm tipo="crear" onSubmit={handleCreate} />
        </Dashboard>
    );
};

export default JugadorCrear;
