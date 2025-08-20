'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Test } from '@/types';
import { formatTime, getDifficultyColor } from '@/utils/helpers';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const TestPreview = () => {
  const params = useParams();
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSampleQuestions, setShowSampleQuestions] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate with mock data
    const mockTest: Test = {
      id: params.id as string,
      title: "Advanced Mathematics Final Exam",
      subject: { id: "1", name: "Mathematics" , description: "Mathematics is the study of numbers, shapes, and patterns.", grade: "12", topics: [] },
      topic: { id: "1", name: "Calculus" , description: "Calculus is the study of change and rates of change.", questions: [] },
      duration: 120, // 2 hours
      totalPoints: 100,
      passingScore: 70,
      createdAt: new Date(),
      questions: [
        {
          id: "1",
          text: "What is the derivative of f(x) = x² + 3x + 1?",
          type: "multiple_choice",
          difficulty: "medium",
          points: 5,
          options: [
            { id: "a", text: "2x + 3" },
            { id: "b", text: "x² + 3" },
            { id: "c", text: "2x + 1" },
            { id: "d", text: "x + 3" }
          ],
          correctAnswer: "a"
        },
        {
          id: "2",
          text: "Evaluate the integral ∫(2x + 1)dx",
          type: "multiple_choice",
          difficulty: "easy",
          points: 3,
          options: [
            { id: "a", text: "x² + x + C" },
            { id: "b", text: "2x² + x + C" },
            { id: "c", text: "x² + 2x + C" },
            { id: "d", text: "2x + 1 + C" }
          ],
          correctAnswer: "a"
        }
      ]
    };

    setTest(mockTest);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
            <p className="text-gray-600 mb-6">The test you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.push('/tests')}>
              Back to Tests
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Test Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
          <p className="text-lg text-gray-600 mb-6">
            Preview your test before starting. This helps you understand what to expect and feel more confident.
          </p>
          
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Test Information</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <span className="font-medium">{test.passingScore}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confidence Boosting Section */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">💪 You&apos;ve Got This!</h3>
                <p className="text-blue-800 mb-4">
                  Remember: Every question is an opportunity to show what you know. 
                  Take your time, read carefully, and trust your preparation.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-700">
                  <span>✅ You&apos;re well-prepared</span>
                  <span>✅ Stay calm and focused</span>
                  <span>✅ Trust your instincts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Questions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Sample Questions</h2>
            <Button 
              variant="outline" 
              onClick={() => setShowSampleQuestions(!showSampleQuestions)}
            >
              {showSampleQuestions ? 'Hide' : 'Show'} Sample Questions
            </Button>
          </div>

          {showSampleQuestions && (
            <div className="space-y-4">
              {test.questions.slice(0, 2).map((question, index) => (
                <Card key={question.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Question {index + 1}
                      </h3>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{question.text}</p>
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <div key={option.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-600 mr-3">{option.id.toUpperCase()}.</span>
                          <span className="text-gray-700">{option.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      Points: {question.points}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <Card>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => router.push('/tests')}
            >
              Back to Tests
            </Button>
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => router.push(`/tests/${test.id}/start`)}
            >
              Start Test Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TestPreview; 