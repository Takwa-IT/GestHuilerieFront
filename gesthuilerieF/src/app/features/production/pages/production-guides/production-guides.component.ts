import { Component } from '@angular/core';

@Component({
  selector: 'app-production-guides',
  templateUrl: './production-guides.component.html',
  styleUrls: ['./production-guides.component.scss'],
})
export class ProductionGuidesComponent {
  steps = [
    { step: 'Nettoyage & tri', desc: 'Validation lot et élimination impuretés', status: 'Terminé' },
    { step: 'Broyage', desc: 'Paramètre vitesse 1450 rpm', status: 'En cours' },
    { step: 'Malaxage', desc: 'Température cible 27°C', status: 'En cours' },
    { step: 'Extraction finale', desc: 'Décanteur D-02', status: 'Planifié' },
  ];
}
