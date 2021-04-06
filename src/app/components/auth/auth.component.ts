import {Component} from "@angular/core";
import {authServerBaseUrl} from "../../constants/misc.const";
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import {ClientConfiguration} from "../../models/client-configuration";
import {map} from "rxjs/operators";
import {SocialLoginService} from "../../services/social-login.service";
import {SurveyControlService} from "../../services/survey-control-service";
import {ClientConf} from "../../models/client-conf";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  socialLogin: boolean = true;
  notLoggedIn$: Observable<boolean>;
  authConf: any

  constructor(private authService: AuthService, private socialLoginService: SocialLoginService, private surveyLoginService: SurveyControlService) {
    //TODO: check if this can be improved
    this.notLoggedIn$ = this.authService.isLoggedIn$.pipe(map(v => !v));

    this.authService.getAuthDataFromClient().subscribe(data => {
      this.socialLogin = data.loginType == 'social-login';
      if (this.socialLogin) {
        this.authConf = this.config //replace me!
        this.notLoggedIn$ = this.socialLoginService.isLoggedIn.pipe(map(v => !v));
      } else {
        this.authConf = data.loginOptions
        this.notLoggedIn$ = this.surveyLoginService.isSurveyAnswered.pipe(map(v => !v));
      }
    });
  }

//this can be replaced by conf.loginopt.keys
  public config = {

    "linkedin": {
      "authEndpoint": authServerBaseUrl + "/auth/linkedin"
    },
    "facebook": {
      "authEndpoint": authServerBaseUrl + "/auth/facebook"
    },
    "google": {
      "authEndpoint": authServerBaseUrl + "/auth/google"
    }
  }

}
