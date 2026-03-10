import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { RawMaterialRoutingModule } from './raw-material-routing.module';
import { RawMaterialsComponent } from './pages/raw-materials/raw-materials.component';

@NgModule({
  declarations: [RawMaterialsComponent],
  imports: [
    SharedModule,
    RawMaterialRoutingModule,
    NbCardModule,
    NbIconModule,
  ],
})
export class RawMaterialModule {}
