import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageHandler} from "./local-storage-handler";
import {Title} from "@angular/platform-browser";


@Injectable()
export class AuthInterceptorGuard implements CanActivate {

  constructor(private router: Router, private titleService: Title) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    let calledUrl = LocalStorageHandler.getCachedUrl();
    if (!calledUrl || calledUrl.length == 0) {
      LocalStorageHandler.setCachedUrl(state.url);
    }
    //When a visitor first request portal and gets redirected to /login, web title is unknown.
    //When client is fetched with auth data, a local storage entry with clientName is saved.
    // It also changes web title, but any other title change will happen in this guard
    this.titleService.setTitle(LocalStorageHandler.getClientName() || "Portal");

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
