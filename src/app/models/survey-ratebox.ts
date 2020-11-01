import {SurveyInputBase} from './survey-input-base';

export class SurveyRatebox extends SurveyInputBase<string> {
  controlType = 'rating';
  maximum: number;

  constructor(options: {} = {}, otherOptions: { maximum: number }) {
    super(options);
    this.maximum = otherOptions.maximum || 10;
  }
}
