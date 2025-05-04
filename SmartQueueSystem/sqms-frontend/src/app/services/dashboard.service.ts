import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { DashboardStats } from '../models/dashboard.model';
import { Organization } from '../models/organization.model';
import { ServiceType } from '../models/service-type.model';
import { Token } from '../models/token.model';
import { Counter } from '../models/counter.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<{
    organizations: Organization[];
    serviceTypes: ServiceType[];
    tokens: Token[];
    counters: Counter[];
  }> {
    return forkJoin({
      organizations: this.http.get<Organization[]>(`${this.apiUrl}/organizations`),
      serviceTypes: this.http.get<ServiceType[]>(`${this.apiUrl}/service-types`),
      tokens: this.http.get<Token[]>(`${this.apiUrl}/tokens`),
      counters: this.http.get<Counter[]>(`${this.apiUrl}/counters`)
    });
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }

  getRecentActivity(limit: number = 5): Observable<Token[]> {
    return this.http.get<Token[]>(`${this.apiUrl}/recent?limit=${limit}`);
  }
}