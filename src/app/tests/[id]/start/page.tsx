'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { tests, users } from '@/data/mockData';
import { Test, Question, Answer } from '@/types';
import QuestionDisplay from '@/components/QuestionDisplay';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatTime, validateAnswer, calculatePointsEarned } from '@/utils/helpers';

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Mock current user
  const currentUser = users[0];

  useEffect(() => {
    const foundTest = tests.find(t => t.id === testId);
    if (foundTest) {
      setTest(foundTest);
      setTimeLeft(foundTest.duration * 60); // Convert minutes to seconds
    } else {
      router.push('/tests');
    }
  }, [testId, router]);

  useEffect(() => {
    if (!isTestStarted || isTestCompleted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestStarted, isTestCompleted, timeLeft]);

  const startTest = () => {
    setIsTestStarted(true);
  };

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    if (!test) return;

    // Calculate results
    const testAnswers: Answer[] = test.questions.map(question => {
      const userAnswer = answers[question.id] || '';
      const isCorrect = validateAnswer(question, userAnswer);
      const pointsEarned = calculatePointsEarned(question, isCorrect);
      
      return {
        questionId: question.id,
        userAnswer,
        isCorrect,
        pointsEarned
      };
    });

    const totalScore = testAnswers.reduce((sum, answer) => sum + answer.pointsEarned, 0);
    const percentage = Math.round((totalScore / test.totalPoints) * 100);
    const passed = totalScore >= test.passingScore;

    // In a real app, you would save this to a database
    console.log('Test completed:', {
      testId: test.id,
      userId: currentUser.id,
      score: totalScore,
      totalPoints: test.totalPoints,
      percentage,
      passed,
      answers: testAnswers
    });

    setIsTestCompleted(true);
    setShowConfirmSubmit(false);
  };

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (!isTestStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subject:</span>
                      <span className="font-medium">{test.subject.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Topic:</span>
                      <span className="font-medium">{test.topic.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{formatTime(test.duration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-medium">{test.questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Points:</span>
                      <span className="font-medium">{test.totalPoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passing Score:</span>
                      <span className="font-medium">{test.passingScore}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• Read each question carefully before answering</p>
                    <p>• You can navigate between questions using the question navigator</p>
                    <p>• You can review and change your answers before submitting</p>
                    <p>• The test will automatically submit when time runs out</p>
                    <p>• Make sure you have a stable internet connection</p>
                    <p>• Do not refresh the page during the test</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => router.push('/tests')}>
                    Cancel
                  </Button>
                  <Button onClick={startTest}>
                    Start Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isTestCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-green-600 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Completed!</h1>
              <p className="text-gray-600 mb-6">
                Your test has been submitted successfully. You can view your results in the results section.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => router.push('/tests')}>
                  Back to Tests
                </Button>
                <Button onClick={() => router.push('/results')}>
                  View Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / test.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Timer */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{test.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {test.questions.length}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-gray-600">Time Remaining</div>
                <div className={`text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-lg font-bold text-gray-900">{Math.round(progress)}%</div>
              </div>
              
              <Button
                variant="danger"
                onClick={() => setShowConfirmSubmit(true)}
                disabled={answeredQuestions === 0}
              >
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Question Navigator</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {test.questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => goToQuestion(index)}
                      className={`p-2 text-sm rounded border transition-colors ${
                        index === currentQuestionIndex
                          ? 'bg-blue-600 text-white border-blue-600'
                          : answers[question.id]
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span>Current Question</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span>Unanswered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Display */}
          <div className="lg:col-span-3">
            <QuestionDisplay
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              userAnswer={answers[currentQuestion.id]}
              onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
            />
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              <div className="flex space-x-2">
                {currentQuestionIndex < test.questions.length - 1 ? (
                  <Button onClick={nextQuestion}>
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => setShowConfirmSubmit(true)}
                    disabled={answeredQuestions === 0}
                  >
                    Submit Test
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Confirm Submission</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Are you sure you want to submit your test? You won't be able to make changes after submission.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Answered: {answeredQuestions} / {test.questions.length} questions
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleSubmitTest}>
                  Submit Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 