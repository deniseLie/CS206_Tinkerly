import api from './api';
import { ServiceReview } from '../types/serviceReview';

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