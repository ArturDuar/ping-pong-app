const API_URL_TORNEO = 'http://localhost:8000/api/v1/torneo';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const torneoService = {
  getAll: async () => {
    const res = await fetch(API_URL_TORNEO, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener torneos');
    return data.data;
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL_TORNEO}/${id}`, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener torneo');
    return data.data;
  },

  create: async (torneo) => {
    const body = {
      nombre_torneo: torneo.nombre_torneo,
      descripcion: torneo.descripcion,
      lugar_evento: torneo.lugar_evento,
      fecha_inicio: torneo.fecha_inicio,
      fecha_fin: torneo.fecha_fin,
      categoria_genero: torneo.categoria_genero,
    };

    const res = await fetch(API_URL_TORNEO, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) {
      console.log('Errores:', data.errors);
      throw new Error(data.message || 'Error al registrar torneo');
    }

    return data.data;
  },

  update: async (id, torneo) => {
    const body = {
      nombre_torneo: torneo.nombre_torneo,
      descripcion: torneo.descripcion,
      lugar_evento: torneo.lugar_evento,
      fecha_inicio: torneo.fecha_inicio,
      fecha_fin: torneo.fecha_fin,
      categoria_genero: torneo.categoria_genero,
    };

    const res = await fetch(`${API_URL_TORNEO}/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) {
      console.log('Errores:', data.errors);
      throw new Error(data.message || 'Error al actualizar torneo');
    }

    return data.data;
  },

  delete: async (id) => {
    const res = await fetch(`${API_URL_TORNEO}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al eliminar torneo');
    return data;
  }
};
