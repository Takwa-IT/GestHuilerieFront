import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { LotOlives } from '../../models/lot.models';
import { LotManagementService } from '../../services/lot-management.service';

@Component({
  selector: 'app-lot-list',
  templateUrl: './lot-list.component.html',
  styleUrls: ['./lot-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, NbButtonModule],
})
export class LotListComponent implements OnInit {
  lots: LotOlives[] = [];

  constructor(private lotManagementService: LotManagementService) {}

  ngOnInit(): void {
    this.lotManagementService.loadInitialData().subscribe(() => {
      this.lotManagementService.lots$.subscribe(data => {
        this.lots = data;
      });
    });
  }
}
