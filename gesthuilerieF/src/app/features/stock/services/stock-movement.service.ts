import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMovement } from '../models/stock.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockMovementService {
  private readonly apiUrl = `${environment.apiUrl}/stockMovements`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(this.apiUrl);
  }

  getByHuilerie(huilerieId: number): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.apiUrl}/huilerie/${huilerieId}`);
  }

  create(payload: {
    huilerieId: number;
    referenceId: number;
    quantite: number;
    commentaire: string;
    dateMouvement: string;
    typeMouvement: StockMovement['typeMouvement'];
  }): Observable<StockMovement> {
    return this.http.post<StockMovement>(this.apiUrl, payload);
  }

  updateTypeMouvement(
    id: number,
    typeMouvement: StockMovement['typeMouvement'],
    quantite: number,
): Observable<StockMovement> {
    return this.http.patch<StockMovement>(`${this.apiUrl}/${id}/type`, {
      typeMouvement,
      quantite,
    });
  }
}