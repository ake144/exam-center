'use client';

import React, { useState } from 'react';
import { Question } from '@/types';
import { getDifficultyColor } from '@/utils/helpers';
import Badge from './ui/Badge';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  userAnswer?: string | string[];
  onAnswerChange?: (answer: string | string[]) => void;
  showCorrectAnswer?: boolean;
  disabled?: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  questionNumber,
  userAnswer,
  onAnswerChange,
  showCorrectAnswer = false,
  disabled = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(userAnswer || '');

  const handleAnswerChange = (answer: string | string[]) => {
    setSelectedAnswer(answer);
    onAnswerChange?.(answer);
  };

  const isCorrect = (answer: string) => {
    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.includes(answer);
    }
    return question.correctAnswer === answer;
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  showCorrectAnswer
                    ? isCorrect(option)
                      ? 'border-green-500 bg-green-50'
                      : selectedAnswer === option && !isCorrect(option)
                      ? 'border-red-500 bg-red-50'
                      : ''
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  disabled={disabled}
                  className="mr-3"
                />
                <span className="flex-1">{option}</span>
                {showCorrectAnswer && (
                  <Badge
                    variant={isCorrect(option) ? 'success' : selectedAnswer === option ? 'danger' : 'default'}
                    size="sm"
                  >
                    {isCorrect(option) ? 'Correct' : selectedAnswer === option ? 'Incorrect' : ''}
                  </Badge>
                )}
              </label>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  showCorrectAnswer
                    ? isCorrect(option)
                      ? 'border-green-500 bg-green-50'
                      : selectedAnswer === option && !isCorrect(option)
                      ? 'border-red-500 bg-red-50'
                      : ''
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  disabled={disabled}
                  className="mr-3"
                />
                <span className="flex-1">{option}</span>
                {showCorrectAnswer && (
                  <Badge
                    variant={isCorrect(option) ? 'success' : selectedAnswer === option ? 'danger' : 'default'}
                    size="sm"
                  >
                    {isCorrect(option) ? 'Correct' : selectedAnswer === option ? 'Incorrect' : ''}
                  </Badge>
                )}
              </label>
            ))}
          </div>
        );

      case 'short_answer':
        return (
          <div>
            <textarea
              value={selectedAnswer as string}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={disabled}
              placeholder="Enter your answer..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            {showCorrectAnswer && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">Correct Answer:</p>
                <p className="text-green-700">{question.correctAnswer}</p>
              </div>
            )}
          </div>
        );

      case 'essay':
        return (
          <div>
            <textarea
              value={selectedAnswer as string}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={disabled}
              placeholder="Write your essay answer..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={6}
            />
            {showCorrectAnswer && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Sample Answer:</p>
                <p className="text-blue-700">{question.correctAnswer}</p>
              </div>
            )}
          </div>
        );

      default:
        return <p className="text-gray-500">Unsupported question type</p>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-semibold text-gray-900">Question {questionNumber}</span>
          <Badge size="sm" className={getDifficultyColor(question.difficulty)}>
            {question.difficulty}
          </Badge>
          <Badge variant="info" size="sm">
            {question.points} pts
          </Badge>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-900 text-lg">{question.text}</p>
      </div>
      
      {renderQuestionContent()}
      
      {question.explanation && showCorrectAnswer && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm font-medium text-gray-800">Explanation:</p>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay; 