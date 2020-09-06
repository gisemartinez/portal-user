import {Component, OnInit} from "@angular/core";
import {authServerBaseUrl} from "../../constants/misc.const";
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs";
import {QuestionService} from "../../services/question.service";
import {ClientConfiguration} from "../../models/client-configuration";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  socialLogin: boolean = true;
  notLoggedIn$ = true;
  configuration: ClientConfiguration;

  constructor(private authService: AuthService, qs: QuestionService) {
    this.authService.getAuthData().subscribe(data => {
      this.configuration = data;
      this.socialLogin = data.isSocialLogin;
      this.authService.getIsLoggedIn(data)
    });
    this.authService.isLoggedIn$.subscribe(d =>
      this.notLoggedIn$ = !d
    )
  }

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
