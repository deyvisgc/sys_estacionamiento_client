import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParqueoRoutingModule } from './parqueo-routing.module';
import { ListParqueoComponent } from './component/list-parqueo/list-parqueo.component';
import { FormParqueoComponent } from './component/form-parqueo/form-parqueo.component';
import { ElModule } from 'element-angular';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { SharedSystemModule } from '../../shared-system/shared-system.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTimepicker, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListParqueoComponent,
    FormParqueoComponent
  ],
  imports: [
    NgbTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    DocsComponentsModule,
    CommonModule,
    ParqueoRoutingModule,
    SharedSystemModule,
    ElModule.forRoot()
  ]
})
export class ParqueoModule { }
