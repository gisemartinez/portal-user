export class ClientConf<T> {
  loginOptions: T;
  theme: string;
  template: string;
  loginType: string;

  constructor(options: T, theme: string, loginType: string, template:string) {
    this.loginOptions = options;
    this.theme = theme;
    this.loginType = loginType;
    this.template = template;
  }
}
