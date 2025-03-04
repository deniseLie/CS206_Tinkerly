export interface Service {
    serviceID: number;
    description: string;
    serviceType: string;
    basePrice: number;
    date: Date;
    time: string;
}

export interface Review {
    reviewID: number;
    rating: number;
    comments: string;
}