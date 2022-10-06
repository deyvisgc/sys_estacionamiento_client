import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UriConstante } from '../../constantes/uri.constants';
import { RespuestaResponse } from '../../response/respuesta.request';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  constructor(private http: HttpClient) { }
  getAll (): Observable<any> {
    return this.http.get(UriConstante.TIPOVEHICULO)
  }
  fetch(page: number,  size: number, order: string, asc: boolean): Observable<any> {
    const params = new HttpParams()
    .set("page", page)
    .set("size", size)
    .set("order", order)
    .set("asc", asc)
    return this.http.get(UriConstante.TIPOVEHICULO_PAGINACION, {params: params})
  }
  fetchById(id:number): Observable<any> {
    const URI = UriConstante.TIPOVEHICULOBYID.replace("{id}", id.toString())
    return this.http.get(URI)
  }
  save (descripcion: string, precio: number): Observable<RespuestaResponse> {
    return this.http.post<RespuestaResponse>(UriConstante.TIPOVEHICULO, {descripcion: descripcion, precioHora: precio})
  }
  update (id:number, descripcion: string, precio: number): Observable<RespuestaResponse> {
    return this.http.put<RespuestaResponse>(UriConstante.TIPOVEHICULO + id, {descripcion: descripcion, precioHora: precio})
  }
  delete (id: number): Observable<RespuestaResponse> {
    const URI = UriConstante.TIPOVEHICULOBYID.replace('{id}', id.toString())
    return this.http.delete<RespuestaResponse>(URI)
  }
}
