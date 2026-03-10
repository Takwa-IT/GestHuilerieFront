import { Component } from '@angular/core';
import { DataTableColumn } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-raw-materials',
  templateUrl: './raw-materials.component.html',
  styleUrls: ['./raw-materials.component.scss'],
})
export class RawMaterialsComponent {
  columns: DataTableColumn[] = [
    { key: 'lot', label: 'Lot MP' },
    { key: 'supplier', label: 'Fournisseur' },
    { key: 'acidity', label: 'Acidité' },
    { key: 'humidity', label: 'Humidité' },
    { key: 'machine', label: 'Machine affectée' },
  ];

  raws = [
    { lot: 'MP-031', supplier: 'Coop Zitoune Nord', acidity: '0.64%', humidity: '9.0%', machine: 'Ligne A' },
    { lot: 'MP-032', supplier: 'Coop Taza Olive', acidity: '0.71%', humidity: '10.2%', machine: 'Ligne B' },
    { lot: 'MP-033', supplier: 'Domaine Al Amal', acidity: '0.58%', humidity: '8.6%', machine: 'Ligne A' },
  ];
}
