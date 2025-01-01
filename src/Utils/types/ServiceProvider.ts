
export interface IWorkingDays {
        Monday: boolean;
        Tuesday: boolean;
        Wednesday: boolean;
        Thursday: boolean;
        Friday: boolean;
        Saturday: boolean;
        Sunday: boolean;
    
}
export interface IWorkingTime {
        start: string;
        end: string;
    
}
export interface IBusiness {
    id: string;
    businessName: string;
    businessContactNo: string;
    businessEmail: string;
    pincode: string;
    blockNumber: string;
    street: string;
    area: string;
    landmark?: string;
    city: string;
    state: string;
    serviceProvider: string;
    workingDays: IWorkingDays;
    workingTime: IWorkingTime;
    category: [string];
    createdAt?: string; // not mentioned
    updatedAt?: string; // not mentioned
    __v?: number;
}
export interface IServiceProvidersByID{ // 
    _id: string;
    mobileNumber?: string;
    __v?: number;
    createdAt?: string;
    status?: string;
    updatedAt?: string;
    firstName?: string;
    lastName?: string;
    profilePictureUrl?: string;
    business?: IBusiness;
};

export interface IServiceProviderByStatus{
    _id: string;
    mobileNumber: string;
    __v: number;
    createdAt?: string;
    status?: string;
    updatedAt?: string;
}

export interface IServiceProviders{
    _id: string;
    mobileNumber: string;
    __v: number;
    createdAt?: string;
    status: string;
    updatedAt?: string;
    firstName?: string;
    lastName?: string;
    profilePictureUrl?: string;
    business?:string;
    email?:string;
}