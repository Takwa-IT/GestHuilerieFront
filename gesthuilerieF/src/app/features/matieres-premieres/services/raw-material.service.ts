import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatierePremiere, EXAMPLE_MATIERE_PREMIERE_JSON } from '../models/raw-material.models';

@Injectable({
  providedIn: 'root',
})
export class RawMaterialService {
  private readonly apiUrl = 'http://localhost:8069/api/matieres-premieres';

  constructor(private http: HttpClient) {}

  // Example REST call: GET /api/matieres-premieres
  getAll(): Observable<MatierePremiere[]> {
    return this.http.get<MatierePremiere[]>(this.apiUrl);
  }

  getMock(): Observable<MatierePremiere[]> {
    return of([...EXAMPLE_MATIERE_PREMIERE_JSON]);
  }

  // Example REST call: POST /api/matieres-premieres
  create(payload: Omit<MatierePremiere, 'idMatierePremiere'>): Observable<MatierePremiere> {
    return this.http.post<MatierePremiere>(this.apiUrl, payload);
  }

  // Example REST call: PUT /api/matieres-premieres/:id
  update(idMatierePremiere: number, payload: Partial<MatierePremiere>): Observable<MatierePremiere> {
    return this.http.put<MatierePremiere>(`${this.apiUrl}/${idMatierePremiere}`, payload);
  }

  // Example REST call: DELETE /api/matieres-premieres/:id
  delete(idMatierePremiere: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idMatierePremiere}`);
  }
}