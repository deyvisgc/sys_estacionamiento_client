import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParqueoRoutingModule } from './parqueo-routing.module';
import { ListParqueoComponent } from './component/list-parqueo/list-parqueo.component';
import { FormParqueoComponent } from './component/form-parqueo/form-parqueo.component';
import { SharedSystemModule } from '../shared-system/shared-system.module';
import { ElModule } from 'element-angular';
import { DocsComponentsModule } from '@docs-components/docs-components.module';


@NgModule({
  declarations: [
    ListParqueoComponent,
    FormParqueoComponent
  ],
  imports: [
    DocsComponentsModule,
    CommonModule,
    ParqueoRoutingModule,
    SharedSystemModule,
    ElModule.forRoot()
  ]
})
export class ParqueoModule { }
