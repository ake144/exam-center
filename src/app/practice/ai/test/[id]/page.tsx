'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface AIPracticeTest {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: string;
  questionCount: number;
  questions: QuizQuestion[];
  instructions: string;
  timeLimit?: number;
  createdAt: string;
}

const AIPracticeTestPage = () => {
  const params = useParams();
  const router = useRouter();
  const [test, setTest] = useState<AIPracticeTest | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false)

  useEffect(() => {
    // Load test data from session storage
    const testData = sessionStorage.getItem('aiPracticeTest');

    if (testData) {
      const parsedTest = JSON.parse(testData);
      setTest(parsedTest);
      
      // Use the questions from the AI-generated quiz
      setQuestions(parsedTest.questions || []);
      
      // Set timer (30 minutes for practice test)
      setTimeRemaining(30 * 60);
    } else {
      router.push('/practice/ai');
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (timeRemaining > 0 && !isTestComplete) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTestComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isTestComplete]);



  const handleAnswerChange = (questionId: number, answer: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleCompleteTest = () => {
    setIsTestComplete(true);
    setShowResults(true);
    setShowAnswers(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your AI practice test...</p>
        </div>
      </div>
    );
  }

  if (!test || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
          <p className="text-gray-600 mb-6">The practice test you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/practice/ai')}>
            Create New Practice Test
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <h1 className="text-3xl font-bold text-gray-900">Practice Test Complete! 🎉</h1>
                <p className="text-lg text-gray-600">Great job completing your AI-generated practice test!</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                    <div className="text-gray-600">Total Questions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Object.keys(answers).length}
                    </div>
                    <div className="text-gray-600">Questions Answered</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatTime(30 * 60 - timeRemaining)}
                    </div>
                    <div className="text-gray-600">Time Taken</div>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <p className="text-lg text-gray-700">
                    You&apos;ve taken a great step in your learning journey! 
                    Review your answers and explanations to improve your understanding.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => setShowResults(false)}>
                      Review Answers
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/practice/ai')}>
                      Create Another Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Timer */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{test.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-gray-600">Time Remaining</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Question {currentQuestionIndex + 1}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Multiple Choice • 5 points
                  </p>
                </div>
                <Badge className={
                  test.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  test.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-lg text-gray-700 mb-6">{currentQuestion.question}</p>
                
                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <label key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={index}
                        checked={answers[currentQuestion.id] === index}
                        onChange={(e) => handleAnswerChange(currentQuestion.id, parseInt(e.target.value))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-600 mr-2">{String.fromCharCode(65 + index)}.</span>
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
               {showAnswers &&<>
                <p>The correct answer is {String.fromCharCode(65 + currentQuestion.correctAnswer)}.</p>
                <p className="text-lg text-gray-700 mb-6">{currentQuestion.explanation}</p>
                </>
             }
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </Button>

            <div className="flex gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    index === currentQuestionIndex
                      ? 'bg-blue-600 text-white'
                      : answers[questions[index].id]
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                onClick={handleCompleteTest}
                className="bg-green-600 hover:bg-green-700"
              >
                Complete Test
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                Next →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPracticeTestPage; 