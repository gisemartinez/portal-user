import {Injectable} from '@angular/core';

import {SurveyTextBox} from "../models/survey-textbox";
import {SurveyInputBase} from "../models/survey-input-base";
import {SurveyRatebox} from "../models/survey-ratebox";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";
import * as config from "../../../server/config";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {HttpClient} from "@angular/common/http";
import {ClientConfiguration} from "../models/client-configuration";
import {Observable} from "rxjs";
import {SurveyRadioQuestion} from "../models/survey-radio-question";

@Injectable()
export class QuestionService {
  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
  }

  getLoginConfig(): Observable<ClientConfiguration> {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.http.get(config['adminDashboard'] + '/config/' + params.get('clientId'))
      )).map(data => {
      LocalStorageHandler.setCSSTheme(data['theme']);
      let typeOfLogin = data['login-type'];
      if (typeOfLogin == 'social-login'){
        let socialLoginKeys = data['social-login-keys'];
        return new ClientConfiguration(socialLoginKeys, [], typeOfLogin == 'social-login')
      } else {
        let surveyForm = data['survey-form'] || {};
        let questions = this.getQuestions(surveyForm['fields'] || []) || [];
        let config = new ClientConfiguration([], questions, typeOfLogin == 'social-login');
        return config;
      }
    });
  }

  getQuestions(fields: [{type:string,config:string}]) {
    let questions: SurveyInputBase<any>[] = fields.map(obj => {
        switch (obj.type) {
          case 'rating' : {
            return new SurveyRatebox(obj.config);
          }
          case 'textbox' : {
            return new SurveyTextBox(obj.config)
          }
          case 'radio': {
            return new SurveyRadioQuestion(obj.config)
          }
          default : {
            return new SurveyRatebox(obj.config)
          }
        }
      }
    );

    return questions.sort((a, b) => a.order - b.order);
  }
}
