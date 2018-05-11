import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot} from "@angular/router";
import {Location} from '@angular/common';

import {AlertService} from "./alert.service";

import {UserSocialLoginInfo} from "../models/user-social-login-info";
import {social_urls} from "../constants/social_login_keys.const";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {StorageItems} from "../models/storage-items";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class SocialLoginService {

  private authEndpoint: string;
  private loading: boolean;
  private loginURI: string = "/login";
  private socialLoginConfig: UserSocialLoginInfo = new UserSocialLoginInfo();
  private storageItems: StorageItems;

  constructor(private http: HttpClient,
              private router: Router,
              private location: Location,
              private alertService: AlertService) {

    let params = new URLSearchParams(this.location.path(false).split('?')[1]);

    this.socialLoginConfig.setCode(params.get('code'));

    this.setStorageItems();

    if (this.storageItems.hasProvider()) {
      this.socialLoginConfig.setProvider(this.storageItems.provider);
      this.socialLoginConfig.setRedirectUri(this.getRedirectUri(this.storageItems.provider));
      this.setLoginURI(this.socialLoginConfig.redirectUri);
    }

    if (this.storageItems.hasConfig()) {
      this.setAuthEndpoint();
    }


    if (this.socialLoginConfig.hasCode()) {
      this.login()
        .subscribe((body:{token:string;username:string}) => {
            LocalStorageHandler.ackSocialLogin();
            LocalStorageHandler.setToken(body.token);
            LocalStorageHandler.setUsername(body.username);
            this.loading = false;
            window.location.href = this.storageItems.cachedURL;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }
  }

  private getRedirectUri(provider) {
    return social_urls[provider].redirectUri;
  }


  private setAuthEndpoint() {
    this.authEndpoint = this.storageItems.config.authEndpoint;
  }

  private setLoginURI(loginRoute) {
    this.loginURI = loginRoute;
  }


  private setStorageItems() {
    this.storageItems = new StorageItems(
      JSON.parse(localStorage.getItem("authConfig")),
      localStorage.getItem("provider"),
      localStorage.getItem("cachedurl")
    )
  }


  login(): Observable<Object> {
    return this.http.post(this.authEndpoint, this.socialLoginConfig);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  logout(): void {
    LocalStorageHandler.setLogoutData();
    LocalStorageHandler.removeLoginData();
    this.router.navigate([this.loginURI]);
  }



  private isLoggedIn(): boolean {
    return (localStorage.getItem('isLoggedIn') == "true");
  }

  public auth(provider: string, authConfig: any): void {

    LocalStorageHandler.setLoginSelection(authConfig[provider],provider);

    if (!this.isLoggedIn()) {
      window.location.href = social_urls[provider].url +
        social_urls[provider].clientId +
        '&redirect_uri=' +
        social_urls[provider].redirectUri +
        social_urls[provider].urlSuffix
    } else {
      window.location.href = this.storageItems.cachedURL;
    }
  }


}
