import {Injectable} from '@angular/core';

import {SurveyTextBox} from "../models/survey-textbox";
import {SurveyInputBase} from "../models/survey-input-base";
import {SurveyRatebox} from "../models/survey-ratebox";

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions() {
    let fields = [
      {
        'id': '1571507819',
        'type': 'rating',
        'options': {
          'key': 'rating',
          'label': 'Cómo puntuarias la atención del personal hasta el momento?',
          'maximum': 5,
          'order': 1
        }
      },
      {
        'id': '1571508048',
        'type': 'yes-no',
        'options': {
          'key': 'yes-no',
          'label': 'Volverias a elegirnos?',
          'order': 2
        }
      },
      {
        'id': '1571507880',
        'type': 'textbox',
        'options': {
          'key': 'textbox',
          'label': 'Queres dejarnos alguna sugerencia?',
          'value': 'Bombasto',
          'order': 3
        }
      },
      {
        'id': '1571508821',
        'type': 'textbox',
        'options': {
          'key': 'textbox',
          'label': 'Como nos encontraste?',
          'required': true,
          'value': 'Bombasto',
          'order': 4
        }
      }
    ];
    let questions: SurveyInputBase<any>[] = fields.map(obj => {
        if (obj.type === 'rating') {
          return new SurveyRatebox(obj.options)
        } else {
          return new SurveyTextBox(obj.options)
        }
      }
    );
    
    return questions.sort((a, b) => a.order - b.order);
  }
}
