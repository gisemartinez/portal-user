import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RadiusAuthGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

    if( localStorage.getItem('isRadiusAccepted') == "true"){
      return true;
    }

    this.router.navigate(['/waiting'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
