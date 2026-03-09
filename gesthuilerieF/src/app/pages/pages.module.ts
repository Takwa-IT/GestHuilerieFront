import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [ThemeModule, NbMenuModule, RouterModule],
  declarations: [PagesComponent],
  exports: [PagesComponent],
})
export class PagesModule {}
