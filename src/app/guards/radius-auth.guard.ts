import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LocalStorageHandler} from "./local-storage-handler";

@Injectable()
export class RadiusAuthGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

    if (LocalStorageHandler.validateLogin()) {
      if (LocalStorageHandler.validateRadiusCall()) {
        if (LocalStorageHandler.validateRadiusLoginChecked()){
          return true;
        } else {
          this.router.navigate(['/waiting']);
          return false;
        }

      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {

      this.router.navigate(['/login']);
      return false;

    }
  }
}
