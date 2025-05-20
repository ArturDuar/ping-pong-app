const API_URL = 'http://localhost:8000/api/v1/estadisticas';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const estadisticasService = {
  getAll: async () => {
    const res = await fetch(API_URL, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener estadisticas');
    return data.data;
  },
};