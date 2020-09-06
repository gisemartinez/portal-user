import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import {SurveyInputBase} from "../../models/survey-input-base";

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css'],
})
export class DynamicFormQuestionComponent {
  @Input()
  question: SurveyInputBase<any>;
  @Input()
  form: FormGroup;
  isValid() { return this.form.controls[this.question.key].valid; }
}
