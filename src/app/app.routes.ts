import { Routes } from '@angular/router';
import { LandingComponent } from './features/Landing/landing/landing.component';
import { SuperadminloginComponent } from './features/auth/super-admin-login/superadminlogin/superadminlogin.component';
import { SuperAdminLayoutComponent } from './features/layouts/super-admin-layout/super-admin-layout/super-admin-layout.component';
import { DashboardComponent } from './features/super-admin/dashboard/dashboard/dashboard.component';
import { OnboardTenantComponent } from './features/super-admin/onboard-tenant/onboard-tenant/onboard-tenant.component';
import { TenantCredentialsComponent } from './features/super-admin/tenant-credentials/tenant-credentials/tenant-credentials.component';
import { SuperAdminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'superadminlogin',
    component: SuperadminloginComponent,
  },
  {
    path: 'super-admin',
    canActivate: [SuperAdminGuard],
    component: SuperAdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'onboard-tenant',
        component: OnboardTenantComponent,
      },
      {
        path: 'tenant-credentials',
        component: TenantCredentialsComponent,
      },
    ],
  },
];
