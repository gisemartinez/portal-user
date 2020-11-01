import { SurveyInputBase } from './survey-input-base';

export class SurveySelector extends SurveyInputBase<string> {
  controlType = 'selector';
  options: {key: string}[] = [];

  constructor(options: {} = {}, otherOptions: [{key:string}]) {
    super(options);
    this.options = otherOptions || [];
  }
}
