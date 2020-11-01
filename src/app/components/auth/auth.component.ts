import {Component} from "@angular/core";
import {authServerBaseUrl} from "../../constants/misc.const";
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import {ClientConfiguration} from "../../models/client-configuration";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  socialLogin: boolean = true;
  notLoggedIn$:  Observable<boolean>;
  configuration: ClientConfiguration;

  constructor(private authService: AuthService) {
    //TODO: check if this can be improved
    this.notLoggedIn$ = this.authService.isLoggedIn$.pipe(map (v => !v));

    this.authService.getAuthData().subscribe(data => {
      this.configuration = data;
      this.socialLogin = data.isSocialLogin;
      this.authService.getIsLoggedIn(data)
    });
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
