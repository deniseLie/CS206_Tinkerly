import api from './api';
import { Service } from '../types/interface';

// Fetch all services
export const fetchServices = async (): Promise<Service[]> => {
    const response = await api.get('/services');
    return response.data;
};

// Fetch a specific service by ID
export const fetchServiceById = async (id: number): Promise<Service> => {
    const response = await api.get(`/services/${id}`);
    return response.data;
};

// Create a new service
export const createService = async (body) => {
    const response = await api.post('/services', body);
    return response.data;
};

// Update a service
export const updateService = async (id: number, service: Partial<Service>): Promise<Service> => {
    const response = await api.put(`/services/${id}`, service);
    return response.data;
};

// Delete a service
export const deleteService = async (id: number): Promise<void> => {
    await api.delete(`/services/${id}`);
};
