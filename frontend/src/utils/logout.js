import api from '../services/api';

export const logout = (navigate) => {
    // Remove token from storage
    localStorage.removeItem('token');

    // Remove token from axios headers
    delete api.defaults.headers.common['Authorization'];

    // Redirect to home
    navigate('/');
};
