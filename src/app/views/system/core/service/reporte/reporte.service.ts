import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UriConstante } from '../../constantes/uri.constants';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }
  getTotalCliente(): Observable<any>  {
    return this.http.get(UriConstante.REPORTET_TOTAL_CLIENTES)
  }
  getTotalUsuario(): Observable<any>  {
    return this.http.get(UriConstante.REPORTET_TOTAL_USUARIO)
  }
  getTotalGanancias(): Observable<any>  {
    return this.http.get(UriConstante.REPORTET_TOTAL_GANANCIAS)
  }
  getTotalNuevosIngresos(): Observable<any>  {
    return this.http.get(UriConstante.REPORTET_TOTAL_NUEVO_INGRESOS)
  }
  getTotalComprobantes(): Observable<any>  {
    return this.http.get(UriConstante.REPORTET_TOTAL_COMPROBANTES)
  }
  getTotalClienteAllmes(): Observable<any>  {
    return this.http.get(UriConstante.REPORTET_TOTAL_CLIENTES_ALL_MES)
  }
  getTotalGananciasAllMes(): Observable<any>  {
    return this.http.get(UriConstante.REPORTET_TOTAL_GANANCIAS_ALL_MES)
  }
  getTotalClienteXMes(mes:string, page: number,  size: number, order: string, asc: boolean): Observable<any>  {
    const params = new HttpParams()
    .set("page", page)
    .set("size", size)
    .set("order", order)
    .set("asc", asc)
    .set("mes", mes.toUpperCase())
    return this.http.get(UriConstante.REPORTET_TOTAL_CLIENTES_X_MES, {params: params})
  }
  getTotalClienteAllFilter(page: number,  size: number, order: string, asc: boolean, 
    fecDesde: string, fecHasta: string, codigoOperacion: string, tipoVehiculo: number): Observable<any>  {
    const params = new HttpParams()
    .set("page", page)
    .set("size", size)
    .set("order", order)
    .set("asc", asc)
    .set("fecDesde", fecDesde)
    .set("fecHasta", fecHasta)
    .set("codigoOperacion", codigoOperacion)
    .set("tipoVehiculo", tipoVehiculo)
    return this.http.get(UriConstante.REPORTET_TOTAL_CLIENTES_X_MES_FILTROS, {params: params})
  }
  // getTotalGananciasXMes(mes:string): Observable<any>  {
  //   const URI = UriConstante.REPORTET_TOTAL_GANANCIAS_X_MES.replace('{mes}', mes.toUpperCase())
  //   return this.http.get(URI)
  // }
  getTotalGananciasXMes(mes:string, page: number,  size: number, order: string, asc: boolean): Observable<any>  {
    const params = new HttpParams()
    .set("page", page)
    .set("size", size)
    .set("order", order)
    .set("asc", asc)
    .set("mes", mes.toUpperCase())
    return this.http.get(UriConstante.REPORTET_TOTAL_GANANCIAS_X_MES, {params: params})
  }
  getTotalGananciasAllFilter(page: number,  size: number, order: string, asc: boolean, 
    fecDesde: string, fecHasta: string, codigoTarifa: string, tipoVehiculo: number, placa: string): Observable<any>  {
    const params = new HttpParams()
    .set("page", page)
    .set("size", size)
    .set("order", order)
    .set("asc", asc)
    .set("fecDesde", fecDesde)
    .set("fecHasta", fecHasta)
    .set("codigoTarifa", codigoTarifa)
    .set("tipoVehiculo", tipoVehiculo)
    .set("placa", placa)
    return this.http.get(UriConstante.REPORTET_TOTAL_GANANCIAS_X_MES_FILTROS, {params: params})
  }
}
