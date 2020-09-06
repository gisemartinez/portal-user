import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SurveyInputBase} from "../models/survey-input-base";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {LocalStorageHandler} from "../guards/local-storage-handler";

@Injectable()
export class SurveyControlService {
  surveyAnswered = new BehaviorSubject<boolean>(false);
  cachedURL: string;

  get isSurveyAnswered(){
    return this.surveyAnswered.asObservable()
  }

  constructor() {
  }

  toFormGroup(questions: SurveyInputBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  saveAnswers(form: {}){
    console.log('form :' + form);
    LocalStorageHandler.ackSocialLogin();
    LocalStorageHandler.setUsername("guess");
    this.surveyAnswered.next(true);
    window.location.href = localStorage.getItem("cachedurl");
    ;
  }
}
