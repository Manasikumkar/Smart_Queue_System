import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Counter } from '../models/counter.model';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private baseUrl = 'http://localhost:8080/api/counters';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Counter[]> {
    return this.http.get<Counter[]>(this.baseUrl);
  }

  create(counter: Counter): Observable<Counter> {
    return this.http.post<Counter>(this.baseUrl, counter);
  }

  getById(id: number): Observable<Counter> {
    return this.http.get<Counter>(`${this.baseUrl}/${id}`);
  }

  update(id: number, counter: Counter): Observable<Counter> {
    return this.http.put<Counter>(`${this.baseUrl}/${id}`, counter);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}