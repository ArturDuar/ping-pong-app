
const API_URL = 'http://localhost:8000/api/v1';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.name);
    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUser = async() => {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/me`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) {
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    throw error;
  }
};
