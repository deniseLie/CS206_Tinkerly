import axios from 'axios';
import { API_BASE_URL } from '@env';

console.log("API>TS ", API_BASE_URL)

// Create an Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,  
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
