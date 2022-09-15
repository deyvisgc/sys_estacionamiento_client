import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UriConstante } from '../../constantes/uri.constants';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  constructor(private http: HttpClient) { }
  getAll (): Observable<any> {
    return this.http.get(UriConstante.TIPOVEHICULO)
  }
}
