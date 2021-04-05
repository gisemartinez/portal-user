import { SurveyInputBase } from './survey-input-base';
import {AbstractControl} from "@angular/forms";

export class SurveyCheckbox extends SurveyInputBase<string> {
  controlType = 'checkbox';
  options: {key: string}[] = [];

  constructor(options: {} = {}, otherOptions: [{key:string}], control: AbstractControl) {
    super(options, control);
    this.options = otherOptions || [];
  }
}
