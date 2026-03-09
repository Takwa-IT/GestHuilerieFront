import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QualityYieldComponent } from '../quality-yield/quality-yield.component';
import { MachineStateComponent } from '../machine-state/machine-state.component';

const routes: Routes = [
  { path: 'quality-yield', component: QualityYieldComponent },
  { path: 'machine-state', component: MachineStateComponent },
  { path: '', redirectTo: 'quality-yield', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
