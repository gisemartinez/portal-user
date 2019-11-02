import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {SurveyControlService} from "../../services/survey-control-service";
import {SurveyInputBase} from "../../models/survey-input-base";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [ SurveyControlService ]
})
export class SurveyComponent implements OnInit {

  @Input() questions: SurveyInputBase<any>[] = [];
  form: FormGroup;
  payLoad = '';


  constructor(private qcs: SurveyControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
