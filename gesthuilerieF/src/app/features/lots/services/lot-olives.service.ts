import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LotOlives } from '../models/lot.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LotOlivesService {
  private readonly apiUrl = `${environment.apiUrl}/lots`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<LotOlives[]> {
    return this.http.get<LotOlives[]>(this.apiUrl);
  }

  findById(idLot: number): Observable<LotOlives> {
    return this.http.get<LotOlives>(`${this.apiUrl}/${idLot}`);
  }
}