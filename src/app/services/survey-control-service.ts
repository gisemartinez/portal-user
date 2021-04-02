import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {authServerBaseUrl} from "../constants/misc.const";
import {SurveyInputBase} from "../models/survey-input-base";
import {BehaviorSubject} from "rxjs";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {HttpClient} from "@angular/common/http";
import {SocialLoginResponse} from "../models/social-login-response";
import {AlertService} from "./alert.service";
import {SurveyTextBox} from "../models/survey-textbox";

@Injectable()
export class SurveyControlService {
  surveyAnswered = new BehaviorSubject<boolean>(false);
  cachedURL: string;

  get isSurveyAnswered() {
    return this.surveyAnswered.asObservable()
  }

  constructor(private http: HttpClient,private alertService: AlertService) {
  }

  toFormGroup(questions: SurveyInputBase<any>[]) {
    let group: any = {};

    group['username'] = new SurveyTextBox({}, {'textType': 'email'} );

    questions.forEach(question => {
      group[question.id] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  saveAnswers(form: FormGroup) {
    this.http.post(authServerBaseUrl+'/auth/survey', form.getRawValue()) .subscribe(_ => {
        LocalStorageHandler.ackSocialLogin();
        LocalStorageHandler.setUsername(form.get('username').value);//email
        this.surveyAnswered.next(true);
        window.location.href = localStorage.getItem("cachedurl");
      },
      error => {
        this.alertService.error(JSON.stringify(error));
      }
    );
  }
}
