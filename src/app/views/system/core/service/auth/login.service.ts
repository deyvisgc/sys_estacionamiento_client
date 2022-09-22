import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeySession } from '../../constantes/key_session';
import { UriConstante } from '../../constantes/uri.constants';
import { LoginRequest } from './../../request/login.request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login (auth: LoginRequest): Observable<any> {
    return this.http.post(UriConstante.LOGIN, auth)
  }
  logout(): void {
    sessionStorage.removeItem(KeySession.TOKEN)
  }
  addToken(token: string): void {
    sessionStorage.setItem(KeySession.TOKEN, token)
  }

  isLoggedInUser(): boolean {
    const authToken = this.getToken()
    return (authToken != null) ? true : false;
  }

  getToken (): string {
    return sessionStorage.getItem(KeySession.TOKEN)
  }
}
