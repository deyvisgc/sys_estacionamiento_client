import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParqueoRoutingModule } from './parqueo-routing.module';
import { ListParqueoComponent } from './component/list-parqueo/list-parqueo.component';
import { IngresoParqueoComponent } from './component/ingreso-parqueo/ingreso-parqueo.component';
import { ElModule } from 'element-angular';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { SharedSystemModule } from '../../shared-system/shared-system.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTimepicker, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketParqueoComponent } from './component/ticket-parqueo/ticket-parqueo.component';
import { SalidaParqueoComponent } from './component/salida-parqueo/salida-parqueo.component';


@NgModule({
  declarations: [
    ListParqueoComponent,
    IngresoParqueoComponent,
    TicketParqueoComponent,
    SalidaParqueoComponent
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
