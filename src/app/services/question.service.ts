import {Injectable} from '@angular/core';

import {SurveyTextBox} from "../models/survey-textbox";
import {SurveyInputBase} from "../models/survey-input-base";
import {SurveyRatebox} from "../models/survey-ratebox";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SurveyRadioQuestion} from "../models/survey-radio-question";
import {SurveyCheckbox} from "../models/survey-checkbox";
import {SurveySelector} from "../models/survey-selector";
import {FormControl, FormGroup} from "@angular/forms";


@Injectable()
export class QuestionService {
  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
  }

  getQuestions(fields: [{
    id: string,
    type: string,
    config: {
      key: string,
      label: string,
      required: boolean,
      value: any,
      order: number,
      otherOptions: any
    }
  }]) {
    let questions: SurveyInputBase<any>[] = fields.map(obj => {
        let options = {
          'id': obj.id,
          'type': obj.type,
          'value': obj.config.value,
          'key': obj.config.key,
          'label': obj.config.label,
          'required': obj.config.required,
          'order': obj.config.order
        }

        switch (obj.type) {
          case 'rating' : {
            return new SurveyRatebox(options, obj.config.otherOptions);
          }
          case 'textbox' : {
            return new SurveyTextBox(options, obj.config.otherOptions)
          }
          case 'radio': {
            return new SurveyRadioQuestion(options, obj.config.otherOptions)
          }
          case 'checkbox': {
            let controls = {}
            let groupOpt: [{ index: number, key: string }] = obj.config.otherOptions
            groupOpt.forEach(c => controls[c.index] = new FormControl(null))
            let formGroup = new FormGroup(controls);
            return new SurveyCheckbox(options, obj.config.otherOptions, formGroup)
          }
          case 'selector': {
            return new SurveySelector(options, obj.config.otherOptions)
          }
          default : {
            return new SurveyRatebox(options, obj.config.otherOptions)
          }
        }
      }
    );

    return questions.sort((a, b) => a.order - b.order);
  }
}
