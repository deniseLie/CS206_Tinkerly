import api from './api';
import { Customer } from '../types/customer';

// Fetch all customers
export const fetchCustomers = async (): Promise<Customer[]> => {
    const response = await api.get('/customers');
    return response.data;
};

// Fetch a single customer by ID
export const fetchCustomerById = async (id: string): Promise<Customer> => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
};