import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pesee, EXAMPLE_PESEE_JSON } from '../models/stock.models';

@Injectable({
  providedIn: 'root',
})
export class WeighingService {
  private readonly apiUrl = 'http://localhost:8069/api/pesees';

  constructor(private http: HttpClient) {}

  // Example REST call: GET /api/pesees
  getAll(): Observable<Pesee[]> {
    return this.http.get<Pesee[]>(this.apiUrl);
  }

  getMock(): Observable<Pesee[]> {
    return of([...EXAMPLE_PESEE_JSON]);
  }

  // Example REST call: POST /api/pesees
  create(payload: Omit<Pesee, 'idPesee'>): Observable<Pesee> {
    return this.http.post<Pesee>(this.apiUrl, payload);
  }
}