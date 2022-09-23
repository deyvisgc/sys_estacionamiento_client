import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './views/system/core/service/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProGuard implements CanActivate {
  realRol: string;
  constructor(
    private tokenService: LoginService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRol = route.data["expectedRol"];
      const role = this.tokenService.getAuthorites()
      this.realRol = '';
      role.forEach((r: any) => this.realRol = r);
      if (!this.tokenService.getToken() ) {
        this.router.navigate(['/']); // envia al login
        return false;
      }
      if (expectedRol.indexOf(this.realRol) === -1) {
        this.router.navigate(['/not-autorized']); // envia al login
        return false;
      }
    return true;
  }
  
}
