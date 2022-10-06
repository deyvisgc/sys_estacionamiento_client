import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProGuard } from 'src/app/guard.guard';
import { ListParqueoComponent } from './component/list-parqueo/list-parqueo.component';
import { TipoVehiculoComponent } from './component/tipo-vehiculo/tipo-vehiculo.component';
import { Roles } from 'src/app/views/system/core/constantes/roles';
const routes: Routes = [
  {
    path: 'list',
    component: ListParqueoComponent,
    canActivate: [ProGuard], data: { expectedRol: Roles.PERMISOSALL}
  },
  {
    path: 'tipo-vehiculo',
    component: TipoVehiculoComponent,
    canActivate: [ProGuard], data: { expectedRol: Roles.PERMISOSALL}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueoRoutingModule { }
