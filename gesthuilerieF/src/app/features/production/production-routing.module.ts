import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionGuidesComponent } from './pages/production-guides/production-guides.component';
import { QualityYieldComponent } from './pages/quality-yield/quality-yield.component';

const routes: Routes = [
  { path: 'guides', component: ProductionGuidesComponent },
  { path: 'quality', component: QualityYieldComponent },
  { path: '', redirectTo: 'guides', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionRoutingModule {}
