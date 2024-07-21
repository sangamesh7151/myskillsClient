import { Injectable } from '@angular/core';
import { ResultQuestion } from '../../models/testResult/result-question.model';
import { TestResponse } from '../../models/testResult/test-response.model';
import { TestResultEndpoint } from './test-result-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class TestResultService {

  constructor(

    private testResultEndpoint: TestResultEndpoint) {
  }



  saveTestResponse(testResponseViewModel: TestResponse) {
    return this.testResultEndpoint.saveTestResultEndpoint<any>(testResponseViewModel);
  }

  getTestResult(testId: number, attemptId: number, learnerId: string) {
    return this.testResultEndpoint.getTestResultByLearnerId<ResultQuestion[]>(testId, attemptId, learnerId);
  }

  getNumberOfAttempts(testId: number, learnerId: string) {
    return this.testResultEndpoint.getNumberOfAttempts<number[]>(testId, "1");
  }

  pauseTest(attemptId: number, pauseState: any) {
    return this.testResultEndpoint.pauseTestEndPoint<any>(attemptId, pauseState);
  }
  
  startTest(testId: number, pauseState: any) {
    return this.testResultEndpoint.startTestEndPoint<any>(testId, pauseState);
  }

  resumeTest(attemptId: number) {
    return this.testResultEndpoint.resumeTest<any>(attemptId);
  }
}
