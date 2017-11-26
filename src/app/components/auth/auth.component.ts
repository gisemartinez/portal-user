import { Component, OnInit } from '@angular/core';
import {social_keys, social_urls} from '../../constants/social_login_keys.const';
import { authServerBaseUrl } from '../../constants/misc.const';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {RadiusSearchparams} from "../../models/router-searchparams";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  constructor(private route:ActivatedRoute,private location: Location){}

  ngOnInit() {
    let params = new URLSearchParams(this.location.path(false).split('?')[1]);
    let routerSearchParams = new RadiusSearchparams();
    routerSearchParams.mac = params.get('chap-challenge');
    routerSearchParams.macClient = params.get('mac_client');
    routerSearchParams.device = params.get('device');
    routerSearchParams.ip = params.get('ip');
    routerSearchParams.username = params.get('username');
    routerSearchParams.linkLogin = params.get('link-login');
    routerSearchParams.linkOrig= params.get('link-orig');
    routerSearchParams.error = params.get('error');
    routerSearchParams.chapId = params.get('chap-id');
    routerSearchParams.chapChallenge = params.get('chap-challenge');
    routerSearchParams.linkLoginOnly = params.get('link-login-only');
    routerSearchParams.linkOrigEsc = params.get('link-orig-esc');
    routerSearchParams.macEsc = params.get('mac-esc');

    console.log(routerSearchParams);

  }


  private config = {
    "loginRoute":"login",
    "linkedin":{
      "authEndpoint": authServerBaseUrl + "/auth/linkedin",
      "clientId": social_urls["linkedin"].clientId,
      "redirectURI" : authServerBaseUrl + "/admin"
    },
    "facebook":{
      "authEndpoint": authServerBaseUrl+"/auth/facebook",
      "clientId": social_urls["facebook"].clientId,
      "redirectURI" : authServerBaseUrl+"/admin"
    },
    "google":{
      "authEndpoint": authServerBaseUrl+"/auth/google",
      "clientId": social_urls["google"].clientId,
      "redirectURI" : authServerBaseUrl+"/admin"
    }
  }

}
