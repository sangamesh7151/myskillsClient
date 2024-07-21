import { QuestionViewModel } from "./question.model";

export interface QuestionUpdateRequest {
  original: QuestionViewModel;
  modified: QuestionViewModel;
}
