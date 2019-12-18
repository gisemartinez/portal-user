import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageHandler} from "./local-storage-handler";
import {SocialLoginService} from "../services/social-login.service";
import {getStringInitializerFromProperty} from "codelyzer/util/astQuery";


@Injectable()
export class AuthInterceptorGuard implements CanActivate {

  constructor(private router: Router, private authService: SocialLoginService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    let calledUrl = LocalStorageHandler.getCalledUrlWithParameters();
    if ( !calledUrl || calledUrl.length == 0 ) {
      LocalStorageHandler.setCalledUrlWithParameters(state.url);
    }

    return this.authService.isLoggedIn
      .take(1)
      .map((isLoggedIn: boolean) => {
        if (!isLoggedIn){
          this.router.navigate(['/login',state.root.queryParams.client]);
          LocalStorageHandler.setClient(state.root.queryParams.client);
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
  }
}
