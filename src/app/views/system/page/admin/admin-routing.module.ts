import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './component/list-users/list-users.component';
import { ProGuard } from 'src/app/guard.guard';
import { Roles } from 'src/app/views/system/core/constantes/roles';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ProfileComponent } from './component/profile/profile.component';
const routes: Routes = [
  {
    path: 'users',
    component: ListUsersComponent,
    canActivate: [ProGuard], data: { expectedRol: Roles.PERMISOSADMINUSERS}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProGuard], data: { expectedRol: Roles.PERMISOSALL}
  },
  {
    path: 'config',
    component: ConfiguracionComponent,
    canActivate: [ProGuard], data: { expectedRol: Roles.PERMISOSADMIN}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
