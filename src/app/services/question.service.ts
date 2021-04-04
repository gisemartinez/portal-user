import {Injectable} from '@angular/core';

import {SurveyTextBox} from "../models/survey-textbox";
import {SurveyInputBase} from "../models/survey-input-base";
import {SurveyRatebox} from "../models/survey-ratebox";
import {switchMap, map} from "rxjs/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {HttpClient} from "@angular/common/http";
import {ClientConfiguration} from "../models/client-configuration";
import {Observable} from "rxjs";
import {SurveyRadioQuestion} from "../models/survey-radio-question";
import {SurveyCheckbox} from "../models/survey-checkbox";
import {SurveySelector} from "../models/survey-selector";
import {environment} from "../../environments/environment";


@Injectable()
export class QuestionService {
  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
  }

  getLoginConfig(): Observable<ClientConfiguration> {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.http.get(environment.admin.url + '/config/' + LocalStorageHandler.getClient())
      )).pipe(
      map(data => {
        LocalStorageHandler.setCSSTheme(data['theme']);
        let typeOfLogin = data['login-type'];
        if (typeOfLogin == 'social-login') {
          let socialLoginKeys = data['social-login-keys'];
          return new ClientConfiguration(socialLoginKeys, [], typeOfLogin == 'social-login')
        } else {
          let surveyForm = data['survey-form'] || {};
          let questions = this.getQuestions(surveyForm['fields'] || []) || [];
          let config = new ClientConfiguration([], questions, typeOfLogin == 'social-login');
          return config;
        }
      }));
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
      otherOptions:any
    }
  }]) {
    let questions: SurveyInputBase<any>[] = fields.map(obj => {
        let options = {
          'id': obj.id,
          'type':obj.type,
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
            return new SurveyTextBox(options,  obj.config.otherOptions)
          }
          case 'radio': {
            return new SurveyRadioQuestion(options,obj.config.otherOptions)
          }
          case 'checkbox': {
            return new SurveyCheckbox(options,  obj.config.otherOptions)
          }
          case 'selector': {
            return new SurveySelector(options,  obj.config.otherOptions)
          }
          default : {
            return new SurveyRatebox(options,  obj.config.otherOptions)
          }
        }
      }
    );

    return questions.sort((a, b) => a.order - b.order);
  }
}
