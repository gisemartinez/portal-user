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
    localStorage.setItem('isLoggedIn', "true")
  }

  public static ackRadiusAccepted() {
    localStorage.setItem('isRadiusAccepted', "true")
  }

  public static ackRadiusCall() {
    localStorage.setItem('isRadiusCalled', "true")
  }

  public static setUsername(username: string) {
    localStorage.setItem('username', username);
  }

  public static getUsername(): string {
    return localStorage.getItem('username');
  }

  public static setCalledUrlWithParameters(url: string) {
    localStorage.setItem('cachedurl', url);
  }

  public static getCalledUrlWithParameters(): string {
    return localStorage.getItem('cachedurl');
  }

  public static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public static setLoginSelection(authConfig, provider) {
    localStorage.setItem("authConfig", JSON.stringify(authConfig));
    localStorage.setItem("provider", provider);
  }

  public static removeLoginData() {
    localStorage.removeItem('token');
    localStorage.removeItem('cachedurl');
    localStorage.removeItem('provider');
  }

  public static setLogoutData() {
    localStorage.setItem('isLoggedIn', "false");
  }

  public static setCSSTheme(theme: string) {
    localStorage.setItem('css-theme', theme);
  }

  public static getCSSTheme() {
    localStorage.getItem('css-theme');
  }

  public static setClient(clientId: string) {
    localStorage.setItem('client-id', clientId);
  }

  public static getClient(): string {
    return localStorage.getItem('client-id');
  }
}
