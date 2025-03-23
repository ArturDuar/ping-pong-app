export const register = async (name, email, password) => {


    try {
        const response = await fetch('http://localhost:8000/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user.name);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};