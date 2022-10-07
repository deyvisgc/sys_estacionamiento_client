import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MethodComuns } from '../../../utils/method';
import { KeySession } from '../../constantes/key_session';
import { UriConstante } from '../../constantes/uri.constants';
import { RespuestaResponse } from '../../response/respuesta.request';
import { LoginRequest } from './../../request/login.request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  roles: Array<string> = [];
  constructor(private http: HttpClient, private route: Router) {
  }

  login (auth: LoginRequest): Observable<any> {
    return this.http.post(UriConstante.LOGIN, auth)
  }
  addToken(token: string): void {
    sessionStorage.setItem(KeySession.TOKEN, token)
  }
  addAuthorites(token: string): void {
    const tokenParse = this.parseToken(token)
    window.sessionStorage.removeItem(KeySession.ROLES);
    // console.log("tokenParse.data.authorities", tokenParse.data.authorities)
    sessionStorage.setItem(KeySession.ROLES, JSON.stringify(tokenParse.data.authorities))
  }
  isLoggedInUser(): boolean {
    const authToken = this.getToken()
    return (authToken != null) ? true : false;
  }

  getToken (): string {
    return sessionStorage.getItem(KeySession.TOKEN)
  }
  getUsers (): any {
    if (sessionStorage.getItem(KeySession.TOKEN)) {
      const token = this.parseToken(sessionStorage.getItem(KeySession.TOKEN))
      return token.data.usuario;
    }
  }
  getAuthorites (): string[] {
    this.roles = [];
    if (sessionStorage.getItem(KeySession.ROLES)) {
      JSON.parse(sessionStorage.getItem(KeySession.ROLES)).forEach((r: any) => {
        this.roles.push(r);
      });
    }
    return this.roles;
  }
  isAdmin(): boolean {
    const tokenParse = this.getAuthorites() // si no existe ningun usuario ROLE_ADMIN DEVOLVERA UN -1
    return tokenParse.indexOf("ROLE_ADMIN") < 0 ? false : true
  }
  onLogOut(): void {
    window.sessionStorage.clear() // limpio todo el session storage
    this.route.navigate(["/"])
  }
  parseToken(token: string) {
   return MethodComuns.decodeToken(token)
  }
  // CONFIGURACION
  fetchConfiguracion(): Observable<any> {
    return this.http.get(UriConstante.CONFIGURACION)
  }
  fetchById(id:number): Observable<any> {
    return this.http.get(UriConstante.CONFIGURACION + id)
  }
  saveConfiguracion(api_url: string, api_token: string, type_api: string):Observable<RespuestaResponse> {
    return this.http.post<RespuestaResponse>(UriConstante.CONFIGURACION, {urlApi: api_url, token: api_token, typeApi: type_api})
  }
  updateConfiguracion(id:number, api_url: string, api_token: string, type_api: string) :Observable<RespuestaResponse> {
    return this.http.put<RespuestaResponse>(UriConstante.CONFIGURACION + id, {urlApi: api_url, token: api_token, typeApi: type_api})
  }
  sendEmail(correo: string): Observable<RespuestaResponse> {
    return this.http.get<RespuestaResponse>(UriConstante.SEND_EMAIL + correo)
  }
  changePassword(password: string, tokenPassword: string): Observable<RespuestaResponse> {
    return this.http.put<RespuestaResponse>(UriConstante.CHANGE_PASSWORD, {password: password, tokenPassword: tokenPassword})
  }
}
