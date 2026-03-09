import { Component } from '@angular/core';

@Component({
  selector: 'app-lot-traceability',
  templateUrl: './lot-traceability.component.html',
  styleUrls: ['./lot-traceability.component.scss'],
})
export class LotTraceabilityComponent {
  lots = [
    { lot: 'OL-031', qr: 'QR-OL-031-A', stage: 'Extraction', destination: 'Cuve C1', time: '08/03 10:22' },
    { lot: 'OL-032', qr: 'QR-OL-032-B', stage: 'Filtration', destination: 'Cuve C2', time: '08/03 11:14' },
    { lot: 'OL-033', qr: 'QR-OL-033-C', stage: 'Stockage', destination: 'Réservoir R5', time: '08/03 11:46' },
  ];
}
