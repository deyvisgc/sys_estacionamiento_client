import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './ingreso/ingreso.component';
import { ProGuard } from '../../../../guard.guard';
import { GananciasComponent } from './ganancias/ganancias.component';
const rol = [
  "ROLE_ADMIN",
  "ROLE_USERS",
  "ROLE_VENDEDOR"
]
const routes: Routes = [
  {
    path: 'ingreso',
    component: IngresoComponent,
    canActivate: [ProGuard], data: { expectedRol: rol}
  },
  {
    path: 'ganancia',
    component: GananciasComponent,
    canActivate: [ProGuard], data: { expectedRol: rol}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
