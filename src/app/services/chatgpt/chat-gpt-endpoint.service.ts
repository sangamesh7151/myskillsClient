import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { EndpointBase } from '../endpoint-base.service';
import { ConfigurationService } from '../configuration.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGptEndpoint extends EndpointBase {

  // Base URL for the ChatGPT related endpoints
  get chatGptUrl() { return this.configurations.baseUrl + '/api/ChatGpt/'; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  //// Method to trigger generation and storage of questions
  //generateQuestions(gradeId: number, subjectId: number, topicId: number, difficulty: string): Observable<string> {
  //  const endpointUrl = `${this.chatGptUrl}/createQuestion?gradeId=${gradeId}&subjectId=${subjectId}&topicId=${topicId}&difficulty=${difficulty}`;
  //  return this.http.get<string>(endpointUrl, this.requestHeaders).pipe(
  //    catchError(error => {
  //      return this.handleError(error, () => this.generateQuestions(gradeId, subjectId, topicId, difficulty));
  //    }));
  //}

  generateQuestions<T>(questionObject: any): Observable<T> {
    const endpointUrl = `${this.chatGptUrl}/generateQuestions`;
    console.log(JSON.stringify(questionObject));
    return this.http.post<T>(endpointUrl, JSON.stringify(questionObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.generateQuestions(questionObject));
      }));
  }

}
