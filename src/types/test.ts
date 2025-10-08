export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Test {
  id: string;
  ownerId: string;
  subject: string;
  score: number;
  takenAt: string;
  questionsCount: number;
  respondentsCount: number;
  averageScore: number;
  averageCorrect: number;
  questions: Question[];
}

export interface TestResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
}

export interface TestStatistics {
  testId: string;
  scores: number[];
  averageScore: number;
  respondentsCount: number;
  averageCorrect: number;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}
