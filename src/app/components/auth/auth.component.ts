import {Component, OnInit} from "@angular/core";
import {social_urls} from "../../constants/social_login_keys.const";
import {authServerBaseUrl} from "../../constants/misc.const";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  constructor(){}

  ngOnInit() {
  }


  private config = {
    "loginRoute":"login",
    "linkedin":{
      "authEndpoint": authServerBaseUrl + "/auth/linkedin",
      "clientId": social_urls["linkedin"].clientId,
      "redirectUri" : authServerBaseUrl + "/login"
    },
    "facebook":{
      "authEndpoint": authServerBaseUrl+"/auth/facebook",
      "clientId": social_urls["facebook"].clientId,
      "redirectUri" : authServerBaseUrl+"/login"
    },
    "google":{
      "authEndpoint": authServerBaseUrl+"/auth/google",
      "clientId": social_urls["google"].clientId,
      "redirectUri" : authServerBaseUrl+"/login"
    }
  }

}
