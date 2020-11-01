import { SurveyInputBase } from './survey-input-base';

export class SurveyTextBox extends SurveyInputBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}, otherOptions: { textType: string }) {
    super(options);
    this.type = otherOptions.textType || '';
  }
}
