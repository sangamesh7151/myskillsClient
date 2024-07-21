import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, observable } from 'rxjs'
import { EndpointBase } from '../endpoint-base.service';
import { ConfigurationService } from '../configuration.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class TestResultEndpoint extends EndpointBase {

  get SaveTestResponseUrl() { return this.configurations.baseUrl + '/api/testResponse/submitResponses'; }
  get getTestResultUrl() { return this.configurations.baseUrl + '/api/testResponse/getTestResultBy'; }
  get getTestResultForLearnerUrl() { return this.configurations.baseUrl + '/api/testResponse/getTestResultByLearner'; }
  get getNumberOfAttemptsUrl() { return this.configurations.baseUrl + '/api/testResponse/getNumberOfAttempts'; }
  get getPauseTestUrl() { return this.configurations.baseUrl + '/api/testResponse/pauseTest'; }
  get getTestStartUrl() { return this.configurations.baseUrl + '/api/testResponse/startTest'; }
  get getResumeTestUrl() { return this.configurations.baseUrl + '/api/testResponse/resumeTest'; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) { super(http, authService); }

  saveTestResultEndpoint<T>(questionObject: any): Observable<T> {
    console.log(this.SaveTestResponseUrl);
    console.log(this.requestHeaders);
    console.log(JSON.stringify(questionObject));
    return this.http.post<T>(this.SaveTestResponseUrl, JSON.stringify(questionObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.saveTestResultEndpoint(questionObject));
      }));
  }

  getTestResultById<T>(id: number): Observable<T> {
    // return this.http.get(`${this.searchByClassAndSubjectUrl}/search`, { params: { classId, subjectId } });
    const endpointUrl = `${this.getTestResultUrl}/${id}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getTestResultById(id));
      }));
  }

  getTestResultByLearnerId<T>(id: number, attemptNumber: number, learnerId: string): Observable<T> {
    // return this.http.get(`${this.searchByClassAndSubjectUrl}/search`, { params: { classId, subjectId } });
    const endpointUrl = `${this.getTestResultForLearnerUrl}/${id}/${attemptNumber}/${learnerId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getTestResultByLearnerId(id, attemptNumber, learnerId));
      }));
  }

  getNumberOfAttempts<T>(id: number, learnerId: string): Observable<T> {
    // return this.http.get(`${this.searchByClassAndSubjectUrl}/search`, { params: { classId, subjectId } });
    const endpointUrl = `${this.getNumberOfAttemptsUrl}/${id}/${learnerId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNumberOfAttempts(id, learnerId));
      }));
  }

  pauseTestEndPoint<T>(attemptId: number, pauseState: any): Observable<T> {
    //  const endpointUrl = `${this.gePauseTestUrl}/${attemptId}}`;
    //  return this.http.post(`${this.endpointUrl}/pauseTest/${attemptId}`, pauseState);
    const endpointUrl = `${this.getPauseTestUrl}/${attemptId}`;
    return this.http.post<T>(endpointUrl, JSON.stringify(pauseState), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.pauseTestEndPoint(attemptId, pauseState));
      }));
  }

  //startTestEndPoint<T>(testId: number): Observable<T> {
  //  //  const endpointUrl = `${this.gePauseTestUrl}/${attemptId}}`;
  //  //  return this.http.post(`${this.endpointUrl}/pauseTest/${attemptId}`, pauseState);
  //  const endpointUrl = `${this.getTestStartUrl}/${testId}}`;
  //  return this.http.post<T>(endpointUrl, null, this.requestHeaders).pipe<T>(
  //    catchError(error => {
  //      return this.handleError(error, () => this.startTestEndPoint(testId));
  //    }));
  //}


  startTestEndPoint<T>(testId: number, pauseState: any): Observable<T> {
    const endpointUrl = `${this.getTestStartUrl}/${testId}`;
    return this.http.post<T>(endpointUrl, JSON.stringify(pauseState), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.startTestEndPoint(testId, pauseState));
      })
    );
  }



  resumeTest<T>(attemptId: number): Observable<T> {
    // return this.http.get(`${this.searchByClassAndSubjectUrl}/search`, { params: { classId, subjectId } });
    const endpointUrl = `${this.getResumeTestUrl}/${attemptId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.resumeTest(attemptId));
      }));
  }

}
