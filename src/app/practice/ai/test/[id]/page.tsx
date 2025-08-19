'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface GeneratedQuestion {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  options?: { id: string; text: string }[];
  correctAnswer?: string;
  explanation?: string;
}

interface AIPracticeTest {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  preferences: any;
}

const AIPracticeTestPage = () => {
  const params = useParams();
  const router = useRouter();
  const [test, setTest] = useState<AIPracticeTest | null>(null);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load test data from session storage
    const testData = sessionStorage.getItem('aiPracticeTest');
    if (testData) {
      const parsedTest = JSON.parse(testData);
      setTest(parsedTest);
      
      // Generate mock questions based on preferences
      generateQuestions(parsedTest);
      
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

  const generateQuestions = (testData: AIPracticeTest) => {
    // Mock AI-generated questions based on preferences
    const mockQuestions: GeneratedQuestion[] = [];
    
    for (let i = 0; i < testData.questionCount; i++) {
      const questionType = testData.preferences.questionTypes[
        Math.floor(Math.random() * testData.preferences.questionTypes.length)
      ];
      
      let question: GeneratedQuestion;
      
      switch (questionType) {
        case 'multiple_choice':
          question = generateMultipleChoiceQuestion(i + 1, testData);
          break;
        case 'true_false':
          question = generateTrueFalseQuestion(i + 1, testData);
          break;
        case 'fill_blank':
          question = generateFillBlankQuestion(i + 1, testData);
          break;
        case 'short_answer':
          question = generateShortAnswerQuestion(i + 1, testData);
          break;
        default:
          question = generateMultipleChoiceQuestion(i + 1, testData);
      }
      
      mockQuestions.push(question);
    }
    
    setQuestions(mockQuestions);
  };

  const generateMultipleChoiceQuestion = (index: number, testData: AIPracticeTest): GeneratedQuestion => {
    const subjects = {
      math: {
        algebra: [
          {
            text: "What is the solution to the equation 2x + 5 = 13?",
            options: ["x = 4", "x = 6", "x = 8", "x = 3"],
            correctAnswer: "x = 4",
            explanation: "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4"
          },
          {
            text: "Factor the expression x² - 4x + 4",
            options: ["(x-2)²", "(x+2)²", "(x-4)²", "(x+4)²"],
            correctAnswer: "(x-2)²",
            explanation: "This is a perfect square trinomial: x² - 4x + 4 = (x-2)²"
          }
        ],
        calculus: [
          {
            text: "What is the derivative of f(x) = x³ + 2x² + 1?",
            options: ["3x² + 4x", "3x² + 2x", "x² + 4x", "3x + 4"],
            correctAnswer: "3x² + 4x",
            explanation: "Apply power rule: derivative of x³ is 3x², derivative of 2x² is 4x"
          }
        ]
      },
      science: {
        physics: [
          {
            text: "What is the SI unit of force?",
            options: ["Newton", "Joule", "Watt", "Pascal"],
            correctAnswer: "Newton",
            explanation: "Force is measured in Newtons (N) in the SI system"
          }
        ]
      }
    };

    const subjectData = subjects[testData.subject as keyof typeof subjects];
    const topicData = subjectData?.[testData.topic.toLowerCase() as keyof typeof subjectData];
    
    if (topicData && topicData.length > 0) {
      const questionData = topicData[index % topicData.length];
      return {
        id: `q${index}`,
        text: questionData.text,
        type: 'multiple_choice',
        difficulty: testData.difficulty,
        points: 5,
        options: questionData.options.map((opt, i) => ({ id: String.fromCharCode(97 + i), text: opt })),
        correctAnswer: questionData.correctAnswer,
        explanation: questionData.explanation
      };
    }

    // Fallback question
    return {
      id: `q${index}`,
      text: `Sample question ${index} for ${testData.topic}`,
      type: 'multiple_choice',
      difficulty: testData.difficulty,
      points: 5,
      options: [
        { id: 'a', text: 'Option A' },
        { id: 'b', text: 'Option B' },
        { id: 'c', text: 'Option C' },
        { id: 'd', text: 'Option D' }
      ],
      correctAnswer: 'a',
      explanation: 'This is a sample explanation for the correct answer.'
    };
  };

  const generateTrueFalseQuestion = (index: number, testData: AIPracticeTest): GeneratedQuestion => {
    return {
      id: `q${index}`,
      text: `True or False: This is a sample true/false question ${index} about ${testData.topic}.`,
      type: 'true_false',
      difficulty: testData.difficulty,
      points: 3,
      options: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' }
      ],
      correctAnswer: 'true',
      explanation: 'This is a sample explanation for the correct answer.'
    };
  };

  const generateFillBlankQuestion = (index: number, testData: AIPracticeTest): GeneratedQuestion => {
    return {
      id: `q${index}`,
      text: `Complete the sentence: The capital of France is __________.`,
      type: 'fill_blank',
      difficulty: testData.difficulty,
      points: 4,
      correctAnswer: 'Paris',
      explanation: 'Paris is the capital and largest city of France.'
    };
  };

  const generateShortAnswerQuestion = (index: number, testData: AIPracticeTest): GeneratedQuestion => {
    return {
      id: `q${index}`,
      text: `Explain briefly: What are the main principles of ${testData.topic}?`,
      type: 'short_answer',
      difficulty: testData.difficulty,
      points: 8,
      correctAnswer: 'Sample answer',
      explanation: 'This is a sample explanation for the short answer question.'
    };
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
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
          <p className="text-gray-600 mb-6">The practice test you're looking for doesn't exist.</p>
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
                    You've taken a great step in your learning journey! 
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
                    {currentQuestion.type.replace('_', ' ').toUpperCase()} • {currentQuestion.points} points
                  </p>
                </div>
                <Badge className={
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-lg text-gray-700 mb-6">{currentQuestion.text}</p>
                
                {/* Answer Options */}
                {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map(option => (
                      <label key={option.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option.id}
                          checked={answers[currentQuestion.id] === option.id}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-medium text-gray-600 mr-2">{option.id.toUpperCase()}.</span>
                        <span className="text-gray-700">{option.text}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'true_false' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map(option => (
                      <label key={option.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option.id}
                          checked={answers[currentQuestion.id] === option.id}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option.text}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'fill_blank' && (
                  <div>
                    <input
                      type="text"
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {currentQuestion.type === 'short_answer' && (
                  <div>
                    <textarea
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Type your answer here..."
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
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