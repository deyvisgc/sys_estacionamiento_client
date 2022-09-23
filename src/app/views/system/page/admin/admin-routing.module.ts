import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './component/list-users/list-users.component';
import {ProGuard} from './../../../../guard.guard'

const rol = [
  "ROLE_ADMIN",
  "ROLE_USERS"
]
const routes: Routes = [
  {
    path: 'users',
    component: ListUsersComponent,
    canActivate: [ProGuard], data: { expectedRol: rol}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
