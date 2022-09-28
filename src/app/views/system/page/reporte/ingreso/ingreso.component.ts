import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PaginancionRequest} from 'src/app/views/system/core/request/paginacion.request'
import * as dayjs from 'dayjs'
import 'dayjs/locale/es'
import { ReporteService } from '../../../core/service/reporte/reporte.service';
import { MethodComuns } from '../../../utils/method';
import { TipoVehiculoService } from '../../../core/service/parqueo/tipo-vehiculo.service';
dayjs.locale("es");
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {
   valueRequest: any
   fechasBuscar: Date[];
   textFind: any
   paginacion: PaginancionRequest = {
    page: 0,
    size: 10,
    order: 'id',
    asc: true
   }
   filtros = {
    fecDesde: '',
    fecHasta: '',
    codigoOperacion: '',
    tipoVehiculo: 0
   }
   isFirst = false
   isLast = false
   totalPages: Array<number>
   ingresos:any[] = []
   tipoVehiculo: any[] = []
  constructor(private router: Router, private reportService: ReporteService, private tipoVehiService: TipoVehiculoService) {
    const navigation = router.getCurrentNavigation()
    this.valueRequest = navigation?.extras?.state
    if (this.valueRequest && Object.keys(this.valueRequest).length > 0) {
      this.ingresos = this.valueRequest.content
      this.isFirst = this.valueRequest.first
      this.isLast = this.valueRequest.last
      this.totalPages = new Array(this.valueRequest["totalPages"])
    } else {
      this.fetchIngreso()
    }
  }
  ngOnInit(): void {
    this.getipoVehiculo()
  }
  getipoVehiculo() {
    this.tipoVehiService.getAll().subscribe({
      next: (res) => {
        this.tipoVehiculo = res
      },
      error: (err) => {
        MethodComuns.toastNotificacion('error', err.message)
      }
    })
  }
  fetchIngreso(): void  {
    this.filtros.codigoOperacion = !this.filtros.codigoOperacion ? '' : this.filtros.codigoOperacion
    this.filtros.tipoVehiculo    = !this.filtros.tipoVehiculo ? 0 : this.filtros.tipoVehiculo
    this.reportService.getTotalClienteAllFilter(this.paginacion.page, this.paginacion.size, this.paginacion.order,
      this.paginacion.asc, this.filtros.fecDesde, this.filtros.fecHasta, this.filtros.codigoOperacion, this.filtros.tipoVehiculo
      ).subscribe({
      next: (res) => {
        if (res && Object.keys(res).length > 0 ) {
          this.isFirst = res.first
          this.isLast = res.last
          this.ingresos = res.content
          this.totalPages = new Array(res["totalPages"])
        }
      }, 
      error: (err) => {
        MethodComuns.toastNotificacion('error', err.message)
      }
    })
  }
  sort(): void {
    this.paginacion.asc = !this.paginacion.asc;
    this.fetchIngreso();
  }
  rewind(): void  {
    if (!this.isFirst) {
      this.paginacion.page--
      this.fetchIngreso()
    }
  }
  setPage(page: number): void {
    this.paginacion.page = page
    this.fetchIngreso()
  }
  forward (): void  {
    if (!this.isLast) {
      this.paginacion.page++
      this.fetchIngreso()
    }
  }
  setOrder(order: string): void {
    this.paginacion.order = order;
    this.fetchIngreso();
  }
  search() {
    if (this.fechasBuscar && this.fechasBuscar[0] != null && this.fechasBuscar[1] != null) {
      this.filtros.fecDesde = dayjs(this.fechasBuscar[0]).format("YYYY-MM-DD")
      this.filtros.fecHasta = dayjs(this.fechasBuscar[1]).format("YYYY-MM-DD")
      this.fetchIngreso()
    } else {
      MethodComuns.toastNotificacion('error', "Se requiere fecha desde y fecha hasta para la busqueda")
    }
  }
  buscarCode () {
    if (this.filtros.codigoOperacion && this.filtros.codigoOperacion.length === 6) {
      this.fetchIngreso()
    }
  }
  limpiar () {
    this.filtros.codigoOperacion = ''
    this.filtros.fecDesde = ''
    this.filtros.fecHasta = ''
    this.filtros.tipoVehiculo = 0
    this.fechasBuscar = []
    this.fetchIngreso()
  }
}
