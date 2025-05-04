import { Organization } from './organization.model';

export interface ServiceType {
  id: number;
  name: string;
  description: string;
  organization: Organization;
  averageServiceTime?: number; // in minutes
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}