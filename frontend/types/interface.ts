
// BOOK / SERVICE
export interface Service {
    typeID: number;             // Renamed from serviceID
    description: string;
    serviceType?: string;       // Optional, since it's not in JSON
    finalPrice: number;         // Renamed from basePrice
    date: Date;                 // Should be stored as Date
    time: string;
    extraRequirement: string;   // New field
    customerID: number;         // New field
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
    serviceID: number;
}

export interface Customer {
    customerID: number;
    name: string;
    address: string;
    bankAccount: string;
    phoneNumber: string;
}