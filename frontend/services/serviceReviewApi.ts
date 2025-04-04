import api from './api';
import { ServiceReview } from '../types/serviceReview';


// create a service review
export const createServiceReview = async (body) => {
    const response = await api.post('/service-reviews', body);
    return response.data;
};

// Fetch all service reviews
export const fetchServiceReviews = async (): Promise<ServiceReview[]> => {
    const response = await api.get('/service-reviews');
    return response.data;
};

// Fetch a single service review by ID
export const fetchServiceReviewById = async (id: string): Promise<ServiceReview> => {
    const response = await api.get(`/service-reviews/${id}`);
    return response.data;
};

// Get all the Service Reviews of a Service Provider
export const fetchServiceReviewByServiceProviderId = async (id: string): Promise<ServiceReview> => {
    const response = await api.get(`/service-reviews/service-provider/${id}`);
    return response.data;
};