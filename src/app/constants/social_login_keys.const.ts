import * as constants from "../../../server/const.js";
import {SocialLoginData} from "../models/social-login-data";


export const social_urls:{[key:string]:SocialLoginData }= {
  'google' : new SocialLoginData (
    constants.google.loginDialog.url,
    constants.google.loginDialog.suffix
  ),
  'facebook' : new SocialLoginData (
    constants.facebook.loginDialog.url,
    constants.facebook.loginDialog.suffix
  ),
  'linkedin' : new SocialLoginData (
    constants.linkedin.loginDialog.url,
    constants.linkedin.loginDialog.suffix
  )
};




