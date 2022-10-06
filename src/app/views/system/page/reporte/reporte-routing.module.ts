import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './ingreso/ingreso.component';
import { ProGuard } from 'src/app/guard.guard';
import { Roles } from 'src/app/views/system/core/constantes/roles';
import { GananciasComponent } from './ganancias/ganancias.component';
const routes: Routes = [
  {
    path: 'ingreso',
    component: IngresoComponent,
    canActivate: [ProGuard], data: { expectedRol: Roles.PERMISOSALL}
  },
  {
    path: 'ganancia',
    component: GananciasComponent,
    canActivate: [ProGuard], data: { expectedRol: Roles.PERMISOSALL}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
