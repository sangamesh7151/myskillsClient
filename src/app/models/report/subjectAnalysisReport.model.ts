// subject-analysis-report.model.ts
export interface SubjectAnalysisReport {
  subjectId: number;
  subjectName: string;
  totalTestsTaken: number;
  totalInProgressTests: number;
  overallAchievement: string;
  correctPercentage?: number; // Optional, for detailed analysis
}
