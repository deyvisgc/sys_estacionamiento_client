import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UriConstante } from '../../constantes/uri.constants';
import { RespuestaResponse } from '../../response/respuesta.request';
import { UsuarioRequest } from '../../request/usuario.request';
import { VehiculoRequest } from '../../request/vehiculo.request';
@Injectable({
  providedIn: 'root'
})
export class ParqueoService {

  constructor(private http: HttpClient) { }
  getAll (): Observable<any> {
    return this.http.get(UriConstante.PARQUEO)
  }
  ingreso (vehiculo: VehiculoRequest): Observable<RespuestaResponse> {
    return this.http.post<RespuestaResponse>(UriConstante.PARQUEO, vehiculo)
  }
  salida (codigoOperacion: string): Observable<RespuestaResponse> {
    const URI = UriConstante.SALIDAPARQUEO.replace('{codigoOperacion}', codigoOperacion)
    return this.http.put<RespuestaResponse>(URI, {});
  }
  export (id_vechicle: number) {
    const URI = UriConstante.PARQUEO + 'export/' + id_vechicle
    return this.http.get(URI, {responseType: 'blob'})
  }
  update (vehiculo: VehiculoRequest): Observable<RespuestaResponse> {
    return this.http.put<RespuestaResponse>(UriConstante.PARQUEO, vehiculo)
  }
  getById (id: number): Observable<any> {
    const URI = UriConstante.GETBYIDPARQUEO.replace('{id}', id.toString())
    return this.http.get(URI)
  }
  buscarCodigoOperacion (codigoOperacion: string): Observable<any> {
    const params = new HttpParams()
    .set("code", codigoOperacion)
    return this.http.get(UriConstante.BUSCARXCODIGOOPERACION, {params: params})
  }
  delete (id: number): Observable<RespuestaResponse> {
    const URI = UriConstante.DELETEVEHICULO.replace('{id}', id.toString())
    return this.http.delete<RespuestaResponse>(URI)
  }
}
