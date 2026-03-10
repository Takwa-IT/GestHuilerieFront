import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbListModule, NbProgressBarModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ProductionDashboardComponent } from './pages/production-dashboard/production-dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [AdminDashboardComponent, ProductionDashboardComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbProgressBarModule,
    NgxEchartsModule,
  ],
})
export class DashboardModule {}
