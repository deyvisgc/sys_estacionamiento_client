import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListParqueoComponent } from './component/list-parqueo/list-parqueo.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListParqueoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueoRoutingModule { }
