import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeighingStockComponent } from './pages/weighing-stock/weighing-stock.component';
import { LotTraceabilityComponent } from './pages/lot-traceability/lot-traceability.component';

const routes: Routes = [
  { path: 'weighing', component: WeighingStockComponent },
  { path: 'traceability', component: LotTraceabilityComponent },
  { path: '', redirectTo: 'weighing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
