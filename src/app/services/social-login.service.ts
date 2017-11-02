import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot} from "@angular/router";
import {Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map'
import {AlertService} from "./alert.service";


@Injectable()
export class SocialLoginService {

  private configObj = {"authEndpoint":"","clientId":"","redirectURI":""};
  private code:string;
  private cachedURL:string;
  private loginProvider: string;
  private loading: boolean;
  private loginURI: string;
  constructor(private http: Http, private router:Router,
              private location: Location, private alertService:AlertService) {
    let config = localStorage.getItem("authConfig");
    let provider = localStorage.getItem("provider");
    let cachedURL = localStorage.getItem('cachedurl');
    let params = new URLSearchParams(this.location.path(false).split('?')[1]);
    this.code = params.get('code');

    if(config){
      this.configObj = JSON.parse(config)[provider];
      this.loginURI =  JSON.parse(config).loginRoute;
    }
    if(provider){
      this.loginProvider =  provider;
    }
    if(cachedURL){
      this.cachedURL = cachedURL;
    }
    if (this.code) {
      this.login(this.code, this.configObj.clientId, this.configObj.redirectURI, this.configObj.authEndpoint)
        .subscribe((data: any) => {
          this.loading = false;
          this.router.navigate([this.cachedURL]);
          return true;
        },
          error =>{
            this.alertService.error(error);
            this.loading = false;}
        );
    }
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

  login(code:any,clientId:any,redirectURI:any,authEndpoint:any){

    var body = {"code" : code,"clientId" : clientId,"redirectUri":redirectURI};

    return this.http.post(authEndpoint, body)
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
    localStorage.setItem('isLoggedIn',"false");
    localStorage.removeItem('token');
    localStorage.removeItem('cachedurl');
    localStorage.removeItem('provider');
    this.router.navigate([this.loginURI]);
  }
  verifyLogin(url):boolean{

    if(!this.isLoggedIn() && this.code == null){
      localStorage.setItem('cachedurl',url);
      this.router.navigate([this.loginURI]);
      return false;
    }
    else if(this.isLoggedIn()){
      return true;
    }
    else if(!this.isLoggedIn()  && this.code != null){
      let params = new URLSearchParams(this.location.path(false).split('?')[1]);
      if(params.get('code') && (localStorage.getItem('cachedurl') == "" || localStorage.getItem('cachedurl') == undefined)){
        localStorage.setItem('cachedurl',this.location.path(false).split('?')[0]);
      }
      if(this.cachedURL != null || this.cachedURL != ""){
        this.cachedURL = localStorage.getItem('cachedurl');
      }
    }
  }
  private isLoggedIn(): boolean{
    let status = false;
    if( localStorage.getItem('isLoggedIn') == "true"){
      status = true;
    }
    else{
      status = false;
    }
    return status;
  }
  public auth(provider:string, authConfig: any):void{

    localStorage.setItem("authConfig",JSON.stringify(authConfig));
    localStorage.setItem("provider",provider);

    if(provider == "linkedin" && !this.isLoggedIn()){
      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?client_id='+authConfig.linkedin.clientId+'&redirect_uri='+authConfig.linkedin.redirectURI+'&response_type=code';
    }
    if(provider == "facebook" && !this.isLoggedIn()){
      window.location.href = 'https://www.facebook.com/v2.8/dialog/oauth?client_id='+authConfig.facebook.clientId+'&redirect_uri='+authConfig.facebook.redirectURI+'&scope=email';
    }
    if(provider == "google" && !this.isLoggedIn()){
      window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id='+authConfig.google.clientId+'&redirect_uri='+authConfig.google.redirectURI+'&scope=email%20profile';
    }
    else{
      this.router.navigate([this.cachedURL]);
    }
  }


}
