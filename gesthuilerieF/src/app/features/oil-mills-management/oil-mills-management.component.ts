import { Component } from '@angular/core';

@Component({
  selector: 'app-oil-mills-management',
  templateUrl: './oil-mills-management.component.html',
  styleUrls: ['./oil-mills-management.component.scss'],
})
export class OilMillsManagementComponent {
  mills = [
    { name: 'Huilerie Atlas', company: 'Atlas Agro', capacity: '45 t', status: 'Active' },
    { name: 'Huilerie Rif', company: 'Rif Food', capacity: '30 t', status: 'Active' },
    { name: 'Huilerie Saiss', company: 'Saiss Group', capacity: '25 t', status: 'Audit' },
  ];
}
