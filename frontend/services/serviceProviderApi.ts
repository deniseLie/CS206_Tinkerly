import api from './api';
import { ServiceProvider } from '../types/interface';

export const fetchServiceProviders = async (): Promise<ServiceProvider[]> => {
    try {
        const response = await api.get('/service-providers');
        return response.data;
    } catch (error) {
        console.error('Error fetching service providers:', error);
        // If error is a network issue
        if (error.response) {
            console.error('Response error:', error.response);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        return [];
    }
};

// Fetch a single service provider by ID
export const fetchServiceProviderById = async (id: string): Promise<ServiceProvider> => {
    const response = await api.get(`/service-providers/${id}`);
    return response.data;
};