import { Component } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-user-accounts',
    templateUrl: './user-accounts.component.html',
    styleUrls: ['./user-accounts.component.scss'],
    standalone: true,
    imports: [NbCardModule, NgFor],
})
export class UserAccountsComponent {
  users = [
    { name: 'Admin Central', role: 'Administrateur', profile: 'Super Admin', privileges: 'CRUD complet' },
    { name: 'Sara El Amrani', role: 'Resp. Production', profile: 'Production', privileges: 'Pesée, lots, stock' },
    { name: 'Youssef B', role: 'Resp. Production', profile: 'Qualité', privileges: 'Analyses chimiques' },
  ];
}
