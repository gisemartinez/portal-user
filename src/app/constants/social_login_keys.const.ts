
import * as constants from "../../../server/const.js";
import {SocialLoginData} from "../models/social-login-data";
import {environment} from "../../environments/environment";



export const social_urls:{[key:string]:SocialLoginData }= {
  'google' : new SocialLoginData (
    environment.api.socialMediaKeys.google.clientId,
    environment.api.socialMediaKeys.google.secret,
    environment.server + '/login',
    constants.google.url,
    constants.google.urlSuffix
  ),
  'facebook' : new SocialLoginData (
    environment.api.socialMediaKeys.facebook.clientId,
    environment.api.socialMediaKeys.facebook.secret,
    environment.server + '/login',
    constants.facebook.url,
    constants.facebook.urlSuffix
  ),
  'linkedin' : new SocialLoginData (
    environment.api.socialMediaKeys.linkedin.clientId,
    environment.api.socialMediaKeys.linkedin.secret,
    environment.server + '/login',
    constants.linkedin.url,
    constants.linkedin.urlSuffix
  )
};




