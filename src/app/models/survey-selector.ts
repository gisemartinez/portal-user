import { SurveyInputBase } from './survey-input-base';

export class SurveySelector extends SurveyInputBase<string> {
  controlType = 'selector';
  options: {key: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
