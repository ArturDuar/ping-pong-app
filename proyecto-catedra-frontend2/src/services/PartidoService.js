const API_URL = 'http://localhost:8000/api/v1/torneo';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const partidoService = {
  getAll: async (id) => {
    const res = await fetch(`${API_URL}/${id}/partidos`, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener torneos');
    return data.data;
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/partidos/${id}`, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener torneo');
    return data.data;
  },

  generarPartidos: async (id) => {
    const res = await fetch(`${API_URL}/${id}/partidos/`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al generar partidos');
    return data.data;
  },

  syncSeries: async (id, series) => {
    const response = await fetch(`${API_URL}/partidos/${id}/series`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ series }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al sincronizar series");
    }

    return await response.json();
  },

}