import { SurveyInputBase } from './survey-input-base';

export class SurveyRatebox extends SurveyInputBase<string> {
  controlType = 'rating';
  maximum: number

  constructor(options: {} = {}) {
    super(options);
    this.maximum = options['maximum'] || 10;
  }
}
