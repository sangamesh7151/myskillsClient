export interface ResultQuestion {
  questionNumber: number;
  totalQuestions: number; // This might be the same for all questions if it's a static number
  questionText: string;
  isCorrectlyAnswered: boolean;
  options: QuestionOption[];
}

export interface QuestionOption {
  text: string;
  isSelected: boolean;
  isCorrect?: boolean; // Optionally included if you know the correctness of the option upfront
}
