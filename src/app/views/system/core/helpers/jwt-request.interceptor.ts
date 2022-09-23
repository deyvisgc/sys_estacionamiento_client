import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../service/auth/login.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtRequestInterceptor implements HttpInterceptor {
    constructor(private authService: LoginService, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedInUser()) {
          request = request.clone({
            setHeaders: {
              authorization: `Bearer ${this.authService.getToken()}`,
            }
          })
        }
        return next.handle(request);
    }
}
