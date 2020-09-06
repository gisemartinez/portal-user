import { SurveyInputBase } from './survey-input-base';

export class SurveyCheckbox extends SurveyInputBase<string> {
  controlType = 'checkbox';
  options: {key: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
