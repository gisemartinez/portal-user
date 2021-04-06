import {Injectable} from "@angular/core";
import {SocialLoginService} from "./social-login.service";
import {SurveyControlService} from "./survey-control-service";
import {QuestionService} from "./question.service";
import {BehaviorSubject, Observable} from "rxjs";
import {authServerBaseUrl} from "../constants/misc.const";
import {map, switchMap} from "rxjs/operators";
import {ClientConfiguration} from "../models/client-configuration";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ClientConf} from "../models/client-conf";


@Injectable()
export class AuthService {
  isLoggedIn$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private socialLoginService: SocialLoginService,
              private surveyLoginService: SurveyControlService,
              private questionService: QuestionService, private http: HttpClient,
              private route: ActivatedRoute) {
  }
  
  getAuthDataFromClient(): Observable<ClientConf<any>> {
    return this.route.paramMap.pipe(
      switchMap(() =>
        this.http.get(environment.admin.url + '/config/' + LocalStorageHandler.getClient())
      )).pipe(
      map(data => {
        LocalStorageHandler.setCSSTheme(data['theme']); //maybe not necessary
        return new ClientConf(data['loginOptions'], data['theme'], data['loginType'], data['template'])
      }));
  };

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
