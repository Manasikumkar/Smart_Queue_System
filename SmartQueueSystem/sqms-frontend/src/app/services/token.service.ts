import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token, TokenStatus } from '../models/token.model';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private apiUrl = 'http://localhost:8080/api/tokens';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Token[]> {
    return this.http.get<Token[]>(this.apiUrl);
  }

  create(token: Partial<Token>): Observable<Token> {
    return this.http.post<Token>(this.apiUrl, token);
  }

  updateStatus(id: number, status: TokenStatus): Observable<Token> {
    return this.http.patch<Token>(`${this.apiUrl}/${id}/status`, { status });
  }

  getNextToken(serviceTypeId: number): Observable<Token> {
    return this.http.get<Token>(`${this.apiUrl}/next/${serviceTypeId}`);
  }

  getByStatus(status: TokenStatus): Observable<Token[]> {
    return this.http.get<Token[]>(`${this.apiUrl}?status=${status}`);
  }

  completeService(id: number): Observable<Token> {
    return this.http.patch<Token>(`${this.apiUrl}/${id}/complete`, {});
  }
}