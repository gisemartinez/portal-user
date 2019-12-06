import { SurveyInputBase } from './survey-input-base';

export class SurveyRadioQuestion extends SurveyInputBase<string> {
  controlType = 'radio';
  options: {key: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
