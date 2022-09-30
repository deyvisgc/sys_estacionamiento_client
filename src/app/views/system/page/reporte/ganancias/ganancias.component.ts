import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { PaginancionRequest } from '../../../core/request/paginacion.request';
import { ParqueoService } from '../../../core/service/parqueo/parqueo.service';
import { TipoVehiculoService } from '../../../core/service/parqueo/tipo-vehiculo.service';
import { ReporteService } from '../../../core/service/reporte/reporte.service';
import { MethodComuns } from '../../../utils/method';

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.component.html',
  styleUrls: ['./ganancias.component.scss']
})
export class GananciasComponent implements OnInit {
  valueRequest: any
  fechaBuscar: Date[];
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
   codigoTarifa: '',
   tipoVehiculo: 0,
   placa: ''
  }
  isFirst = false
  isLast = false
  totalPages: Array<number>
  ganancias:any[] = []
  tipoVehiculo: any[] = []
  displayBasic: boolean;
  vehiculo: any
  constructor(private router: Router, private reportService: ReporteService,  private tipoVehiService: TipoVehiculoService, private parqueoService: ParqueoService) {
    const navigation = this.router.getCurrentNavigation()
    this.valueRequest = navigation?.extras?.state
    if (this.valueRequest && Object.keys(this.valueRequest).length > 0) {
      this.ganancias = this.valueRequest.content
      this.isFirst = this.valueRequest.first
      this.isLast = this.valueRequest.last
      this.totalPages = new Array(this.valueRequest["totalPages"])
    } else {
      this.fetchGanancias()
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
  fetchGanancias () {
    this.filtros.codigoTarifa = !this.filtros.codigoTarifa ? '' : this.filtros.codigoTarifa
    this.filtros.placa = !this.filtros.placa ? '' : this.filtros.placa
    this.filtros.tipoVehiculo    = !this.filtros.tipoVehiculo ? 0 : this.filtros.tipoVehiculo
    this.reportService.getTotalGananciasAllFilter(this.paginacion.page, this.paginacion.size, this.paginacion.order,
      this.paginacion.asc, this.filtros.fecDesde, this.filtros.fecHasta, this.filtros.codigoTarifa, this.filtros.tipoVehiculo, this.filtros.placa
      ).subscribe({
      next: (res) => {
        if (res && Object.keys(res).length > 0 ) {
          this.isFirst = res.first
          this.isLast = res.last
          this.ganancias = res.content
          this.totalPages = new Array(res["totalPages"])
        }
      }, 
      error: (err) => {
        MethodComuns.toastNotificacion('error', err.message)
      }
    })
  }
  search () {
    if (this.fechaBuscar && this.fechaBuscar[0] != null && this.fechaBuscar[1] != null) {
      this.filtros.fecDesde = dayjs(this.fechaBuscar[0]).format("YYYY-MM-DD")
      this.filtros.fecHasta = dayjs(this.fechaBuscar[1]).format("YYYY-MM-DD")
      this.fetchGanancias()
    } else {
      MethodComuns.toastNotificacion('error', "Se requiere fecha desde y fecha hasta para la busqueda")
    }
  }
  buscarCode () {
    if (this.filtros.codigoTarifa && this.filtros.codigoTarifa.length === 6) {
      this.fetchGanancias()
    }
  }
  buscarPlaca () {
    if (this.filtros.placa && this.filtros.placa.length === 7) {
      this.fetchGanancias()
    }
  }
  sort(): void {
    this.paginacion.asc = !this.paginacion.asc;
    this.fetchGanancias();
  }
  rewind(): void  {
    if (!this.isFirst) {
      this.paginacion.page--
      this.fetchGanancias()
    }
  }
  setPage(page: number): void {
    this.paginacion.page = page
    this.fetchGanancias()
  }
  forward (): void  {
    if (!this.isLast) {
      this.paginacion.page++
      this.fetchGanancias()
    }
  }
  setOrder(order: string): void {
    this.paginacion.order = order;
    this.fetchGanancias();
  }
  limpiar () {
    this.filtros = {
      fecDesde: '',
      fecHasta: '',
      codigoTarifa: '',
      tipoVehiculo: 0,
      placa: ''
     }
     this.fechaBuscar = []
    this.fetchGanancias();
  }
  vehiculoXid (id: number) {
    this.parqueoService.getById(id).subscribe({
      next: (res) => {
        this.displayBasic = true;
        this.vehiculo = [res]
      },
      error: (err) => {
        MethodComuns.toastNotificacion('error', err.message)
      }
    })
  }

}
