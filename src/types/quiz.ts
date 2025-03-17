export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: Map<number, string>;
  isSubmitted: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface QuizResults {
  score: number;
  totalQuestions: number;
  incorrectAnswers: {
    question: QuizQuestion;
    userAnswer: string;
  }[];
}