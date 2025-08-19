import { Test, TestResult, Question, Answer } from '@/types';

export const calculateScore = (answers: Answer[], questions: Question[]): number => {
  return answers.reduce((total, answer) => {
    return total + answer.pointsEarned;
  }, 0);
};

export const calculatePercentage = (score: number, totalPoints: number): number => {
  return Math.round((score / totalPoints) * 100);
};

export const checkIfPassed = (score: number, passingScore: number): boolean => {
  return score >= passingScore;
};

export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'hard':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case 'student':
      return 'text-blue-600 bg-blue-100';
    case 'teacher':
      return 'text-purple-600 bg-purple-100';
    case 'admin':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getSchoolTypeColor = (type: string): string => {
  switch (type) {
    case 'primary':
      return 'text-green-600 bg-green-100';
    case 'secondary':
      return 'text-blue-600 bg-blue-100';
    case 'high':
      return 'text-purple-600 bg-purple-100';
    case 'university':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const generateTestId = (): string => {
  return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const validateAnswer = (question: Question, userAnswer: string | string[]): boolean => {
  if (question.type === 'multiple_choice' || question.type === 'true_false') {
    return userAnswer === question.correctAnswer;
  } else if (question.type === 'short_answer') {
    return (userAnswer as string).toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim();
  }
  // For essay questions, we'll need manual grading
  return false;
};

export const calculatePointsEarned = (question: Question, isCorrect: boolean): number => {
  return isCorrect ? question.points : 0;
}; 