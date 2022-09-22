import { HttpClient, HttpParams } from '@angular/common/http';
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
  getUsuario (page: number,  size: number, order: string, asc: boolean): Observable<any> {
    const params = new HttpParams()
    .set("page", page)
    .set("size", size)
    .set("order", order)
    .set("asc", asc)
    return this.httpp.get(UriConstante.USUARIO, {params: params})
  }
  getById (id: number): Observable<any> {
    const URI = UriConstante.GETBYID.replace('{id}', id.toString())
    return this.httpp.get(URI)
  }
  getRol (): Observable<any> {
    return this.httpp.get(UriConstante.USUARIO + 'rol')
  }
  getRolByIdUsers (id: number): Observable<any> {
    return this.httpp.get(UriConstante.USUARIO + 'users-rol/' + id)
  }
  delete (id: number): Observable<RespuestaResponse> {
    const URI = UriConstante.DELETE.replace('{id}', id.toString())
    return this.httpp.delete<RespuestaResponse>(URI)
  }
}
