import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/system/page/auth/login/login.component';
import { Page404Component } from './views/system/page/auth/page404/page404.component';
import { SharedSystemModule } from './views/system/shared-system/shared-system.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./views/system/page/admin/admin.module').then((m) => m.AdminModule)
      },
      {
        path: 'parqueo',
        loadChildren: () =>
          import('./views/system/page/parqueo/parqueo.module').then((m) => m.ParqueoModule)
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'reporte',
        loadChildren: () =>
          import('./views/system/page/reporte/reporte.module').then((m) => m.ReporteModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'not-autorized',
    component: Page404Component,
    data: {
      title: 'Page not authorized'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    SharedSystemModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
