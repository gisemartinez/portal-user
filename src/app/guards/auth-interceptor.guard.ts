import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from "lodash";
import {LocalStorageHandler} from "./local-storage-handler";
import {SocialLoginService} from "../services/social-login.service";


@Injectable()
export class AuthInterceptorGuard implements CanActivate {

  constructor(private router: Router, private authService: SocialLoginService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    if (_.isEmpty(LocalStorageHandler.getCalledUrlWithParameters())) {
      LocalStorageHandler.setCalledUrlWithParameters(state.url);
    }

    return this.authService.isLoggedIn       // {1}
      .take(1)                               // {2}
      .map((isLoggedIn: boolean) => {        // {3}
        if (!isLoggedIn){
          this.router.navigate(['/login']);  // {4}
          return false;
        } else {
          if (LocalStorageHandler.validateRadiusCall()) {
            this.router.navigate(['/waiting']);
            return false;

          } else {
            LocalStorageHandler.ackRadiusCall();
            return true;
          }
        }

      });

   /* if (LocalStorageHandler.validateLogin()) {
      if (LocalStorageHandler.validateRadiusCall()) {
        this.router.navigate(['/waiting']);
        return Observable.create(false);

      } else {
        LocalStorageHandler.ackRadiusCall();
        return Observable.create(true);
      }
    } else {


      this.router.navigate(['/login']);
      return false;

    }*/
  }
}
