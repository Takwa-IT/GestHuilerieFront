import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineStateComponent } from './pages/machine-state/machine-state.component';
import { OilMillsManagementComponent } from './pages/oil-mills-management/oil-mills-management.component';

const routes: Routes = [
  { path: 'state', component: MachineStateComponent },
  { path: 'management', component: OilMillsManagementComponent },
  { path: '', redirectTo: 'state', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachinesRoutingModule {}
