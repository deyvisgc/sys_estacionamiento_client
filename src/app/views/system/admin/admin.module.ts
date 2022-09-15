import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListUsersComponent } from './component/list-users/list-users.component';
import { FormUsersComponent } from './component/form-users/form-users.component';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import {SharedSystemModule} from "src/app/views/system/shared-system/shared-system.module"
import { ElModule } from 'element-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListUsersComponent,
    FormUsersComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    DocsComponentsModule,
    SharedSystemModule,
    ElModule.forRoot()
  ]
})
export class AdminModule { }
