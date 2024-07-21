// test-overall-report.model.ts
export interface TestOverallReport {
  numberOfTestsCreated: number;
  numberOfTestsSkipped: number;
  numberOfTestsAssigned: number;
  numberOfTestsNotAssigned: number;
  numberOfTestsInProgress: number;
  numberOfUpcomingTests: number;
  numberOfTestsCompleted: number;
}
