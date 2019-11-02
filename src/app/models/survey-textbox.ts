import { SurveyInputBase } from './survey-input-base';

export class SurveyTextBox extends SurveyInputBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
