import {Router} from "@angular/router";
import * as _ from "lodash";

export class LocalStorageHandler {


  public static validateLogin(): boolean {
    return localStorage.getItem('isLoggedIn') == "true" && !_.isEmpty(localStorage.getItem('token'))
  }

  public static validateRadiusCall(): boolean {
    return localStorage.getItem('isRadiusCalled') == "true"
  }

  public static validateRadiusLoginChecked(): boolean {
    return localStorage.getItem('isRadiusAccepted') == "true"
  }

  public static ackSocialLogin() {
    localStorage.setItem('isLoggedIn',"true")
  }

  public static ackRadiusAccepted() {
    localStorage.setItem('isRadiusAccepted',"true")
  }

  public static ackRadiusCall() {
    localStorage.setItem('isRadiusCalled',"true")
  }
  public static setUsername(username:string) {
    localStorage.setItem('username', username);
  }

  public static setCalledUrlWithParameters(url:string) {
    localStorage.setItem('cachedurl', url);
  }
  public static getCalledUrlWithParameters(): string {
    return localStorage.getItem('cachedurl');
  }

  public static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public static removeLoginData() {
    localStorage.removeItem('token');
    localStorage.removeItem('cachedurl');
    localStorage.removeItem('provider');
  }
}
