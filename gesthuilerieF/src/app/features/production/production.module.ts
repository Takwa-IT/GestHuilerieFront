import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { ProductionRoutingModule } from './production-routing.module';
import { WeighingStockComponent } from '../weighing-stock/weighing-stock.component';
import { RawMaterialsComponent } from '../raw-materials/raw-materials.component';
import { ProductionGuidesComponent } from '../production-guides/production-guides.component';
import { LotTraceabilityComponent } from '../lot-traceability/lot-traceability.component';

@NgModule({
  declarations: [
    WeighingStockComponent,
    RawMaterialsComponent,
    ProductionGuidesComponent,
    LotTraceabilityComponent,
  ],
  imports: [SharedModule, ProductionRoutingModule, NbCardModule],
})
export class ProductionModule {}
