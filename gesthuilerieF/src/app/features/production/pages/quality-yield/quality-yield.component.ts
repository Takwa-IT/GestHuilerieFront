import { Component } from '@angular/core';

@Component({
  selector: 'app-quality-yield',
  templateUrl: './quality-yield.component.html',
  styleUrls: ['./quality-yield.component.scss'],
})
export class QualityYieldComponent {
  kpis = [
    { label: 'Rendement moyen', value: '19.8%' },
    { label: 'Conformité qualité', value: '94%' },
    { label: 'Lots analysés', value: '126' },
    { label: 'Écart vs cible', value: '+1.2%' },
  ];

  rows = [
    { lot: 'OL-2026-031', rendement: '20.1%', acidite: '0.62%', qualite: 'A-' },
    { lot: 'OL-2026-032', rendement: '19.4%', acidite: '0.70%', qualite: 'B+' },
    { lot: 'OL-2026-033', rendement: '20.6%', acidite: '0.55%', qualite: 'A' },
  ];
}
