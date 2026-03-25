import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pesee, ReceptionPeseeCreatePayload, Stock } from '../models/stock.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeighingService {
  private readonly apiUrl = `${environment.apiUrl}/pesees`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pesee[]> {
    return this.http.get<Pesee[]>(this.apiUrl);
  }

  findById(idPesee: number): Observable<Pesee> {
    return this.http.get<Pesee>(`${this.apiUrl}/${idPesee}`);
  }

  createReception(payload: ReceptionPeseeCreatePayload): Observable<Pesee> {
    return this.http.post<Pesee>(this.apiUrl, payload);
  }

  generateBonPeseePdf(idPesee: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${idPesee}/pdf`, { responseType: 'blob' });
  }
}
