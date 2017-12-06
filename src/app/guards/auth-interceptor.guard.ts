import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as _ from "lodash";
import {LocalStorageHandler} from "./local-storage-handler";


@Injectable()
export class AuthInterceptorGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    if (_.isEmpty(LocalStorageHandler.getCalledUrlWithParameters())) {
      LocalStorageHandler.setCalledUrlWithParameters(state.url);
    }

    if (LocalStorageHandler.validateLogin()) {
      if (LocalStorageHandler.validateRadiusCall()) {
        //This result from navigating trough portal after the radius first call, before radius give internet access
        this.router.navigate(['/waiting']);
        return false;

      } else {
        LocalStorageHandler.ackRadiusCall();
        return true;
      }
    } else {

      this.router.navigate(['/login']);
      return false;

    }
  }
}
