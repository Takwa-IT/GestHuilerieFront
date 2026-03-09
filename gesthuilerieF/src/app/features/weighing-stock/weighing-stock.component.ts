import { Component } from '@angular/core';

@Component({
  selector: 'app-weighing-stock',
  templateUrl: './weighing-stock.component.html',
  styleUrls: ['./weighing-stock.component.scss'],
})
export class WeighingStockComponent {
  weighings = [
    { ref: 'REC-2301', gross: '12 200 kg', tare: '1 200 kg', net: '11 000 kg', stock: '+11 000 kg' },
    { ref: 'REC-2302', gross: '9 850 kg', tare: '1 050 kg', net: '8 800 kg', stock: '+8 800 kg' },
    { ref: 'REC-2303', gross: '10 100 kg', tare: '1 100 kg', net: '9 000 kg', stock: '+9 000 kg' },
  ];
}
