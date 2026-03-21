import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Pesee } from '../../../stock/models/stock.models';
import { LotManagementService } from '../../../lots/services/lot-management.service';

@Component({
  selector: 'app-reception-list',
  standalone: true,
  templateUrl: './reception-list.component.html',
  styleUrls: ['./reception-list.component.scss'],
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
})
export class ReceptionListComponent implements OnInit {
  pesees: Pesee[] = [];
  lastReception: Pesee | null = null;

  constructor(private lotManagementService: LotManagementService) {}

  ngOnInit(): void {
    this.lotManagementService.loadInitialData().subscribe(() => {
      this.lotManagementService.weighings$.subscribe(data => {
        this.pesees = data;
        this.lastReception = data.length > 0 ? data[0] : null;
      });
    });
  }
}
