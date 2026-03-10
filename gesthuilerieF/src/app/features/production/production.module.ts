import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionGuidesComponent } from './pages/production-guides/production-guides.component';
import { QualityYieldComponent } from './pages/quality-yield/quality-yield.component';

@NgModule({
  declarations: [
    ProductionGuidesComponent,
    QualityYieldComponent,
  ],
  imports: [SharedModule, ProductionRoutingModule, NbCardModule],
})
export class ProductionModule {}
