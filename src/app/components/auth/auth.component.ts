import {Component, OnInit} from "@angular/core";
import {authServerBaseUrl} from "../../constants/misc.const";
import {Observable} from "rxjs";
import {SocialLoginService} from "../../services/social-login.service";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  navIsVisible:boolean;

  constructor(private socialLoginService:SocialLoginService){}

  ngOnInit() {
    this.isLoggedIn$ = this.socialLoginService.isLoggedIn.map(v=>!v);
    this.navIsVisible = false;
  }


  public config = {

    "linkedin":{
      "authEndpoint": authServerBaseUrl + "/auth/linkedin"
    },
    "facebook":{
      "authEndpoint": authServerBaseUrl+"/auth/facebook"
    },
    "google":{
      "authEndpoint": authServerBaseUrl+"/auth/google"
    }
  }

}
