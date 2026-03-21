import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TraceabilityEvent, EXAMPLE_TRACEABILITY_JSON } from '../models/lot.models';

@Injectable({
  providedIn: 'root',
})
export class TraceabilityService {
  private readonly apiUrl = 'http://localhost:8069/api/traceability';

  constructor(private http: HttpClient) {}

  // Example REST call: GET /api/traceability/lots/:lotId
  getLotLifecycle(lotId: number): Observable<TraceabilityEvent[]> {
    return this.http.get<TraceabilityEvent[]>(`${this.apiUrl}/lots/${lotId}`);
  }

  getMockLotLifecycle(): Observable<TraceabilityEvent[]> {
    return of([...EXAMPLE_TRACEABILITY_JSON]);
  }
}