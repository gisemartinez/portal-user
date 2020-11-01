import { SurveyInputBase } from './survey-input-base';

export class SurveyRadioQuestion extends SurveyInputBase<string> {
  controlType = 'radio';
  options: {key: string}[] = [];

  constructor(options: {} = {}, otherOptions: [{key:string}]) {
    super(options);
    this.options = otherOptions || [];
  }
}
