export interface RecentActivity {
  childName: string;
  activityDescription: string;
  activityDate: Date;
  isCompletedTest: boolean;
  attemptId?: number;
  testId?: number;
  UserId: string;
}
