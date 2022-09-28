import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { IngresoComponent } from './ingreso/ingreso.component';
import { GananciasComponent } from './ganancias/ganancias.component';
import { SharedSystemModule } from '../../shared-system/shared-system.module';
import { ElModule } from 'element-angular';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IngresoComponent,
    GananciasComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    SharedSystemModule,
    FormsModule,
    ElModule.forRoot()
  ]
})
export class ReporteModule { }
