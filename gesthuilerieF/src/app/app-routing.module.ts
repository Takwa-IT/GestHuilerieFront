import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './@theme/components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'pages',
    component: SidebarComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'production',
        loadChildren: () => import('./features/production/production.module').then(m => m.ProductionModule),
      },
      {
        path: 'raw-material',
        loadChildren: () => import('./features/raw-material/raw-material.module').then(m => m.RawMaterialModule),
      },
      {
        path: 'machines',
        loadChildren: () => import('./features/machines/machines.module').then(m => m.MachinesModule),
      },
      {
        path: 'stock',
        loadChildren: () => import('./features/stock/stock.module').then(m => m.StockModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
      },
      { path: '', redirectTo: 'dashboard/production', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
