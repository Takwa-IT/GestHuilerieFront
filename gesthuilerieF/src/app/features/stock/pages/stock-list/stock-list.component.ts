import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StockMovement } from '../../models/stock.models';
import { StockManagementService } from '../../services/stock-management.service';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class StockListComponent implements OnInit {
  movements: StockMovement[] = [];

  readonly filterForm;

  constructor(
    private stockManagementService: StockManagementService,
    private formBuilder: FormBuilder,
  ) {
    this.filterForm = this.formBuilder.group({
      type: ['ALL'],
      referenceId: [''],
    });
  }

  ngOnInit(): void {
    this.stockManagementService.loadInitialData().subscribe(() => {
      this.applyFilter();
      this.filterForm.valueChanges.subscribe(() => this.applyFilter());
    });
  }

  deleteMovement(id: number): void {
    this.stockManagementService.deleteMovement(id);
    this.applyFilter();
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

  movementClass(type: StockMovement['typeMouvement']): string {
    if (type === 'ARRIVAL') {
      return 'ok';
    }
    if (type === 'DEPARTURE') {
      return 'critical';
    }
    if (type === 'TRANSFER') {
      return 'warn';
    }
    return 'muted';
  }

  private applyFilter(): void {
    const raw = this.filterForm.getRawValue();
    const type = raw.type as StockMovement['typeMouvement'] | 'ALL';
    const referenceId = raw.referenceId ? Number(raw.referenceId) : null;

    this.stockManagementService.getFilteredMovements({ type, referenceId }).subscribe(data => {
      this.movements = data;
    });
  }
}
