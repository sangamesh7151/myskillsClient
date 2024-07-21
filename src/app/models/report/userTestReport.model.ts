// user-test-report.model.ts
export interface UserTestReport {
  totalTestsCreated: number;
  totalTestsSkipped: number;
  totalTestsAssigned: number;
  totalTestsNotAssigned: number;
  totalTestsInProgress: number;
  totalUpcomingTests: number;
  totalTestsCompleted: number;
}
