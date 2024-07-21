import { QuestionViewModel } from "../question/question.model";

export interface ExamDetails {
  id: number;
  examName: string;
  questionCount: number;
  durationMinutes: number;
  examStartDate?: string; // Optional in TypeScript to match the C# nullable DateTime
  examEndDate?: string; 
  allowedAttempts: number;
  displayFinalScore: boolean;
  resultDisplayMode: string;
  submissionMessage: string;
  successFeedback: string;
  failureFeedback: string;
  pausedTime: number;
  examQuestions: QuestionWithAnswered[];
}


export interface QuestionWithAnswered extends QuestionViewModel {
  answered: boolean;
}
