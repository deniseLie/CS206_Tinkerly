
// BOOK / SERVICE
export interface Service {
    serviceID: number;
    description: string;
    serviceType: string;
    basePrice: number;
    date: Date;
    time: string;
}

export interface ServiceProvider {
    spID: number;
    name: string;
    address: string;
    phoneNumber: string;
    bankAccount: string;
    rating: number;
}

export interface ServiceReview {
    reviewID: number;
    rating: number;
    comments: string;
}

export interface Customer {
    customerID: number;
    name: string;
    address: string;
    bankAccount: string;
    phoneNumber: string;
}