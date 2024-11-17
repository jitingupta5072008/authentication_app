import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/auth' });

// Add token to request headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers['x_auth_token'] = token;
    return config;
});

export default API;