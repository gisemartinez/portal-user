import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {authServerBaseUrl} from "../constants/misc.const";
import {SurveyInputBase} from "../models/survey-input-base";
import {BehaviorSubject} from "rxjs";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {SurveyCheckbox} from "../models/survey-checkbox";

@Injectable()
export class SurveyControlService {
  surveyAnswered = new BehaviorSubject<boolean>(false);
  cachedURL: string;

  get isSurveyAnswered() {
    return this.surveyAnswered.asObservable()
  }

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  toFormGroup(questions: SurveyInputBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.id] = question.control;
    });
    return new FormGroup(group);
  }

  saveAnswers(form: FormGroup) {
    let postData = {
      identifier: Math.random().toString(36).substring(7),
      answers: form.getRawValue()
    }
    this.http.post(authServerBaseUrl + '/auth/survey/'+LocalStorageHandler.getClient(), postData).subscribe(_ => {
        LocalStorageHandler.ackSocialLogin();
        LocalStorageHandler.setUsername(postData.identifier);
        this.surveyAnswered.next(true);
        window.location.href = localStorage.getItem("cachedurl");
      },
      error => {
        this.alertService.error(JSON.stringify(error));
      }
    );
  }
}
