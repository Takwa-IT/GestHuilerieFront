import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LotOlives } from '../models/lot.models';

@Injectable({
  providedIn: 'root',
})
export class LotOlivesService {
  private apiUrl = 'http://localhost:8069/api/lots';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LotOlives[]> {
    return this.http.get<LotOlives[]>(this.apiUrl);
  }

  getMock(): Observable<LotOlives[]> {
    return of([
      {
        idLot: 31,
        varieteOlive: 'Picholine Morocaine',
        maturite: 'Vert tendre',
        origine: 'Meknes',
        dateRecolte: '2026-03-10',
        dateReception: '2026-03-11',
        dureeStockageAvantBroyage: 2,
        quantiteInitiale: 11000,
        quantiteRestante: 9200,
        matierePremiereId: 1,
        campagneId: 2026,
      },
      {
        idLot: 32,
        varieteOlive: 'Arbequina',
        maturite: 'Noir',
        origine: 'Marrakech',
        dateRecolte: '2026-03-08',
        dateReception: '2026-03-09',
        dureeStockageAvantBroyage: 3,
        quantiteInitiale: 8500,
        quantiteRestante: 8500,
        matierePremiereId: 2,
        campagneId: 2026,
      },
      {
        idLot: 33,
        varieteOlive: 'Frantoio',
        maturite: 'Veraison',
        origine: 'Atlas',
        dateRecolte: '2026-03-12',
        dateReception: '2026-03-13',
        dureeStockageAvantBroyage: 1,
        quantiteInitiale: 12500,
        quantiteRestante: 12500,
        matierePremiereId: 1,
        campagneId: 2026,
      },
    ]);
  }

  create(lot: Omit<LotOlives, 'idLot'>): Observable<LotOlives> {
    return this.http.post<LotOlives>(this.apiUrl, lot);
  }

  update(id: number, lot: Partial<LotOlives>): Observable<LotOlives> {
    return this.http.put<LotOlives>(`${this.apiUrl}/${id}`, lot);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
