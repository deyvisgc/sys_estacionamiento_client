import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MethodComuns } from '../../utils/method';

import { Router } from '@angular/router';
import { LoginService } from '../service/auth/login.service';
import { KeySession } from '../constantes/key_session';
@Injectable()
export class JwtIResponsenterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: LoginService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (request.url.includes("login")) {
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              if(event.headers.has('Authorization')) {
                this.router.navigate(['/dashboard']);
                const token = event.headers.get('Authorization').split(" ")
                MethodComuns.toastNotificacion('success', "Bienvenido al Sistema de establecimiento")
                this.authService.addToken(token[2])
                this.authService.addAuthorites(token[2])
              }
            return null;
          }
        }));
      }
      return next.handle(request)
    }
}
