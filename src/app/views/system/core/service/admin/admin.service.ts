import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UriConstante } from '../../constantes/uri.constants';
import { UsuarioRequest } from '../../request/usuario.request';
import { RespuestaResponse } from '../../response/respuesta.request';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpp: HttpClient) { }
  
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
  getUsuario (): Observable<any> {
    return this.httpp.get(UriConstante.USUARIO)
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
