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

  constructor(
    private formBuilder: FormBuilder,
    private stockManagementService: StockManagementService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      typeMouvement: ['ARRIVAL', [Validators.required]],
      referenceId: [31, [Validators.required, Validators.min(1)]],
      quantite: [0, [Validators.required, Validators.min(1)]],
      dateMouvement: [new Date().toISOString().slice(0, 16), [Validators.required]],
      commentaire: ['', [Validators.required]],
      huilerieId: [1, [Validators.required]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Omit<StockMovement, 'id'> = {
      typeMouvement: (raw.typeMouvement as StockMovement['typeMouvement']) ?? 'ARRIVAL',
      referenceId: Number(raw.referenceId),
      quantite: Number(raw.quantite),
      dateMouvement: raw.dateMouvement ?? new Date().toISOString(),
      commentaire: raw.commentaire ?? '',
      huilerieId: Number(raw.huilerieId),
    };

    this.stockManagementService.loadInitialData().subscribe(() => {
      this.stockManagementService.createMovement(payload);
      this.router.navigateByUrl('/pages/stock');
    });
  }
}
