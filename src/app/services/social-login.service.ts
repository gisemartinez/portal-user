import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';

import {AlertService} from "./alert.service";

import {UserSocialLoginInfo} from "../models/user-social-login-info";
import {social_urls} from "../constants/social_login_keys.const";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

import {SocialLoginResponse} from "../models/social-login-response";
import {authServerBaseUrl} from "../constants/misc.const";

@Injectable()
export class SocialLoginService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable()
  }

  private loading: boolean;
  private redirectUrl: string = authServerBaseUrl + "/login/";
  private visitorSocialLoginInfo: UserSocialLoginInfo;

  constructor(private http: HttpClient,
              private router: Router,
              private location: Location,
              private alertService: AlertService) {

    let params = new URLSearchParams(this.location.path(false).split('?')[1]);

    this.visitorSocialLoginInfo = new UserSocialLoginInfo(
      params.get('code'),
      this.redirectUrl + LocalStorageHandler.getClient(),
      LocalStorageHandler.getProvider())

    if (LocalStorageHandler.validateLogin() && LocalStorageHandler.getToken() !== null) {
      this.loggedIn.next(true);
    }

    if (this.visitorSocialLoginInfo.hasCode()) {
      this.login()
        .subscribe((body: SocialLoginResponse) => {
            LocalStorageHandler.ackSocialLogin();
            LocalStorageHandler.setToken(body.token);
            LocalStorageHandler.setUsername(body.username);
            this.loading = false;
            this.loggedIn.next(true);
            window.location.href = LocalStorageHandler.getCachedUrl();
          },
          error => {
            this.alertService.error(JSON.stringify(error));
            this.loading = false;
          }
        );

    }
  }


  login(): Observable<Object> {
    let url = authServerBaseUrl + "/auth/socialLogin/" + LocalStorageHandler.getClient() + "/" + this.visitorSocialLoginInfo.provider
    return this.http.post(
      url, this.visitorSocialLoginInfo);
  }


  logout(): void {
    LocalStorageHandler.setLogoutData();
    LocalStorageHandler.removeLoginData();
    this.loggedIn.next(false);
    this.router.navigate(['/login/' + LocalStorageHandler.getClient()]);
  }

  public auth(provider: string, authConfig: {
    socialMediaKeys: {
      [key: string]: {
        clientId: string,
        secret: string
      }
    }
  }): void {
    LocalStorageHandler.setProvider(provider)
    if (!LocalStorageHandler.validateLogin()) {
      let externalLoginPageURL = social_urls[provider].url +
        authConfig.socialMediaKeys[provider]['clientId'] +
        '&redirect_uri=' +
        this.redirectUrl + LocalStorageHandler.getClient() +
        social_urls[provider].urlSuffix

      window.location.href = externalLoginPageURL
    } else {
      window.location.href = LocalStorageHandler.getCachedUrl();
    }
  }
}
