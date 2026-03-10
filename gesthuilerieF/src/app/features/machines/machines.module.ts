import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbProgressBarModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { MachinesRoutingModule } from './machines-routing.module';
import { MachineStateComponent } from './pages/machine-state/machine-state.component';
import { OilMillsManagementComponent } from './pages/oil-mills-management/oil-mills-management.component';

@NgModule({
  declarations: [MachineStateComponent, OilMillsManagementComponent],
  imports: [
    SharedModule,
    MachinesRoutingModule,
    NbCardModule,
    NbIconModule,
    NbProgressBarModule,
  ],
})
export class MachinesModule {}
