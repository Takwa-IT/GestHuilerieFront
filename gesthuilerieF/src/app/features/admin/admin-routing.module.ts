import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OilMillsManagementComponent } from '../oil-mills-management/oil-mills-management.component';
import { UserAccountsComponent } from '../user-accounts/user-accounts.component';

const routes: Routes = [
  { path: 'oil-mills', component: OilMillsManagementComponent },
  { path: 'users-profiles-privileges', component: UserAccountsComponent },
  { path: '', redirectTo: 'oil-mills', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
