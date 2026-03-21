import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Machine } from '../../models/enterprise.models';
import { MachineService } from '../../services/machine.service';

@Component({
  selector: 'app-machines-list',
  standalone: true,
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss'],
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
})
export class MachinesListComponent implements OnInit {
  machines: Array<Machine & { availability: string }> = [];

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.machineService.getMock().subscribe(data => {
      this.machines = data.map(item => ({
        ...item,
        availability: item.etatMachine === 'MAINTENANCE' ? 'Indisponible' : 'Disponible',
      }));
    });
  }

  statusLabel(status: string): string {
    if (status === 'EN_SERVICE') {
      return 'En service';
    }
    if (status === 'SURVEILLANCE') {
      return 'Surveillance';
    }
    if (status === 'MAINTENANCE') {
      return 'Maintenance';
    }
    return status;
  }

  statusClass(status: string): string {
    if (status === 'EN_SERVICE') {
      return 'ok';
    }
    if (status === 'SURVEILLANCE') {
      return 'warn';
    }
    return 'critical';
  }

  availabilityClass(value: string): string {
    return value === 'Disponible' ? 'ok' : 'critical';
  }
}
