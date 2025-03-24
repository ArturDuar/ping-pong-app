export const getTorneos = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/v1/torneo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log('Datos de torneos:', data);

        if (!response.ok) {
            console.log('Error en la respuesta:', data.message);
            return [];
        }

        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.log('Error al obtener torneos:', error.message);
        return [];
    }
};

export const getTorneobyId = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/v1/torneo/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log('Datos de torneo:', data);

        if (!response.ok) {
            console.log('Error en la respuesta:', data.message);
            return [];
        }

        return data;
    } catch (error) {
        console.log('Error al obtener torneo:', error.message);
        return [];
    }
};

export const deleteTorneo = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/v1/torneo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido');
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const saveTorneo = async (nombre_torneo, descripcion, lugar_evento, fecha_inicio, fecha_fin, categoria_genero) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/v1/torneo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombre_torneo, descripcion, lugar_evento, fecha_inicio, fecha_fin, categoria_genero })
        });

        const data = await response.json();
        console.log('Datos:', data);

        if (!response.ok) {
            console.log('Error en la respuesta:', data.message);
            return [];
        }

        return data;
    } catch (error) {
        console.log('Error al obtener torneo:', error.message);
        return [];
    }
}

export const updateTorneo = async (id, nombre_torneo, descripcion, lugar_evento, fecha_inicio, fecha_fin, categoria_genero) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/v1/torneo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombre_torneo, descripcion, lugar_evento, fecha_inicio, fecha_fin, categoria_genero })
        });

        const data = await response.json();
        console.log('Datos:', data);

        if (!response.ok) {
            console.log('Error en la respuesta:', data.message);
            return [];
        }

        return data.data;
    } catch (error) {
        console.log('Error al obtener torneo:', error.message);
        return [];
    }
}