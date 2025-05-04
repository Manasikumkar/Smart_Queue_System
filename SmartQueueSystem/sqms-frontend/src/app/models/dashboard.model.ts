// src/app/models/dashboard.model.ts

import { Token } from './token.model';
import { Organization } from './organization.model';
import { ServiceType } from './service-type.model';
import { Counter } from './counter.model';

/**
 * Comprehensive dashboard statistics
 */
export interface DashboardStats {
  totalOrganizations: number;
  totalServiceTypes: number;
  totalTokens: number;
  totalCounters: number;
  avgWaitTime: number;                 // in minutes
  recentTokens: DashboardToken[];      // Last 5-10 tokens
  activeOrganizations: Organization[]; // Organizations with recent activity
  tokensByStatus: {                    // Status breakdown
    pending: number;
    processing: number;
    completed: number;
  };
}

/**
 * Enhanced token with UI-specific properties
 */
export interface DashboardToken extends Omit<Token, 'waitingTime'> {
  formattedWaitTime: string;           // "15 mins"
  statusBadgeColor: string;            // Material color (primary/accent/warn)
  estimatedCompletion?: Date;          // Optional time estimate
}

/**
 * Organization with activity metrics
 */
export interface DashboardOrganization extends Organization {
  activeServicesCount: number;
  lastActivity: Date;
  tokensToday: number;
}

/**
 * Dashboard filtering options
 */
export interface DashboardFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: Array<Token['status']>;    // Filter by status array
  organizationId?: string;            // Specific organization
  serviceTypeId?: string;             // Specific service type
}

export type TimeRange = 'today' | 'week' | 'month' | 'custom';

// ✅ Re-export only if needed, and no syntax errors
// Ensure these interfaces are `export`ed from their respective files!
export type { Token } from './token.model';
export type { Organization } from './organization.model';
export type { ServiceType } from './service-type.model';
export type { Counter } from './counter.model';
