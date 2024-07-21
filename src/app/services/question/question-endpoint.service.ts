import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, observable } from 'rxjs'
import { EndpointBase } from '../endpoint-base.service';
import { ConfigurationService } from '../configuration.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class QuestionEndpoint extends EndpointBase {

  get createQuestionUrl() { return this.configurations.baseUrl + '/api/question/createQuestion'; }
  get updateQuestionUrl() { return this.configurations.baseUrl + '/api/question/updateQuestion'; }
  get searchQuestionsUrl() { return this.configurations.baseUrl + '/api/question/questions'; }
  get searchByIdUrl() { return this.configurations.baseUrl + '/api/question/'; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) { super(http, authService); }

  createQuestionEndpoint<T>(questionObject: any): Observable<T> {
    console.log(this.createQuestionUrl);
    console.log(this.requestHeaders);
    console.log(JSON.stringify(questionObject));
    return this.http.post<T>(this.createQuestionUrl, JSON.stringify(questionObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.createQuestionEndpoint(questionObject));
      }));
  }

  updateQuestionEndpoint<T>(questionObject: any): Observable<T> {
    console.log(this.updateQuestionUrl);
    console.log(this.requestHeaders);
    console.log(JSON.stringify(questionObject));
    return this.http.post<T>(this.updateQuestionUrl, JSON.stringify(questionObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.updateQuestionEndpoint(questionObject));
      }));
  }

  searchQuestions<T>(criteria:any): Observable<T> {
    // return this.http.get(`${this.searchByClassAndSubjectUrl}/search`, { params: { classId, subjectId } });
   // const endpointUrl = `${this.searchQuestionsUrl}/${classId}`;
    //return this.http.post<T>(endpointUrl, this.requestHeaders).pipe<T>(
    //  catchError(error => {
    //    return this.handleError(error, () => this.searchQuestions(classId, subjectId));
    //  }));
    console.log('gopinath');
    console.log(criteria);
    return this.http.post<T>(this.searchQuestionsUrl, JSON.stringify(criteria), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.updateQuestionEndpoint(criteria));
      }));
  }

  getQuestionById<T>(id: number): Observable<T> {
    // return this.http.get(`${this.searchByClassAndSubjectUrl}/search`, { params: { classId, subjectId } });
    const endpointUrl = `${this.searchByIdUrl}/${id}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getQuestionById(id));
      }));
  }

}
