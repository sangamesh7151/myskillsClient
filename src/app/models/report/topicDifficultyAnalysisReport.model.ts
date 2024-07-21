// topic-difficulty-analysis-report.model.ts
export interface TopicDifficultyAnalysisReport {
  topicName: string;
  difficultyLevel: string;
  totalTestsTaken: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  overallAchievement: string;
}
