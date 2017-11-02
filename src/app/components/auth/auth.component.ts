import { Component, OnInit } from '@angular/core';
import { social_keys } from '../../constants/social_login_keys.const';
import { authServerBaseUrl } from '../../constants/misc.const';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  constructor(private route:ActivatedRoute){}

  ngOnInit() {
    console.log(this.route)
  }


  private config = {
    "loginRoute":"login",
    "instagram":{
      "authEndpoint": authServerBaseUrl + "/auth/linkedin",
      "clientId": social_keys.instagram.api_key,
      "redirectURI" : authServerBaseUrl + "/admin"
    },
    "facebook":{
      "authEndpoint": authServerBaseUrl+"/auth/facebook",
      "clientId":social_keys.facebook.api_key,
      "redirectURI" : authServerBaseUrl+"/admin"
    },
    "google":{
      "authEndpoint": authServerBaseUrl+"/auth/google",
      "clientId":social_keys.google.api_key,
      "redirectURI" : authServerBaseUrl+"/admin"
    }
  }

}
