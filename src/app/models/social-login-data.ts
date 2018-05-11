
export class SocialLoginData {
  clientId:string;
  redirectUri:string;
  secret:string;
  url:string;
  urlSuffix:string;

  constructor(cliendId,secret,redirectUri,url,urlSuffix){
    this.clientId = cliendId;
    this.secret = secret;
    this.redirectUri = redirectUri;
    this.url = url;
    this.urlSuffix = urlSuffix;
  }
}
