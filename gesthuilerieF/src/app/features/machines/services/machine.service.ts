import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Machine, EXAMPLE_MACHINES_JSON } from '../models/enterprise.models';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private readonly apiUrl = 'http://localhost:8069/api/machines';

  constructor(private http: HttpClient) {}

  // Example REST call: GET /api/machines
  getAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.apiUrl);
  }

  getMock(): Observable<Machine[]> {
    return of([...EXAMPLE_MACHINES_JSON]);
  }

  // Example REST call: POST /api/machines
  create(payload: Omit<Machine, 'idMachine'>): Observable<Machine> {
    return this.http.post<Machine>(this.apiUrl, payload);
  }

  // Example REST call: PUT /api/machines/:id
  update(idMachine: number, payload: Partial<Machine>): Observable<Machine> {
    return this.http.put<Machine>(`${this.apiUrl}/${idMachine}`, payload);
  }

  // Example REST call: DELETE /api/machines/:id
  delete(idMachine: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idMachine}`);
  }
}