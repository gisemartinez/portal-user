import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SurveyControlService} from "../../services/survey-control-service";
import {SurveyInputBase} from "../../models/survey-input-base";
import {QuestionService} from "../../services/question.service";
import {ClientConf} from "../../models/client-conf";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [SurveyControlService]
})
export class SurveyComponent implements OnInit {
  @Input()
  formConfig: {
    surveyForm: {
      title:string,
      fields: [{
        id: string,
        type: string,
        config: {
          key: string,
          label: string,
          required: boolean,
          value: any,
          order: number,
          otherOptions: any
        }
      }]
    }
  };

  surveyIntro: string = ""
  questions: SurveyInputBase<any>[] = [];
  form: FormGroup = new FormGroup({});
  payLoad = '';

  constructor(private qcs: SurveyControlService, private cdr: ChangeDetectorRef, private questionService: QuestionService) {}

  ngOnInit() {
    this.cdr.detectChanges();
    this.questions = this.questionService.getQuestions(this.formConfig.surveyForm.fields)
    this.surveyIntro = this.formConfig.surveyForm.title
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.qcs.saveAnswers(this.form);
  }
}
