import { Injectable } from '@angular/core';
import { QuestionEndpoint } from './question-endpoint.service';
import { AuthService } from '../auth.service';
import { QuestionViewModel } from '../../models/question/question.model';
import { QuestionUpdateRequest } from '../../models/Question/question.update.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private authService: AuthService,
    private questionEndpoint: QuestionEndpoint) {

  }

  createQuestion(questionViewModel: QuestionViewModel) {
    console.log("server called");
    console.log(questionViewModel);
    return this.questionEndpoint.createQuestionEndpoint<QuestionViewModel>(questionViewModel);
  }

  searchQuestions(criteria: any) {
    return this.questionEndpoint.searchQuestions<any[]>(criteria);
  }

  getQuestionById(id: number) {
    return this.questionEndpoint.getQuestionById<QuestionViewModel>(id);
  }

  updateQuestion(questionUpdateRequest: QuestionViewModel) {
    console.log("server called");
    console.log(questionUpdateRequest);
    return this.questionEndpoint.updateQuestionEndpoint<QuestionViewModel>(questionUpdateRequest);
  }
}


