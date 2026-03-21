import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map, of, switchMap, take, throwError } from 'rxjs';
import { LotOlives } from '../models/lot.models';
import { LotOlivesService } from './lot-olives.service';
import { Pesee, StockMovement } from '../../stock/models/stock.models';
import { WeighingService } from '../../stock/services/weighing.service';
import { StockMovementService } from '../../stock/services/stock-movement.service';

export interface CreatePeseeInput {
  datePesee: string;
  poidsBrut: number;
  poidsTare: number;
  huilerieId: number;
  lotMode: 'existing' | 'new';
  existingLotId?: number;
  origine: string;
  varieteOlive: string;
  newLotDetails?: {
    maturite: string;
    dateRecolte: string;
    dateReception: string;
    dureeStockageAvantBroyage: number;
    matierePremiereId: number;
    campagneId: number;
  };
}

export interface CreatePeseeResult {
  pesee: Pesee;
  lot: LotOlives;
  movement: StockMovement;
}

@Injectable({
  providedIn: 'root',
})
export class LotManagementService {
  private readonly lotsSubject = new BehaviorSubject<LotOlives[]>([]);
  private readonly weighingsSubject = new BehaviorSubject<Pesee[]>([]);
  private readonly movementsSubject = new BehaviorSubject<StockMovement[]>([]);
  private initialized = false;

  readonly lots$ = this.lotsSubject.asObservable();
  readonly weighings$ = this.weighingsSubject.asObservable();
  readonly movements$ = this.movementsSubject.asObservable();

  constructor(
    private lotOlivesService: LotOlivesService,
    private weighingService: WeighingService,
    private stockMovementService: StockMovementService,
  ) {}

  loadInitialData(): Observable<void> {
    return this.ensureInitialized().pipe(map(() => void 0));
  }

  getLotById(lotId: number): Observable<LotOlives | undefined> {
    return this.ensureInitialized().pipe(
      map(() => this.lotsSubject.value.find(lot => lot.idLot === lotId)),
    );
  }

  getPeseesForLot(lotId: number): Observable<Pesee[]> {
    return this.ensureInitialized().pipe(
      map(() => this.weighingsSubject.value.filter(pesee => pesee.lotId === lotId)),
    );
  }

  calculatePoidsNet(poidsBrut: number, poidsTare: number): number {
    return Math.max(0, poidsBrut - poidsTare);
  }

  createPesee(input: CreatePeseeInput): Observable<CreatePeseeResult> {
    return this.ensureInitialized().pipe(
      switchMap(() => {
        const poidsBrut = Number(input.poidsBrut);
        const poidsTare = Number(input.poidsTare);
        const poidsNet = this.calculatePoidsNet(poidsBrut, poidsTare);

        if (poidsBrut < 0 || poidsTare < 0) {
          return throwError(() => new Error('Les poids ne peuvent pas etre negatifs.'));
        }

        if (poidsNet <= 0) {
          return throwError(() => new Error('Le poids net doit etre strictement positif.'));
        }

        const normalizedOrigine = this.normalize(input.origine);
        const normalizedVariete = this.normalize(input.varieteOlive);

        let selectedLot: LotOlives;

        if (input.lotMode === 'existing') {
          if (!input.existingLotId) {
            return throwError(() => new Error('Veuillez selectionner un lot existant.'));
          }

          const existing = this.lotsSubject.value.find(lot => lot.idLot === input.existingLotId);
          if (!existing) {
            return throwError(() => new Error('Lot introuvable.'));
          }

          if (
            this.normalize(existing.origine) !== normalizedOrigine ||
            this.normalize(existing.varieteOlive) !== normalizedVariete
          ) {
            return throwError(() => new Error('Origine et variete doivent correspondre au lot selectionne.'));
          }

          selectedLot = {
            ...existing,
            quantiteInitiale: existing.quantiteInitiale + poidsNet,
            quantiteRestante: existing.quantiteRestante + poidsNet,
          };
        } else {
          if (!input.newLotDetails) {
            return throwError(() => new Error('Les informations du nouveau lot sont requises.'));
          }

          const newLotId = Math.max(...this.lotsSubject.value.map(lot => lot.idLot), 0) + 1;
          selectedLot = {
            idLot: newLotId,
            varieteOlive: input.varieteOlive,
            origine: input.origine,
            maturite: input.newLotDetails.maturite,
            dateRecolte: input.newLotDetails.dateRecolte,
            dateReception: input.newLotDetails.dateReception,
            dureeStockageAvantBroyage: Number(input.newLotDetails.dureeStockageAvantBroyage),
            quantiteInitiale: poidsNet,
            quantiteRestante: poidsNet,
            matierePremiereId: Number(input.newLotDetails.matierePremiereId),
            campagneId: Number(input.newLotDetails.campagneId),
          };
        }

        const newPeseeId = Math.max(...this.weighingsSubject.value.map(item => item.idPesee), 0) + 1;
        const pesee: Pesee = {
          idPesee: newPeseeId,
          datePesee: input.datePesee,
          poidsBrut,
          poidsTare,
          poidsNet,
          lotId: selectedLot.idLot,
          huilerieId: Number(input.huilerieId),
        };

        const newMovementId = Math.max(...this.movementsSubject.value.map(item => item.id), 0) + 1;
        const movement: StockMovement = {
          id: newMovementId,
          huilerieId: Number(input.huilerieId),
          typeMouvement: 'ARRIVAL',
          referenceId: selectedLot.idLot,
          quantite: poidsNet,
          dateMouvement: input.datePesee,
          commentaire: `Entree lot ${selectedLot.idLot} suite pesee ${newPeseeId}`,
        };

        this.upsertLot(selectedLot);
        this.weighingsSubject.next([pesee, ...this.weighingsSubject.value]);
        this.movementsSubject.next([movement, ...this.movementsSubject.value]);

        return of({ pesee, lot: selectedLot, movement });
      }),
    );
  }

  private ensureInitialized(): Observable<boolean> {
    if (this.initialized) {
      return of(true);
    }

    return forkJoin({
      lots: this.lotOlivesService.getMock().pipe(take(1)),
      weighings: this.weighingService.getMock().pipe(take(1)),
      movements: this.stockMovementService.getMock().pipe(take(1)),
    }).pipe(
      map(({ lots, weighings, movements }) => {
        this.lotsSubject.next([...lots]);
        this.weighingsSubject.next([...weighings]);
        this.movementsSubject.next([...movements]);
        this.initialized = true;
        return true;
      }),
    );
  }

  private upsertLot(updated: LotOlives): void {
    const lots = this.lotsSubject.value;
    const index = lots.findIndex(lot => lot.idLot === updated.idLot);

    if (index < 0) {
      this.lotsSubject.next([updated, ...lots]);
      return;
    }

    const nextLots = [...lots];
    nextLots[index] = updated;
    this.lotsSubject.next(nextLots);
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }
}
