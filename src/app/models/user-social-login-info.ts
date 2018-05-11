import * as _ from "lodash";
export class UserSocialLoginInfo {
  code:string;
  //clientId:string;
  redirectUri:string;
  provider: string;
  //secret:string;
  //url:string;
  //urlSuffix:string;

  constructor(){}

  setProvider(provider){
    this.provider = provider;
  }
  setRedirectUri(redirectUri){
    this.redirectUri = redirectUri;
  }
  setCode(code){
    this.code = code;
  }
  hasCode():boolean {
    return !_.isEmpty(this.code)
  }
}
