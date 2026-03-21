import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { Pesee, StockMovement } from '../../models/stock.models';
import { LotOlives } from '../../../lots/models/lot.models';
import { CreatePeseeInput, LotManagementService } from '../../../lots/services/lot-management.service';

@Component({
    selector: 'app-weighing-stock',
    templateUrl: './weighing-stock.component.html',
    styleUrls: ['./weighing-stock.component.scss'],
    standalone: true,
    imports: [
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        NbSelectModule,
        CommonModule,
        ReactiveFormsModule,
    ],
})
export class WeighingStockComponent implements OnInit {
  weighings: Pesee[] = [];
  movements: StockMovement[] = [];
  lots: LotOlives[] = [];
  errorMessage = '';

  readonly weighingForm;

  constructor(
    private formBuilder: FormBuilder,
    private lotManagementService: LotManagementService,
  ) {
    this.weighingForm = this.formBuilder.group({
      datePesee: [new Date().toISOString().slice(0, 16), [Validators.required]],
      poidsBrut: [0, [Validators.required, Validators.min(0)]],
      poidsTare: [0, [Validators.required, Validators.min(0)]],
      poidsNet: [{ value: 0, disabled: true }, [Validators.required]],
      lotMode: ['existing', [Validators.required]],
      existingLotId: [31, [Validators.required]],
      origine: ['Meknes', [Validators.required]],
      varieteOlive: ['Picholine Morocaine', [Validators.required]],
      maturite: ['Vert tendre', [Validators.required]],
      dateRecolte: [new Date().toISOString().slice(0, 10), [Validators.required]],
      dateReception: [new Date().toISOString().slice(0, 10), [Validators.required]],
      dureeStockageAvantBroyage: [1, [Validators.required, Validators.min(0)]],
      matierePremiereId: [1, [Validators.required, Validators.min(1)]],
      campagneId: [new Date().getFullYear(), [Validators.required, Validators.min(2000)]],
      huilerieId: [1, [Validators.required]],
    });

    this.weighingForm.valueChanges.subscribe(values => {
      const brut = Number(values.poidsBrut ?? 0);
      const tare = Number(values.poidsTare ?? 0);
      const net = this.lotManagementService.calculatePoidsNet(brut, tare);
      this.weighingForm.get('poidsNet')?.setValue(net, { emitEvent: false });
    });

    this.weighingForm.get('lotMode')?.valueChanges.subscribe(mode => {
      this.applyLotModeValidation(mode === 'new' ? 'new' : 'existing');
    });

    this.weighingForm.get('existingLotId')?.valueChanges.subscribe(lotId => {
      this.patchLotIdentityFromSelection(Number(lotId));
    });
  }

  ngOnInit(): void {
    this.lotManagementService.loadInitialData().subscribe(() => {
      this.lotManagementService.lots$.subscribe(data => {
        this.lots = data;
      });

      this.lotManagementService.weighings$.subscribe(data => {
        this.weighings = data;
      });

      this.lotManagementService.movements$.subscribe(data => {
        this.movements = data;
      });

      this.patchLotIdentityFromSelection(Number(this.weighingForm.get('existingLotId')?.value));
    });
  }

  submitWeighing(): void {
    this.errorMessage = '';

    if (this.weighingForm.invalid) {
      this.weighingForm.markAllAsTouched();
      return;
    }

    const raw = this.weighingForm.getRawValue();
    const input: CreatePeseeInput = {
      datePesee: raw.datePesee ?? new Date().toISOString(),
      poidsBrut: Number(raw.poidsBrut),
      poidsTare: Number(raw.poidsTare),
      huilerieId: Number(raw.huilerieId),
      lotMode: raw.lotMode === 'new' ? 'new' : 'existing',
      existingLotId: Number(raw.existingLotId),
      origine: String(raw.origine ?? ''),
      varieteOlive: String(raw.varieteOlive ?? ''),
      newLotDetails:
        raw.lotMode === 'new'
          ? {
              maturite: String(raw.maturite ?? ''),
              dateRecolte: String(raw.dateRecolte ?? ''),
              dateReception: String(raw.dateReception ?? ''),
              dureeStockageAvantBroyage: Number(raw.dureeStockageAvantBroyage),
              matierePremiereId: Number(raw.matierePremiereId),
              campagneId: Number(raw.campagneId),
            }
          : undefined,
    };

    this.lotManagementService.createPesee(input).subscribe({
      next: result => {
        this.weighingForm.patchValue({
          poidsBrut: 0,
          poidsTare: 0,
          poidsNet: 0,
          datePesee: new Date().toISOString().slice(0, 16),
          lotMode: 'existing',
          existingLotId: result.lot.idLot,
          origine: result.lot.origine,
          varieteOlive: result.lot.varieteOlive,
        });
      },
      error: errorResponse => {
        this.errorMessage = errorResponse?.message ?? 'Erreur de validation metier.';
      },
    });
  }

  movementLabel(type: StockMovement['typeMouvement']): string {
    if (type === 'ARRIVAL') {
      return 'Entree';
    }
    if (type === 'DEPARTURE') {
      return 'Sortie';
    }
    if (type === 'TRANSFER') {
      return 'Transfert';
    }
    return 'Ajustement';
  }

  isNewLotMode(): boolean {
    return this.weighingForm.get('lotMode')?.value === 'new';
  }

  exportReceiptPdf(pesee: Pesee): void {
    const html = `
      <html>
      <head>
        <title>Recu pesee ${pesee.idPesee}</title>
        <style>
          body { font-family: sans-serif; padding: 24px; }
          h1 { margin: 0 0 12px; }
          .line { margin: 6px 0; }
        </style>
      </head>
      <body>
        <h1>Recu de pesee</h1>
        <div class="line">ID pesee: ${pesee.idPesee}</div>
        <div class="line">Date: ${pesee.datePesee}</div>
        <div class="line">Lot: ${pesee.lotId}</div>
        <div class="line">Poids brut: ${pesee.poidsBrut} kg</div>
        <div class="line">Poids tare: ${pesee.poidsTare} kg</div>
        <div class="line">Poids net: ${pesee.poidsNet} kg</div>
      </body>
      </html>
    `;

    const popup = window.open('', '_blank', 'width=900,height=700');
    if (!popup) {
      return;
    }

    popup.document.open();
    popup.document.write(html);
    popup.document.close();
    popup.focus();
    popup.print();
  }

  private applyLotModeValidation(mode: 'existing' | 'new'): void {
    const existingLotControl = this.weighingForm.get('existingLotId');
    if (!existingLotControl) {
      return;
    }

    if (mode === 'existing') {
      existingLotControl.setValidators([Validators.required]);
    } else {
      existingLotControl.clearValidators();
    }

    existingLotControl.updateValueAndValidity({ emitEvent: false });
  }

  private patchLotIdentityFromSelection(lotId: number): void {
    if (this.weighingForm.get('lotMode')?.value !== 'existing') {
      return;
    }

    const lot = this.lots.find(item => item.idLot === lotId);
    if (!lot) {
      return;
    }

    this.weighingForm.patchValue({
      origine: lot.origine,
      varieteOlive: lot.varieteOlive,
    });
  }
}
