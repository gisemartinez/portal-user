import {Router} from "@angular/router";
import * as _ from "lodash";

export class LocalStorageHandler {


  public static validateLogin(): boolean {
    return localStorage.getItem('isLoggedIn') == "true"
  }

  public static isRadiusCalled(): boolean {
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

  public static setCachedUrl(url: string) {
    localStorage.setItem('cachedurl', url);
  }

  public static getCachedUrl(): string {
    return localStorage.getItem('cachedurl');
  }

  public static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public static getToken(): string  {
    return localStorage.getItem('token');
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

  public static getCSSTheme(): string  {
    return localStorage.getItem('css-theme');
  }

  public static setClient(clientId: string) {
    localStorage.setItem('client', clientId);
  }

  public static getClient(): string {
    return localStorage.getItem('client');
  }

  public static setTemplate(template: string) {
    localStorage.setItem('template', template);
  }

  public static getTemplate(): string {
    return localStorage.getItem('template');
  }

  public static setProvider(provider: string) {
    localStorage.setItem('provider', provider);
  }

  public static getProvider(): string {
    return localStorage.getItem('provider');
  }
}
