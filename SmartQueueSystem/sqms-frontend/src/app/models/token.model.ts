import { ServiceType } from './service-type.model';

export enum TokenStatus {
  WAITING = 'WAITING',
  SERVING = 'SERVING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Token {
  id?: number;
  tokenNumber: string;
  status: TokenStatus;
  serviceType: ServiceType;
  counterId?: number;
  customerName?: string;
  phoneNumber?: string;
  email?: string;
  createdAt: Date;
  calledAt?: Date;
  completedAt?: Date;
  waitingTime?: number; // in minutes
  servingTime?: number; // in minutes
}

// Optional: Builder class for complex token creation
export class TokenBuilder {
  private token: Partial<Token> = {};

  withTokenNumber(tokenNumber: string): TokenBuilder {
    this.token.tokenNumber = tokenNumber;
    return this;
  }

  withServiceType(serviceType: ServiceType): TokenBuilder {
    this.token.serviceType = serviceType;
    return this;
  }

  build(): Token {
    return {
      tokenNumber: this.token.tokenNumber || '',
      status: this.token.status || TokenStatus.WAITING,
      serviceType: this.token.serviceType || {} as ServiceType,
      createdAt: this.token.createdAt || new Date(),
      ...this.token
    } as Token;
  }
}