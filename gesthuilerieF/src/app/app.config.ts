import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { APP_ROUTES } from './app.routes';
import { AuthInterceptor } from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'default' }),
      NbLayoutModule,
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NbContextMenuModule,
      NbActionsModule,
      NbButtonModule,
      NbCardModule,
      NbIconModule,
      NbListModule,
      NbProgressBarModule,
      NbUserModule,
      NbSelectModule,
      NbEvaIconsModule,
      NgxEchartsModule.forRoot({ echarts }),
    ),
  ],
};
