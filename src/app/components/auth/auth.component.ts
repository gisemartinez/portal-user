import {Component, OnInit} from "@angular/core";
import {authServerBaseUrl} from "../../constants/misc.const";
import {Observable} from "rxjs";
import {SocialLoginService} from "../../services/social-login.service";
import {HttpClient} from "@angular/common/http";
import * as config from "../../../../server/config";
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {LocalStorageHandler} from "../../guards/local-storage-handler";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [QuestionService]
})
export class AuthComponent implements OnInit {
  socialLogin: boolean = true;
  isLoggedIn$: Observable<boolean>;
  navIsVisible: boolean;
  questions: any[];

  constructor(private socialLoginService: SocialLoginService,
              private questionService: QuestionService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.http.get(config['adminDashboard'] + '/config/' + params.get('client'))
      )).subscribe(data => {
      LocalStorageHandler.setCSSTheme(data['theme']);
      this.socialLogin = data['login-type'] == 'social-login';
      this.questions = questionService.getQuestions();
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.socialLoginService.isLoggedIn.map(v => !v);
    this.navIsVisible = false;
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
