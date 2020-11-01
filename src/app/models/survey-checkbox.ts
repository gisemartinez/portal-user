import { SurveyInputBase } from './survey-input-base';

export class SurveyCheckbox extends SurveyInputBase<string> {
  controlType = 'checkbox';
  options: {key: string}[] = [];

  constructor(options: {} = {}, otherOptions: [{key:string}]) {
    super(options);
    this.options = options['options'] || [];
  }
}
