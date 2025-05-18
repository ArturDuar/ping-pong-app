const API_URL = 'http://localhost:8000/api/v1/jugador';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`

});

export const jugadorService = {
  getAll: async () => {
    const res = await fetch(API_URL, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener jugadores');
    return data.data;
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    const data = await res.json();
    console.log('data:', data);
    if (!res.ok) throw new Error(data.message || 'Error al obtener jugador');
    return data.data;
  },

  create: async (jugador) => {

    console.log('jugador:', jugador);

    const formData = new FormData();
    formData.append('nombre_jugador', jugador.nombre_jugador);
    formData.append('nacionalidad', jugador.nacionalidad);
    formData.append('fecha_nacimiento', jugador.fecha_nacimiento);
    formData.append('fotografia', jugador.fotografia);
    formData.append('genero', jugador.genero);

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });

    const data = await res.json();
    if (!res.ok) {
      alert('Error al guardar jugador');
      throw new Error(data.message || 'Error al guardar jugador');
    }
    return data.data;
  },

  update: async (id, jugador) => {

    console.log('jugador:', jugador);

    const formData = new FormData();
    formData.append('nombre_jugador', jugador.nombre_jugador);
    formData.append('nacionalidad', jugador.nacionalidad);
    formData.append('fecha_nacimiento', jugador.fecha_nacimiento);
    formData.append('genero', jugador.genero);
    formData.append('_method', 'PUT');
    if (jugador.fotografia instanceof File) {
      formData.append('fotografia', jugador.fotografia);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0]+ ':', pair[1]);
    }
    
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      console.log('errors:', data.errors);
      throw new Error(data.message || 'Error al actualizar jugador');
    };
    return data.data;
  },

  delete: async (id) => {
    console.log('id:', id);
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al eliminar jugador');
    return data;
  }
};
