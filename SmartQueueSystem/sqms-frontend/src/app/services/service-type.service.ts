import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceType } from '../models/service-type.model';

@Injectable({ providedIn: 'root' })
export class ServiceTypeService {
  private apiUrl = 'http://localhost:8080/api/service-types';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(this.apiUrl);
  }

  create(serviceType: ServiceType): Observable<ServiceType> {
    return this.http.post<ServiceType>(this.apiUrl, serviceType);
  }

  getById(id: number): Observable<ServiceType> {
    return this.http.get<ServiceType>(`${this.apiUrl}/${id}`);
  }

  update(id: number, serviceType: ServiceType): Observable<ServiceType> {
    return this.http.put<ServiceType>(`${this.apiUrl}/${id}`, serviceType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}