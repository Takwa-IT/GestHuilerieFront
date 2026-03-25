import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalyseLaboratoire } from '../models/lot.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyseLaboratoireService {
  private readonly apiUrl = `${environment.apiUrl}/analysesLaboratoire`;

  constructor(private http: HttpClient) { }

  getByLot(lotId: number): Observable<AnalyseLaboratoire[]> {
    return this.http.get<AnalyseLaboratoire[]>(`${this.apiUrl}/lot/${lotId}`);
  }

  addToStore(payload: {
    lotId: number;
    acidite: number;
    indicePeroxyde: number;
    k232: number;
    k270: number;
    classeQualiteFinale?: string;
    dateAnalyse?: string;
  }): Observable<AnalyseLaboratoire> {
    return this.http.post<AnalyseLaboratoire>(this.apiUrl, payload);
  }
}