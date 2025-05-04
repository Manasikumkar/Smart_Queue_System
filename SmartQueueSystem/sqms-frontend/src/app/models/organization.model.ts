export interface Organization {
    id: number;
    name: string;
    type: string;
    address?: string;
    contactEmail?: string;
    phoneNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }