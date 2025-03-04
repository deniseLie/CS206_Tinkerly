import axios from 'axios';
import { API_BASE_URL } from '@env';

// Create an Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,  
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to handle auth tokens if needed
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export default api;
