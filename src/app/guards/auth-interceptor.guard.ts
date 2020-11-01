import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageHandler} from "./local-storage-handler";
import {AuthService} from "../services/auth.service";


@Injectable()
export class AuthInterceptorGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    let calledUrl = LocalStorageHandler.getCalledUrlWithParameters();
    if (!calledUrl || calledUrl.length == 0) {
      LocalStorageHandler.setCalledUrlWithParameters(state.url);
    }

          if (!LocalStorageHandler.validateLogin()) {
            this.router.navigate(['/login', state.root.queryParams.client]);
            LocalStorageHandler.setClient(state.root.queryParams.client);
            return false;
          } else {
            if (LocalStorageHandler.isRadiusCalled()) {
              this.router.navigate(['/main']);
              return false;
            } else {
              LocalStorageHandler.ackRadiusCall();
              return true;
            }
          }
  }
}
