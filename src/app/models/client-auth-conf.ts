export class ClientAuthConf<T> {
  loginOptions: T;
  theme: string;
  loginType: string;

  constructor(options: T, theme: string, loginType: string) {
    this.loginOptions = options;
    this.theme = theme;
    this.loginType = loginType;
  }
}
