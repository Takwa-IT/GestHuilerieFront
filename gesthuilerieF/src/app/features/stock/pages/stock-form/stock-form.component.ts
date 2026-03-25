import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StockMovement } from '../../models/stock.models';
import { StockManagementService } from '../../services/stock-management.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-stock-form',
  standalone: true,
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class StockFormComponent {
  readonly form;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private stockManagementService: StockManagementService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      typeMouvement: ['ARRIVAL', [Validators.required]],
      referenceId: [null, [Validators.required, Validators.min(1)]],
      quantite: [0, [Validators.required, Validators.min(1)]],
      dateMouvement: [new Date().toISOString().slice(0, 16), [Validators.required]],
      commentaire: ['', [Validators.required]],
      huilerieId: [1, [Validators.required, Validators.min(1)]],
    });
  }

  submit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    this.stockManagementService.createMovement({
      huilerieId: Number(raw.huilerieId),
      referenceId: Number(raw.referenceId),
      quantite: Number(raw.quantite),
      dateMouvement: raw.dateMouvement ?? new Date().toISOString(),
      commentaire: raw.commentaire ?? '',
      typeMouvement: (raw.typeMouvement as StockMovement['typeMouvement']) ?? 'ARRIVAL',
    }).subscribe({
      next: () => {
        this.router.navigateByUrl('/pages/stock');
      },
      error: errorResponse => {
        this.errorMessage =
          errorResponse?.error?.message ??
          errorResponse?.message ??
          'Impossible de creer le mouvement.';
      },
    });
  }
}
