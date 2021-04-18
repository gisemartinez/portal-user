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
import {Title} from "@angular/platform-browser";


@Injectable()
export class AuthService {
  isLoggedIn$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private titleService: Title,
              private http: HttpClient) {
  }

  setLoginListener(listener: Observable<boolean>): void {
    this.isLoggedIn$ = listener
  }

  getAuthDataFromClient(): Observable<ClientAuthConf<any>> {
    return this.http.get(environment.server + '/conf/clientAuth/' + LocalStorageHandler.getClient())
      .pipe(map(result => {
          let clientName = result['data']['clientData']['name']
        LocalStorageHandler.setClientName(clientName) //used to set page 'title' on redirecting to every page
        this.titleService.setTitle(clientName)
          let authData = result['data']['authData']
          return new ClientAuthConf(authData['loginTypeOptions'], authData['theme'], authData['loginType'])
        })
      )
  };
}
