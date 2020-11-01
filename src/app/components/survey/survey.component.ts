import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SurveyControlService} from "../../services/survey-control-service";
import {SurveyInputBase} from "../../models/survey-input-base";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [ SurveyControlService ]
})
export class SurveyComponent implements OnInit {

  questions: SurveyInputBase<any>[] = [];
  form: FormGroup = new FormGroup({});
  payLoad = '';


  constructor(private qcs: SurveyControlService,  private cdr: ChangeDetectorRef, private questionService: QuestionService) {
    this.questionService.getLoginConfig().subscribe(data => {
      if(!data.isSocialLogin) {
        this.questions = data.surveyQuestions;
      } else {
        this.questions = [];
      }
      this.form = this.qcs.toFormGroup(this.questions);
    });
  }

  ngOnInit() {
    this.cdr.detectChanges();
  }

  onSubmit() {
    this.qcs.saveAnswers(this.form);
  }
}
