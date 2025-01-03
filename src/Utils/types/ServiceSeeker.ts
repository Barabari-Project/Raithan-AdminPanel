export interface IServiceSeekers {
    _id: string;
    name: string;
    mobileNumber: string;
    status: string;
  }
  
 export interface IServiceSeekers_CallHistory {
    _id: string;
    serviceSeekerMobileNumber: string;
    serviceProviderMobileNumber: string;
    serviceSeeker: string;
    serviceProvider: string;
    createdAt: string;
    updatedAt: string;
  }