import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { OilMillsManagementComponent } from '../oil-mills-management/oil-mills-management.component';
import { UserAccountsComponent } from '../user-accounts/user-accounts.component';

@NgModule({
  declarations: [OilMillsManagementComponent, UserAccountsComponent],
  imports: [SharedModule, AdminRoutingModule, NbCardModule],
})
export class AdminModule {}
