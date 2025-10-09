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
  likes?: string[];
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
}

export interface TestComment {
  id: string;
  testId: string;
  authorId: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
  likes: string[];
  parentId: string | null;
  replies: TestComment[];
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}
