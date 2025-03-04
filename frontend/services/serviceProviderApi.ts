import api from './api';
import { ServiceProvider } from '../types/interface';

// Fetch all service providers
export const fetchServiceProviders = async (): Promise<ServiceProvider[]> => {
    const response = await api.get('/service-providers');
    return response.data;
};

// Fetch a single service provider by ID
export const fetchServiceProviderById = async (id: string): Promise<ServiceProvider> => {
    const response = await api.get(`/service-providers/${id}`);
    return response.data;
};