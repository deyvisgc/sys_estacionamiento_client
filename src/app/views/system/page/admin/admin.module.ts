import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormUsersComponent } from './component/form-users/form-users.component';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import {SharedSystemModule} from "src/app/views/system/shared-system/shared-system.module"
import { ElModule } from 'element-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './component/list-users/list-users.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

@NgModule({
  declarations: [
    ListUsersComponent,
    FormUsersComponent,
    ConfiguracionComponent
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
