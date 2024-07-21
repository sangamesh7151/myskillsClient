import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { EndpointBase } from '../endpoint-base.service';
import { ConfigurationService } from '../configuration.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class TestReportServiceEndpoint extends EndpointBase {

  get testReportUrl() { return this.configurations.baseUrl + '/api/testReport'; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getUserTestReport<T>(userId: string): Observable<T> {
    const endpointUrl = `${this.testReportUrl}/userTestReport/${userId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getUserTestReport(userId));
      }));
  }

  getSubjectWiseAnalysisForUser<T>(userId: string): Observable<T> {
    const endpointUrl = `${this.testReportUrl}/subjectWiseAnalysis/${userId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getSubjectWiseAnalysisForUser(userId));
      }));
  }

  getTopicAndDifficultyWiseAnalysisForUser<T>(userId: string, subjectId: number): Observable<T> {
    const endpointUrl = `${this.testReportUrl}/topicDifficultyAnalysis/${userId}/${subjectId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getTopicAndDifficultyWiseAnalysisForUser(userId, subjectId));
      }));
  }

  getUserSubjectCoverageStats<T>(userId: string): Observable<T> {
    const endpointUrl = `${this.testReportUrl}/subjectCoverageStats/${userId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getUserSubjectCoverageStats(userId));
      }));
  }

  getTestStatisticsForParent<T>(parentId: string): Observable<T> {
    const endpointUrl = `${this.testReportUrl}/testStatisticsForParent/${parentId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getTestStatisticsForParent(parentId));
      }));
  }

  getOverallTestReportsForParent<T>(ownerId: string): Observable<T> {
    const endpointUrl = `${this.testReportUrl}/overallTestReportsForParent/${ownerId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getOverallTestReportsForParent(ownerId));
      }));
  }


  getTestReports<T>(testId:number,lernerId: string): Observable<T> {
    const endpointUrl = `${this.testReportUrl}/testReport/${testId}/${lernerId}`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getTestReports(testId,lernerId));
      }));
  }

  getRecentActivities<T>(): Observable<T> {
    const endpointUrl = `${this.testReportUrl}/recentActivities`;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getRecentActivities());
      }));
  }


}
