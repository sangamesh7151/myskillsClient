import { QuestionResponse } from "./question-response.model";

export interface TestResponse {
  testAttemptId?: number;
  testId: number;
  questionsResponses: QuestionResponse[]; // An array of question responses
}
