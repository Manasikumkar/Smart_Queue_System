import { Organization } from './organization.model';

export interface Counter {
  id?: number;
  counterNumber: string;
  organization: Organization;
  staffName: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  currentTokenId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}