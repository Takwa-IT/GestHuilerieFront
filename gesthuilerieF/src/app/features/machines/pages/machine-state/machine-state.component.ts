import { Component, OnInit } from '@angular/core';
import { NbCardModule, NbProgressBarModule } from '@nebular/theme';
import { NgFor } from '@angular/common';
import { Machine } from '../../models/enterprise.models';
import { MachineService } from '../../services/machine.service';

@Component({
    selector: 'app-machine-state',
    templateUrl: './machine-state.component.html',
    styleUrls: ['./machine-state.component.scss'],
    standalone: true,
    imports: [
        NbCardModule,
        NgFor,
        NbProgressBarModule,
    ],
})
export class MachineStateComponent implements OnInit {
  machines: Array<Machine & { health: number; maintenance: string }> = [];

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.machineService.getMock().subscribe(data => {
      this.machines = data.map((machine, index) => ({
        ...machine,
        health: [84, 72, 63, 90][index] ?? 78,
        maintenance: ['03/03/2026', '01/03/2026', '08/03/2026', '05/03/2026'][index] ?? '07/03/2026',
      }));
    });
  }

  getStatusLabel(status: string): string {
    if (status === 'EN_SERVICE') {
      return 'En service';
    }
    if (status === 'SURVEILLANCE') {
      return 'Surveillance';
    }
    if (status === 'MAINTENANCE') {
      return 'Maintenance planifiee';
    }
    return status;
  }

  getStatusClass(status: string): string {
    if (status === 'EN_SERVICE') {
      return 'ok';
    }
    if (status === 'SURVEILLANCE') {
      return 'warn';
    }
    return 'critical';
  }
}
