import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../../admin-dashboard/admin-dashboard.component';
import { ProductionDashboardComponent } from '../../production-dashboard/production-dashboard.component';

const routes: Routes = [
  { path: 'production', component: ProductionDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '', redirectTo: 'production', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
