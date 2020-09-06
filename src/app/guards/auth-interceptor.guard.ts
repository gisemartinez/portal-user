import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageHandler} from "./local-storage-handler";
import {AuthService} from "../services/auth.service";
import {take, map} from "rxjs/operators";


@Injectable()
export class AuthInterceptorGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    let calledUrl = LocalStorageHandler.getCalledUrlWithParameters();
    if (!calledUrl || calledUrl.length == 0) {
      LocalStorageHandler.setCalledUrlWithParameters(state.url);
    }

    return this.authService.isLoggedIn$
      .pipe(take(1))
      .pipe(
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['/login', state.root.queryParams.client]);
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
        }));
  }
}
