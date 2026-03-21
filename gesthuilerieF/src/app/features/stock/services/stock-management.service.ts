import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { StockMovement } from '../models/stock.models';
import { StockMovementService } from './stock-movement.service';

export interface StockFilter {
  type?: StockMovement['typeMouvement'] | 'ALL';
  referenceId?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class StockManagementService {
  private readonly movementsSubject = new BehaviorSubject<StockMovement[]>([]);
  private initialized = false;

  readonly movements$ = this.movementsSubject.asObservable();

  constructor(private stockMovementService: StockMovementService) {}

  loadInitialData(): Observable<void> {
    if (this.initialized) {
      return of(void 0);
    }

    return this.stockMovementService.getMock().pipe(
      take(1),
      map(data => {
        this.movementsSubject.next([...data]);
        this.initialized = true;
        return void 0;
      }),
    );
  }

  createMovement(payload: Omit<StockMovement, 'id'>): void {
    const nextId = Math.max(...this.movementsSubject.value.map(item => item.id), 0) + 1;
    const created: StockMovement = {
      ...payload,
      id: nextId,
    };

    this.movementsSubject.next([created, ...this.movementsSubject.value]);
  }

  updateMovement(id: number, payload: Partial<StockMovement>): void {
    const next = this.movementsSubject.value.map(item =>
      item.id === id ? { ...item, ...payload, id: item.id } : item,
    );
    this.movementsSubject.next(next);
  }

  deleteMovement(id: number): void {
    this.movementsSubject.next(this.movementsSubject.value.filter(item => item.id !== id));
  }

  getFilteredMovements(filter: StockFilter): Observable<StockMovement[]> {
    return this.movements$.pipe(
      map(items =>
        items.filter(item => {
          const typeMatch = !filter.type || filter.type === 'ALL' || item.typeMouvement === filter.type;
          const refMatch = !filter.referenceId || item.referenceId === filter.referenceId;
          return typeMatch && refMatch;
        }),
      ),
    );
  }
}
