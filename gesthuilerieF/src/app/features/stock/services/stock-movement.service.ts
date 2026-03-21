import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StockMovement, EXAMPLE_STOCK_MOVEMENT_JSON } from '../models/stock.models';

@Injectable({
  providedIn: 'root',
})
export class StockMovementService {
  private readonly apiUrl = 'http://localhost:8069/api/stocks/mouvements';

  constructor(private http: HttpClient) {}

  // Example REST call: GET /api/stocks/mouvements
  getAll(): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(this.apiUrl);
  }

  getMock(): Observable<StockMovement[]> {
    return of([...EXAMPLE_STOCK_MOVEMENT_JSON]);
  }

  // Example REST call: POST /api/stocks/mouvements
  create(payload: Omit<StockMovement, 'id'>): Observable<StockMovement> {
    return this.http.post<StockMovement>(this.apiUrl, payload);
  }
}