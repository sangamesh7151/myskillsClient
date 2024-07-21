export class TestAttempt {
  testId: number = 0;
  version: string;
  questions: number;
  totalQuestions: string;
  correctAnswers: string;
  duration: string;
  passRate: number;
  PassPercentage: string;
  status: string; // "Passed" or "Failed"
  score: number; // Percentage score
  timeTaken: string; // Time taken to complete the test
  date: string; // Date when the test was completed
  chartOptions: ChartOptions; // Updated chart options
  knowledgeAreas: KnowledgeArea[]; // Knowledge areas for the test attempt
}

class ChartOptions {
  chartType: string; // Type of the chart, e.g., "pie"
  chartLabels: string[]; // Labels for the chart segments
  chartData: {
    data: number[], // Data for the chart
    labels: string[];
    backgroundColor: string[], // Background colors for chart segments
  }[]; // Chart data as an array of objects
}


export class KnowledgeArea {
  name: string; // Name of the knowledge area
  totalQuestions: number; // Total questions in this area
  correctPercentage: number; // Percentage of correct answers
  wrongPercentage: number; // Percentage of wrong answers
}

export class TestAttemptDetail {
  number: number; // Question number
  text: string; // Question text
  options: TestAttemptOption[]; // Options for the question
}

export class TestAttemptOption {
  text: string; // Option text
  isSelected: boolean; // Whether the option was selected
  isCorrect: boolean; // Whether the option was correct
}
