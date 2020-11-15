import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';

import {AlertService} from "./alert.service";

import {UserSocialLoginInfo} from "../models/user-social-login-info";
import {social_urls} from "../constants/social_login_keys.const";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {StorageItems} from "../models/storage-items";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

import {SocialLoginResponse} from "../models/social-login-response";

@Injectable()
export class SocialLoginService {

  loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(){
    return this.loggedIn.asObservable()
  }
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

    if(LocalStorageHandler.validateLogin() && localStorage.getItem('token') !== null) {
      this.loggedIn.next(true);
    }

    if (this.socialLoginConfig.hasCode()) {
        this.login()
          .subscribe((body:SocialLoginResponse) => {
              LocalStorageHandler.ackSocialLogin();
              LocalStorageHandler.setToken(body.token);
              LocalStorageHandler.setUsername(body.username);
              this.loading = false;
              this.loggedIn.next(true);
              window.location.href = this.storageItems.cachedURL;
            },
            error => {
              this.alertService.error(JSON.stringify(error));
              this.loading = false;
            }
          );

    }
  }

  private getRedirectUri(provider) {
    return social_urls[provider].redirectUri + '/' + LocalStorageHandler.getClient();
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
    this.loggedIn.next(false);
    this.router.navigate(['/login/'+ LocalStorageHandler.getClient()]);
  }

  public auth(provider: string, authConfig: any): void {

    LocalStorageHandler.setLoginSelection(authConfig[provider],provider);

    if (!LocalStorageHandler.validateLogin()) {
      window.location.href = social_urls[provider].url +
        social_urls[provider].clientId +
        '&redirect_uri=' +
        social_urls[provider].redirectUri +
        '/'+ LocalStorageHandler.getClient() +
        social_urls[provider].urlSuffix
    } else {
      window.location.href = this.storageItems.cachedURL;
    }
  }
}
