import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot} from "@angular/router";
import {Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import 'rxjs/add/operator/map'
import {AlertService} from "./alert.service";
import * as _ from "lodash";
import {SocialLoginInfo} from "../models/social-login-info";
import {social_urls} from "../constants/social_login_keys.const";

@Injectable()
export class SocialLoginService {

  private code: string;
  private cachedURL: string;
  private loginProvider: string;
  private authEndpoint: string;
  private loading: boolean;
  private loginURI: string;

  constructor(private http: Http,
              private router: Router,
              private location: Location,
              private alertService: AlertService) {


    let localStorageItems = this.getItemsFromLocalStorage();

    let params = new URLSearchParams(this.location.path(false).split('?')[1]);

    let socialLoginconfig = new SocialLoginInfo();

    socialLoginconfig.code = params.get('code');

    if (!_.isEmpty(localStorageItems.config) && localStorageItems.config != "undefined") {
      let configObj = JSON.parse(localStorageItems.config);
      socialLoginconfig.clientId = configObj[localStorageItems.provider].clientId;
      socialLoginconfig.redirectUri = configObj[localStorageItems.provider].redirectUri;
      this.authEndpoint = configObj[localStorageItems.provider].authEndpoint;
      this.loginURI = configObj[localStorageItems.provider].loginRoute;
    }

    if (!_.isEmpty(localStorageItems.provider)) {
      this.loginProvider = localStorageItems.provider;
    }

    if (!_.isEmpty(localStorageItems.cachedURL)) {
      this.cachedURL = localStorageItems.cachedURL;
    }


    if (!_.isEmpty(socialLoginconfig.code)) {
      this.login(socialLoginconfig, this.authEndpoint)
        .subscribe((data: any) => {
            this.loading = false;
            window.location.href = this.cachedURL;
            return true;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }
  }

  private getItemsFromLocalStorage() {
    return {
      config: localStorage.getItem("authConfig"),
      provider: localStorage.getItem("provider"),
      cachedURL: localStorage.getItem('cachedurl')
    };
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.verifyLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.verifyLogin(url);
  }

  login(socialLoginInfo: SocialLoginInfo, authEndpoint: any) {

    return this.http.post(authEndpoint, socialLoginInfo)
      .map((r: Response) => {
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', r.json().token);
        return r.json()
      });


  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('cachedurl');
    localStorage.removeItem('provider');
    this.router.navigate([this.loginURI]);
  }
  //TODO : OBSERVE IF ITS NECESSARY THIS STEP

  verifyLogin(url): boolean {

    if (!this.isLoggedIn() && this.code == null) {
      //localStorage.setItem('cachedurl', url);
      this.router.navigate([this.loginURI]);
      return false;
    }
    else if (this.isLoggedIn()) {
      return true;
    }
    else if (!this.isLoggedIn() && this.code != null) {
      let params = new URLSearchParams(this.location.path(false).split('?')[1]);
      if (params.get('code') && (localStorage.getItem('cachedurl') == "" || localStorage.getItem('cachedurl') == undefined)) {
        //localStorage.setItem('cachedurl', this.location.path(false).split('?')[0]);
      }
      if (this.cachedURL != null || this.cachedURL != "") {
        this.cachedURL = localStorage.getItem('cachedurl');
      }
    }
  }

  private isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedIn') == "true") {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }

  public auth(provider: string, authConfig: any): void {

    localStorage.setItem("authConfig", JSON.stringify(authConfig));
    localStorage.setItem("provider", provider);

    if (!this.isLoggedIn()) {
      window.location.href = social_urls[provider].url +
        social_urls[provider].clientId +
        '&redirect_uri=' +
        social_urls[provider].redirectUri +
        social_urls[provider].urlSuffix
    } else {
      window.location.href = this.cachedURL;
    }
  }


}
