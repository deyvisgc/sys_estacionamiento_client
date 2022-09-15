import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UriConstante } from '../../constantes/uri.constants';
import { RespuestaResponse } from '../../response/respuesta.request';
import { UsuarioRequest } from '../../request/usuario.request';
@Injectable({
  providedIn: 'root'
})
export class OperacionService {

  constructor(private httpp: HttpClient) { }
  getAll (): Observable<any> {
    return this.httpp.get(UriConstante.PARQUEO)
  }
  buscarReniec (dni: string): Observable<any> {
    const URI = UriConstante.USUARIO_BUSCAR_DNI.replace('{dni}', dni)
    return this.httpp.get(URI)
  }
  save (usuario: UsuarioRequest): Observable<RespuestaResponse> {
    return this.httpp.post<RespuestaResponse>(UriConstante.USUARIO, usuario)
  }
  update (usuario: UsuarioRequest): Observable<RespuestaResponse> {
    return this.httpp.put<RespuestaResponse>(UriConstante.USUARIO + usuario.id, usuario)
  }
  getById (id: number): Observable<any> {
    const URI = UriConstante.GETBYID.replace('{id}', id.toString())
    return this.httpp.get(URI)
  }
  delete (id: number): Observable<RespuestaResponse> {
    const URI = UriConstante.DELETE.replace('{id}', id.toString())
    return this.httpp.delete<RespuestaResponse>(URI)
  }
}
