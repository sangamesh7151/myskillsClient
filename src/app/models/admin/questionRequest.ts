import { DifficultyLevel, QuestionTypeId } from "../question/question.model";

export class QuestionRequest {
  gradeId?: number;
  subjectId?: number;
  topicId?: number;
  difficultyLevel?: DifficultyLevel;
  questionTypeId?: QuestionTypeId

  constructor() {
    this.gradeId = undefined;
    this.subjectId = undefined;
    this.topicId = undefined;
    this.difficultyLevel = undefined;
    this.questionTypeId = undefined;
  }
}
