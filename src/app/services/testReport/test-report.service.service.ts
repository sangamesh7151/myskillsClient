import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestReportServiceEndpoint } from './test-report-endpoint.service';
import { ChartData } from '../../models/report/chartData.model'; // Adjust import path as needed
import { UserTestReport } from '../../models/report/userTestReport.model'; // Adjust import path as needed
import { SubjectAnalysisReport } from '../../models/report/subjectAnalysisReport.model'; // Adjust import path as needed
import { TopicDifficultyAnalysisReport } from '../../models/report/topicDifficultyAnalysisReport.model'; // Adjust import path as needed
import { TestOverallReport } from '../../models/report/testOverallReport.model'; // Adjust import path as needed
import { TestAttempt } from '../../models/tests/testAttempt/testAttempt';
import { RecentActivity } from '../../models/activity/recent-activity.model';

@Injectable({
  providedIn: 'root'
})
export class TestReportServiceService {

  constructor(private testReportEndpoint: TestReportServiceEndpoint) { }

  getUserTestReport(userId: string): Observable<UserTestReport> {
    return this.testReportEndpoint.getUserTestReport<UserTestReport>(userId);
  }

  getSubjectWiseAnalysisForUser(userId: string): Observable<SubjectAnalysisReport[]> {
    return this.testReportEndpoint.getSubjectWiseAnalysisForUser<SubjectAnalysisReport[]>(userId);
  }

  getTopicAndDifficultyWiseAnalysisForUser(userId: string, subjectId: number): Observable<TopicDifficultyAnalysisReport[]> {
    return this.testReportEndpoint.getTopicAndDifficultyWiseAnalysisForUser<TopicDifficultyAnalysisReport[]>(userId, subjectId);
  }

  getUserSubjectCoverageStats(userId: string): Observable<ChartData> {
    return this.testReportEndpoint.getUserSubjectCoverageStats<ChartData>(userId);
  }

  getTestStatisticsForParent(parentId: string): Observable<ChartData> {
    return this.testReportEndpoint.getTestStatisticsForParent<ChartData>(parentId);
  }

  getOverallTestReportsForParent(ownerId: string): Observable<TestOverallReport> {
    return this.testReportEndpoint.getOverallTestReportsForParent<TestOverallReport>(ownerId);
  }

  getTestReports(testId: number, lernerId: string): Observable<TestAttempt[]> {
    return this.testReportEndpoint.getTestReports<TestAttempt[]>(testId, lernerId);
  }

  getRecentActivities(): Observable<RecentActivity[]> {
    return this.testReportEndpoint.getRecentActivities<RecentActivity[]>();
  }
  
}
