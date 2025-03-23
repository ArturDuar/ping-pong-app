
export const getJugadores = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/v1/jugador', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log('Datos de jugadores:', data);

        if (!response.ok) {
            console.log('Error en la respuesta:', data.message);
            return [];
        }

        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {  
        console.log('Error al obtener jugadores:', error.message);
        return [];
    }
}

export const getJugadorbyId = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/v1/jugador/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log('Datos de jugador:', data);

        if (!response.ok) {
            console.log('Error en la respuesta:', data.message);
            return [];
        }

        return data;
    } catch (error) {
        console.log('Error al obtener jugador:', error.message);
        return [];
    }
}

export const deleteJugador = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/v1/jugador/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log('Datos:', data);

        if (!response.ok) {
            console.log('Error en la respuesta:', data.message);
            return [];
        }

        return data;
    } catch (error) {
        console.log('Error al obtener jugador:', error.message);
        return [];
    }
}

export const saveJugador = async (nombre_jugador, genero, enlace_fotografia, fecha_nacimiento, nacionalidad) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/v1/jugador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombre_jugador, genero, enlace_fotografia, fecha_nacimiento, nacionalidad })
        });

        const data = await response.json();
        console.log('Datos:', data);

        if (!response.ok) {
            console.log('Error en la respuesta:', data.message);
            return [];
        }

        return data.data;
    } catch (error) {
        console.log('Error al obtener jugador:', error.message);
        return [];
    }
}

export const updateJugador = async (id, nombre_jugador, genero, enlace_fotografia, fecha_nacimiento, nacionalidad) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/v1/jugador/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombre_jugador, genero, enlace_fotografia, fecha_nacimiento, nacionalidad })
        });

        const data = await response.json();
        console.log('Datos:', data);

        if (!response.ok) {
            console.log('Error en la respuesta:', data.message);
            return [];
        }

        return data.data;
    } catch (error) {
        console.log('Error al obtener jugador:', error.message);
        return [];
    }
}