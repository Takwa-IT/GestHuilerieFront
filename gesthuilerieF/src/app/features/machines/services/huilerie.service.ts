import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Huilerie, EXAMPLE_HUILERIES_JSON } from '../models/enterprise.models';

@Injectable({
  providedIn: 'root',
})
export class HuilerieService {
  private readonly apiUrl = 'http://localhost:8069/api/huileries';

  constructor(private http: HttpClient) {}

  // Example REST call: GET /api/huileries
  getAll(): Observable<Huilerie[]> {
    return this.http.get<Huilerie[]>(this.apiUrl);
  }

  // Local mock data for UI prototyping.
  getMock(): Observable<Huilerie[]> {
    return of([...EXAMPLE_HUILERIES_JSON]);
  }

  // Example REST call: POST /api/huileries
  create(payload: Omit<Huilerie, 'idHuilerie'>): Observable<Huilerie> {
    return this.http.post<Huilerie>(this.apiUrl, payload);
  }

  // Example REST call: PUT /api/huileries/:id
  update(idHuilerie: number, payload: Partial<Huilerie>): Observable<Huilerie> {
    return this.http.put<Huilerie>(`${this.apiUrl}/${idHuilerie}`, payload);
  }

  // Example REST call: PATCH /api/huileries/:id/status
  toggleStatus(idHuilerie: number, active: boolean): Observable<Huilerie> {
    return this.http.patch<Huilerie>(`${this.apiUrl}/${idHuilerie}/status`, { active });
  }
}