import { Component } from '@angular/core';

@Component({
  selector: 'app-machine-state',
  templateUrl: './machine-state.component.html',
  styleUrls: ['./machine-state.component.scss'],
})
export class MachineStateComponent {
  machines = [
    { name: 'Presse P-01', health: 84, status: 'En service', maintenance: '03/03/2026' },
    { name: 'Décanteur D-02', health: 72, status: 'Surveillance', maintenance: '01/03/2026' },
    { name: 'Centrifugeuse C-02', health: 63, status: 'Maintenance planifiée', maintenance: '08/03/2026' },
    { name: 'Filtre F-03', health: 90, status: 'En service', maintenance: '05/03/2026' },
  ];
}
