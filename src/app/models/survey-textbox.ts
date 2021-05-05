import { SurveyInputBase } from './survey-input-base';

export class SurveyTextBox extends SurveyInputBase<string> {
  controlType = 'textbox';

  constructor(options: {} = {}) {
    super(options);
  }
}
