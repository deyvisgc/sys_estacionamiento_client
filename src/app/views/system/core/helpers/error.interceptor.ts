import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MethodComuns } from '../../utils/method';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.authenticationService.logout();
                location.reload();
            }
            if (err.status === 403) {
                if (request.url.includes("login")) MethodComuns.toastNotificacion("error", "Usuario o contraseña invalidos.")
                else  MethodComuns.toastNotificacion("error", "Session terminada vuelva a iniciar session")
                
            }
            //const error = err.error.message || err.error.code;
            console.log("err" + err)
            return throwError(err.error);
        }))
    }
}
