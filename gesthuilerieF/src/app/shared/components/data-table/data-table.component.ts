import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export interface DataTableColumn {
  key: string;
  label: string;
}

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor],
})
export class DataTableComponent {
  @Input() columns: DataTableColumn[] = [];
  @Input() rows: Record<string, string | number>[] = [];
}
