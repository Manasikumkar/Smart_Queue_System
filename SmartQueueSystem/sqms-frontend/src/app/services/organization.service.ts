import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization.model';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private baseUrl = 'http://localhost:8080/api/organizations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.baseUrl);
  }

  getById(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${this.baseUrl}/${id}`);
  }

  create(org: Organization): Observable<Organization> {
    return this.http.post<Organization>(this.baseUrl, org);
  }

  update(id: number, org: Organization): Observable<Organization> {
    return this.http.put<Organization>(`${this.baseUrl}/${id}`, org);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  search(query: string): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.baseUrl}/search?name=${query}`);
  }
}