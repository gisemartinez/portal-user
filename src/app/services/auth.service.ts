import {Injectable} from "@angular/core";
import {SocialLoginService} from "./social-login.service";
import {SurveyControlService} from "./survey-control-service";
import {QuestionService} from "./question.service";
import {Observable} from "rxjs";
import {authServerBaseUrl} from "../constants/misc.const";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {map, switchMap} from "rxjs/operators";
import {ClientConfiguration} from "../models/client-configuration";
import {ActivatedRoute, ParamMap} from "@angular/router";
import * as config from "../../../server/config";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AuthService {
  isLoggedIn$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private socialLoginService: SocialLoginService,
              private surveyLoginService: SurveyControlService,
              private questionService: QuestionService, private http: HttpClient,
              private route: ActivatedRoute) {}

  getIsLoggedIn(client: ClientConfiguration):void{
    if (client.isSocialLogin) {
      this.isLoggedIn$ = this.socialLoginService.isLoggedIn;
    } else {
      this.isLoggedIn$ = this.surveyLoginService.isSurveyAnswered;
    }
  }

  getAuthData(): Observable<ClientConfiguration> {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.http.get(config['adminDashboard'] + '/config/' + LocalStorageHandler.getClient())
      )).pipe(
      map(data => {
        LocalStorageHandler.setCSSTheme(data['theme']);
        let typeOfLogin = data['login-type'];
        if (typeOfLogin == 'social-login') {
          let socialLoginKeys = data['social-login-keys'];
          return new ClientConfiguration(socialLoginKeys, [], typeOfLogin == 'social-login')
        } else {
          let surveyForm = data['survey-form'] || {};
          let questions = this.questionService.getQuestions(surveyForm['fields'] || []) || [];
          return new ClientConfiguration([], questions, typeOfLogin == 'social-login');
        }
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
