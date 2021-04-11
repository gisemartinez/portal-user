import * as _ from "lodash";

export class UserSocialLoginInfo {
  code?: string;
  redirectUri?: string;
  provider?: string;

  constructor(code, redirectUri, provider) {
    this.provider = provider;
    this.redirectUri = redirectUri;
    this.code = code;
  }

  setProvider(provider) {
    this.provider = provider;
  }

  setRedirectUri(redirectUri) {
    this.redirectUri = redirectUri;
  }

  setCode(code) {
    this.code = code;
  }

  hasCode(): boolean {
    return !_.isEmpty(this.code)
  }
}
