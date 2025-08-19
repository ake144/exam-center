export interface School {
  id: string;
  name: string;
  location: string;
  type: 'primary' | 'secondary' | 'high' | 'university';
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  grade: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface Test {
  id: string;
  title: string;
  subject: Subject;
  topic: Topic;
  questions: Question[];
  duration: number; // in minutes
  totalPoints: number;
  passingScore: number;
  createdAt: Date;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  school: School;
  grade?: string;
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  completedAt: Date;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
  pointsEarned: number;
} 