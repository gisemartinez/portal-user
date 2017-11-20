import { Component, OnInit } from '@angular/core';
import {social_keys, social_urls} from '../../constants/social_login_keys.const';
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
    console.log(this.route.snapshot.paramMap.keys)
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
