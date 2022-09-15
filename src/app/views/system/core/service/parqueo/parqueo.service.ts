import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  save (vehiculo: VehiculoRequest): Observable<RespuestaResponse> {
    return this.http.post<RespuestaResponse>(UriConstante.PARQUEO, vehiculo)
  }
  update (usuario: UsuarioRequest): Observable<RespuestaResponse> {
    return this.http.put<RespuestaResponse>(UriConstante.USUARIO + usuario.id, usuario)
  }
  getById (id: number): Observable<any> {
    const URI = UriConstante.GETBYID.replace('{id}', id.toString())
    return this.http.get(URI)
  }
  delete (id: number): Observable<RespuestaResponse> {
    const URI = UriConstante.DELETE.replace('{id}', id.toString())
    return this.http.delete<RespuestaResponse>(URI)
  }
}
