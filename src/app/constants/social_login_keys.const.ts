
import { SocialLoginInfo} from "../models/social-login-info";
import {authServerBaseUrl} from "./misc.const";
export const social_keys = {
  twitter: {
    api_key:""
  },
  facebook: {
    api_key:""
  },
  google: {
    api_key:""
  },
  instagram: {
    api_key:""
  }
};


export const social_urls:{[key:string]:SocialLoginInfo }= {
  'google' : {
    code:'',
    clientId:'612883061882-hkbrnj033g9eg59t9iaoo4dernuiv7vf.apps.googleusercontent.com	',
    redirectURI:  authServerBaseUrl + '/admin',
    secret: '6MaQVEA21221qQoi-yDrD5k8',
    url: 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=',
    urlSuffix:'&scope=email%20profile'
  },
  'facebook': {
    code:'',
    clientId:'1551783681531253',
    redirectURI: authServerBaseUrl + '/admin',
    secret: '3f2d363fbf1d2d925e9c098b4f60f06e',
    url: 'https://www.facebook.com/v2.8/dialog/oauth?client_id=',
    urlSuffix:'&scope=email'
  },
  'linkedin' : {
    code:'',
    clientId:'7795dtgk291ni1',
    redirectURI: authServerBaseUrl + '/admin',
    secret: 'oBU1OUVw42FB7MWt',
    url: 'https://www.linkedin.com/oauth/v2/authorization?client_id=',
    urlSuffix:'&response_type=code'
  }
};




