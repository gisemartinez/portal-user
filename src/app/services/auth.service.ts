import {Injectable} from "@angular/core";
import {SocialLoginService} from "./social-login.service";
import {SurveyControlService} from "./survey-control-service";
import {QuestionService} from "./question.service";
import {BehaviorSubject, Observable} from "rxjs";
import {authServerBaseUrl} from "../constants/misc.const";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ClientAuthConf} from "../models/client-auth-conf";


@Injectable()
export class AuthService {
  isLoggedIn$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private socialLoginService: SocialLoginService,
              private surveyLoginService: SurveyControlService,
              private questionService: QuestionService, private http: HttpClient) {
  }

  setLoginListener(listener: Observable<boolean>): void {
    this.isLoggedIn$ = listener
  }

  getAuthDataFromClient(): Observable<ClientAuthConf<any>> {
    return this.http.get(environment.server + '/conf/clientAuth/' + LocalStorageHandler.getClient())
      .pipe(map(result => {
          let data = result['data']
          return new ClientAuthConf(data['loginTypeOptions'], data['theme'], data['loginType'])
        })
      )
  };
}
