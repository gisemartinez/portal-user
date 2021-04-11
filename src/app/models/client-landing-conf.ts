export class ClientLandingConf<T> {
  landingChoices: T;
  template: string;

  constructor(options: T, template: string) {
    this.landingChoices = options;
    this.template = template;
  }
}
