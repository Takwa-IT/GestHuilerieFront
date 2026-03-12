import { Routes } from '@angular/router';
import { SidebarComponent } from './@theme/components/sidebar/sidebar.component';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/pages/signup/signup.component').then(c => c.SignupComponent),
  },
  {
    path: 'pages',
    component: SidebarComponent,
    children: [
      // Dashboard
      {
        path: 'dashboard/production',
        loadComponent: () => import('./features/dashboard/pages/production-dashboard/production-dashboard.component').then(c => c.ProductionDashboardComponent),
      },
      {
        path: 'dashboard/admin',
        loadComponent: () => import('./features/dashboard/pages/admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent),
      },
      // Production
      {
        path: 'production/guides',
        loadComponent: () => import('./features/production/pages/production-guides/production-guides.component').then(c => c.ProductionGuidesComponent),
      },
      {
        path: 'production/quality',
        loadComponent: () => import('./features/production/pages/quality-yield/quality-yield.component').then(c => c.QualityYieldComponent),
      },
      // Raw material
      {
        path: 'raw-material',
        loadComponent: () => import('./features/raw-material/pages/raw-materials/raw-materials.component').then(c => c.RawMaterialsComponent),
      },
      // Machines
      {
        path: 'machines/state',
        loadComponent: () => import('./features/machines/pages/machine-state/machine-state.component').then(c => c.MachineStateComponent),
      },
      {
        path: 'machines/management',
        loadComponent: () => import('./features/machines/pages/oil-mills-management/oil-mills-management.component').then(c => c.OilMillsManagementComponent),
      },
      // Stock
      {
        path: 'stock/weighing',
        loadComponent: () => import('./features/stock/pages/weighing-stock/weighing-stock.component').then(c => c.WeighingStockComponent),
      },
      {
        path: 'stock/traceability',
        loadComponent: () => import('./features/stock/pages/lot-traceability/lot-traceability.component').then(c => c.LotTraceabilityComponent),
      },
      // Users
      {
        path: 'users',
        loadComponent: () => import('./features/users/pages/user-accounts/user-accounts.component').then(c => c.UserAccountsComponent),
      },
      { path: 'dashboard', redirectTo: 'dashboard/production', pathMatch: 'full' },
      { path: 'production', redirectTo: 'production/guides', pathMatch: 'full' },
      { path: 'machines', redirectTo: 'machines/state', pathMatch: 'full' },
      { path: 'stock', redirectTo: 'stock/weighing', pathMatch: 'full' },
      { path: '', redirectTo: 'dashboard/production', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];
