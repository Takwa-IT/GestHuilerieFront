import { Component } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-production-guides',
    templateUrl: './production-guides.component.html',
    styleUrls: ['./production-guides.component.scss'],
    standalone: true,
    imports: [NbCardModule, NgFor],
})
export class ProductionGuidesComponent {
  steps = [
    { step: 'Nettoyage & tri', desc: 'Validation lot et élimination impuretés', status: 'Terminé' },
    { step: 'Broyage', desc: 'Paramètre vitesse 1450 rpm', status: 'En cours' },
    { step: 'Malaxage', desc: 'Température cible 27°C', status: 'En cours' },
    { step: 'Extraction finale', desc: 'Décanteur D-02', status: 'Planifié' },
  ];
}
