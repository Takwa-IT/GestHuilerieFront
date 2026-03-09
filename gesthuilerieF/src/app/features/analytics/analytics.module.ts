import { NgModule } from '@angular/core';
import { NbCardModule, NbProgressBarModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { QualityYieldComponent } from '../quality-yield/quality-yield.component';
import { MachineStateComponent } from '../machine-state/machine-state.component';

@NgModule({
  declarations: [QualityYieldComponent, MachineStateComponent],
  imports: [SharedModule, AnalyticsRoutingModule, NbCardModule, NbProgressBarModule],
})
export class AnalyticsModule {}
