
import * as config from "../../../server/config.js";
import * as constants from "../../../server/const.js";
import {SocialLoginData} from "../models/social-login-data";
import {authServerBaseUrl} from "./misc.const";



export const social_urls:{[key:string]:SocialLoginData }= {
  'google' : new SocialLoginData (
    config["socialMediaKeys"].google.clientId,
    config["socialMediaKeys"].google.secret,
    authServerBaseUrl + '/login',
    constants.google.url,
    constants.google.urlSuffix
  ),
  'facebook' : new SocialLoginData (
    config["socialMediaKeys"].facebook.clientId,
    config["socialMediaKeys"].facebook.secret,
    authServerBaseUrl + '/login',
    constants.facebook.url,
    constants.facebook.urlSuffix
  ),
  'linkedin' : new SocialLoginData (
    config["socialMediaKeys"].linkedin.clientId,
    config["socialMediaKeys"].linkedin.secret,
    authServerBaseUrl + '/login',
    constants.linkedin.url,
    constants.linkedin.urlSuffix
  )
};




