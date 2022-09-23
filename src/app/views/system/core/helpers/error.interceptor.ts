import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MethodComuns } from '../../utils/method';
import { Router } from '@angular/router';
import { KeySession } from '../constantes/key_session';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.authenticationService.logout();
                location.reload();
            }
            if (err.status === 403) {
                console.log("err" + err)
                if (request.url.includes("login")) MethodComuns.toastNotificacion("error", "Usuario o contraseña invalidos.")
                else  MethodComuns.toastNotificacion("error", "Session terminada vuelva a iniciar session")
                window.sessionStorage.clear
                //location.reload();
            }
            //const error = err.error.message || err.error.code;
            console.log("err" + JSON.stringify(err))
            return throwError(err.error);
        }))
    }
}
