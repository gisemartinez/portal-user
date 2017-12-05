import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as _ from "lodash";


@Injectable()
export class AuthInterceptorGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    localStorage.setItem('cachedurl', state.url);

    if ( this.validateLogin() ) {
      if ( this.validateRadiusCall() ) {
        this.router.navigate(['/waiting']);

        return false;

      } else {
        localStorage.setItem('isRadiusCalled',"true")
        return true;
      }
    } else {

      this.router.navigate(['/login']);

      return false;

    }
  }
  private validateLogin(): boolean {
    return localStorage.getItem('isLoggedIn') == "true" && !_.isEmpty(localStorage.getItem('token'))
  }

  private validateRadiusCall(): boolean {
    return localStorage.getItem('isRadiusCalled') == "true"
  }
}
