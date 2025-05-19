import TorneosForm from "../../components/TorneosForm";
import { useTorneoContext } from "../../contexts/TorneoContext";
import Dashboard from "../../layout/Dashboard";

const TorneoCrear = () => {
  const { createTorneo } = useTorneoContext();

  const handleCreate = async (data) => {
    return await createTorneo(data);
  };

  return (
    <Dashboard>
      <TorneosForm tipo="crear" onSubmit={handleCreate} />
    </Dashboard>
  );
};

export default TorneoCrear;
