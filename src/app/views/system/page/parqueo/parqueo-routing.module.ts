import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProGuard } from 'src/app/guard.guard';
import { ListParqueoComponent } from './component/list-parqueo/list-parqueo.component';
const rol = [
  "ROLE_ADMIN",
  "ROLE_VENDEDOR"
]
const routes: Routes = [
  {
    path: 'list',
    component: ListParqueoComponent,
    canActivate: [ProGuard], data: { expectedRol: rol}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueoRoutingModule { }
