import {SurveyInputBase} from "./survey-input-base";

export class ClientConfiguration {
  keys: any;
  surveyQuestions: SurveyInputBase<any>[];
  isSocialLogin: boolean;
  constructor(keys:any, qs: SurveyInputBase<any>[], isSocialLogin: boolean){
    this.keys = keys;
    this.surveyQuestions = qs;
    this.isSocialLogin = isSocialLogin;
  }
}
