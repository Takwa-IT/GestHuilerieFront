import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserAccountsComponent } from './pages/user-accounts/user-accounts.component';

@NgModule({
  declarations: [UserAccountsComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
    NbCardModule,
    NbIconModule,
  ],
})
export class UsersModule {}
