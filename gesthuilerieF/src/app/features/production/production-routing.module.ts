import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeighingStockComponent } from '../weighing-stock/weighing-stock.component';
import { RawMaterialsComponent } from '../raw-materials/raw-materials.component';
import { ProductionGuidesComponent } from '../production-guides/production-guides.component';
import { LotTraceabilityComponent } from '../lot-traceability/lot-traceability.component';

const routes: Routes = [
  { path: 'weighing-stock', component: WeighingStockComponent },
  { path: 'raw-materials', component: RawMaterialsComponent },
  { path: 'guides', component: ProductionGuidesComponent },
  { path: 'traceability', component: LotTraceabilityComponent },
  { path: '', redirectTo: 'weighing-stock', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionRoutingModule {}
