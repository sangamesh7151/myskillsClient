import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionRequest } from '../../models/admin/QuestionRequest';
import { ChatGptEndpoint } from './chat-gpt-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGpt {
  constructor(private chatGptEndpoint: ChatGptEndpoint) { }

  // Service method to generate questions
  generateQuestions(request: QuestionRequest): Observable<any> {
    return this.chatGptEndpoint.generateQuestions(request);
  }
}
