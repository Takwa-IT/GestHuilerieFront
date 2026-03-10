import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { StockRoutingModule } from './stock-routing.module';
import { WeighingStockComponent } from './pages/weighing-stock/weighing-stock.component';
import { LotTraceabilityComponent } from './pages/lot-traceability/lot-traceability.component';

@NgModule({
  declarations: [WeighingStockComponent, LotTraceabilityComponent],
  imports: [
    SharedModule,
    StockRoutingModule,
    NbCardModule,
    NbIconModule,
  ],
})
export class StockModule {}
