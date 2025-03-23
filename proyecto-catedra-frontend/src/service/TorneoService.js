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
            throw new Error(data.message || 'Error desconocido');
        }

        if(Array.isArray(data.data)){
            return data.data;
        } else if(data.message){

            return data.message;
        }

    } catch (error) {
        return (error.message);
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

        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido');
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
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