export const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
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

export const logout = async () => {
    try {

        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/v1/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido');
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};