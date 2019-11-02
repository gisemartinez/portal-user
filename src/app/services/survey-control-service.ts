import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SurveyInputBase} from "../models/survey-input-base";

@Injectable()
export class SurveyControlService {
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
}
