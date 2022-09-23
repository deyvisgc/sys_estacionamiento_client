import { HttpClient } from '@angular/common/http';
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
  getTotalClienteXmes(): Observable<any>  {
    return this.http.get(UriConstante.REPORTET_TOTAL_CLIENTES_MES)
  }
}
