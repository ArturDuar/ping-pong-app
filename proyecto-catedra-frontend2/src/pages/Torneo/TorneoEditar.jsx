import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTorneoContext } from "../../contexts/TorneoContext";
import TorneosForm from "../../components/TorneosForm";
import Dashboard from "../../layout/Dashboard";

const TorneoEditar = () => {
  const { id } = useParams();
  const { getById, updateTorneo } = useTorneoContext();
  const [torneo, setTorneo] = useState(null);

  useEffect(() => {
    const fetchTorneo = async () => {
      const data = await getById(id);
      setTorneo(data);
    };
    fetchTorneo();
  }, [id]);

  const handleUpdate = async (formData) => {
    if (window.confirm("¿Estás seguro de que deseas editar este torneo?")) {
      return await updateTorneo(id, formData);
    }
  };

  return torneo ? (
    <Dashboard>
      <TorneosForm
        tipo="editar"
        torneoInicial={torneo}
        onSubmit={handleUpdate}
      />
    </Dashboard>
  ) : (
    <p className="text-center mt-5">Cargando torneo...</p>
  );
};

export default TorneoEditar;
