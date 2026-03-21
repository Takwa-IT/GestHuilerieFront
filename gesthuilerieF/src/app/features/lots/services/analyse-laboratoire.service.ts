import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { AnalyseLaboratoire } from '../models/lot.models';

@Injectable({
  providedIn: 'root',
})
export class AnalyseLaboratoireService {
  private apiUrl = 'http://localhost:8069/api/analyses-laboratoire';
  private readonly analysesSubject = new BehaviorSubject<AnalyseLaboratoire[]>([]);
  private initialized = false;

  constructor(private http: HttpClient) {}

  readonly analyses$ = this.analysesSubject.asObservable();

  getAll(): Observable<AnalyseLaboratoire[]> {
    return this.http.get<AnalyseLaboratoire[]>(this.apiUrl);
  }

  getByLot(lotId: number): Observable<AnalyseLaboratoire[]> {
    return this.http.get<AnalyseLaboratoire[]>(`${this.apiUrl}?lotId=${lotId}`);
  }

  loadMockStore(): Observable<void> {
    if (this.initialized) {
      return of(void 0);
    }

    return this.getMock().pipe(
      take(1),
      map(data => {
        this.analysesSubject.next([...data]);
        this.initialized = true;
        return void 0;
      }),
    );
  }

  getByLotFromStore(lotId: number): Observable<AnalyseLaboratoire[]> {
    return this.loadMockStore().pipe(
      map(() => this.analysesSubject.value.filter(item => item.lotId === lotId)),
    );
  }

  addToStore(payload: Omit<AnalyseLaboratoire, 'idAnalyse' | 'classeQualiteFinale' | 'dateAnalyse'>): Observable<AnalyseLaboratoire> {
    return this.loadMockStore().pipe(
      map(() => {
        const nextId = Math.max(...this.analysesSubject.value.map(item => item.idAnalyse), 0) + 1;
        const created: AnalyseLaboratoire = {
          idAnalyse: nextId,
          lotId: payload.lotId,
          acidite: payload.acidite,
          indicePeroxyde: payload.indicePeroxyde,
          k232: payload.k232,
          k270: payload.k270,
          classeQualiteFinale: this.classifyQuality(
            payload.acidite,
            payload.indicePeroxyde,
            payload.k232,
            payload.k270,
          ),
          dateAnalyse: new Date().toISOString().split('T')[0],
        };

        this.analysesSubject.next([created, ...this.analysesSubject.value]);
        return created;
      }),
    );
  }

  getMock(): Observable<AnalyseLaboratoire[]> {
    return of([
      {
        idAnalyse: 1,
        acidite: 0.62,
        indicePeroxyde: 8.5,
        k232: 1.95,
        k270: 0.18,
        classeQualiteFinale: 'A-',
        dateAnalyse: '2026-03-11',
        lotId: 31,
      },
      {
        idAnalyse: 2,
        acidite: 0.70,
        indicePeroxyde: 9.2,
        k232: 2.10,
        k270: 0.22,
        classeQualiteFinale: 'B+',
        dateAnalyse: '2026-03-10',
        lotId: 32,
      },
      {
        idAnalyse: 3,
        acidite: 0.55,
        indicePeroxyde: 7.8,
        k232: 1.85,
        k270: 0.16,
        classeQualiteFinale: 'A',
        dateAnalyse: '2026-03-14',
        lotId: 33,
      },
    ]);
  }

  create(analysis: Omit<AnalyseLaboratoire, 'idAnalyse'>): Observable<AnalyseLaboratoire> {
    return this.http.post<AnalyseLaboratoire>(this.apiUrl, analysis);
  }

  update(id: number, analysis: Partial<AnalyseLaboratoire>): Observable<AnalyseLaboratoire> {
    return this.http.put<AnalyseLaboratoire>(`${this.apiUrl}/${id}`, analysis);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  classifyQuality(acidite: number, indicePeroxyde: number, k232: number, k270: number): string {
    // Simple classification logic based on quality parameters
    if (acidite > 0.8 || indicePeroxyde > 15) {
      return 'C';
    }
    if (acidite > 0.7 || indicePeroxyde > 10) {
      return 'B';
    }
    if (acidite > 0.6 || indicePeroxyde > 8.5) {
      return 'B+';
    }
    if (k232 > 2.5 || k270 > 0.25) {
      return 'B';
    }
    return 'A';
  }
}
