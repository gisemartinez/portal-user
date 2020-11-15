import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SurveyInputBase} from "../models/survey-input-base";
import {BehaviorSubject} from "rxjs";
import {LocalStorageHandler} from "../guards/local-storage-handler";

@Injectable()
export class SurveyControlService {
  surveyAnswered = new BehaviorSubject<boolean>(false);
  cachedURL: string;

  get isSurveyAnswered() {
    return this.surveyAnswered.asObservable()
  }

  constructor() {
  }

  toFormGroup(questions: SurveyInputBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.id] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  saveAnswers(form: FormGroup) {
    LocalStorageHandler.ackSocialLogin();
    LocalStorageHandler.setUsername(form.get('1571507840').value);//email
    this.surveyAnswered.next(true);
    window.location.href = localStorage.getItem("cachedurl");
  }
}
