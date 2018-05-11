import * as _ from "lodash";
export class StorageItems {
  config: any;
  provider: string;
  cachedURL: string;
  constructor(config,provider,cachedURL){
    this.config = config;
    this.provider = provider;
    this.cachedURL = cachedURL;
  }
  hasConfig():boolean {
    return !_.isEmpty(this.config) && this.config != "undefined";
  }
  hasProvider():boolean {
    return !_.isEmpty(this.provider)
  }
  hasCachedURL():boolean {
    return !_.isEmpty(this.cachedURL)
  }
}
