'use client';

import React, { useState } from 'react';
import { testResults, tests, users } from '@/data/mockData';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/utils/helpers';

export default function ResultsPage() {
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  
  // Mock current user
  const currentUser = users[0];
  
  // Filter results for current user
  const userResults = testResults.filter(result => result.userId === currentUser.id);
  
  // Calculate statistics
  const totalTests = userResults.length;
  const passedTests = userResults.filter(result => result.passed).length;
  const averageScore = totalTests > 0 
    ? Math.round(userResults.reduce((acc, result) => acc + result.percentage, 0) / totalTests)
    : 0;

  const getResultDetails = (resultId: string) => {
    return userResults.find(r => r.id === resultId);
  };

  const selectedResultData = selectedResult ? getResultDetails(selectedResult) : null;
  const selectedTest = selectedResultData ? tests.find(t => t.id === selectedResultData.testId) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Test Results</h1>
          <p className="text-gray-600 mt-2">
            View your test performance and detailed results
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Tests</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tests Passed</p>
                  <p className="text-2xl font-bold text-gray-900">{passedTests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Recent Results</h2>
              </CardHeader>
              <CardContent>
                {userResults.length > 0 ? (
                  <div className="space-y-4">
                    {userResults.map((result) => {
                      const test = tests.find(t => t.id === result.testId);
                      return (
                        <div
                          key={result.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedResult === result.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedResult(result.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{test?.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {test?.subject.name} • {test?.topic.name}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-gray-600">
                                  Score: {result.score}/{result.totalPoints} ({result.percentage}%)
                                </span>
                                <Badge variant={result.passed ? 'success' : 'danger'}>
                                  {result.passed ? 'Passed' : 'Failed'}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                {formatDate(result.completedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results yet</h3>
                    <p className="text-gray-600 mb-4">
                      Complete your first test to see your results here.
                    </p>
                    <Button onClick={() => window.location.href = '/tests'}>
                      Take a Test
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Result Details */}
          <div className="lg:col-span-1">
            {selectedResultData && selectedTest ? (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Result Details</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedTest.title}</h4>
                    <p className="text-sm text-gray-600">{selectedTest.subject.name}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Score:</span>
                      <span className="font-medium">
                        {selectedResultData.score}/{selectedResultData.totalPoints}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Percentage:</span>
                      <span className="font-medium">{selectedResultData.percentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant={selectedResultData.passed ? 'success' : 'danger'}>
                        {selectedResultData.passed ? 'Passed' : 'Failed'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-medium">{formatDate(selectedResultData.completedAt)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h5 className="font-medium text-gray-900 mb-3">Question Breakdown</h5>
                    <div className="space-y-2">
                      {selectedResultData.answers.map((answer) => {
                        const question = selectedTest.questions.find(q => q.id === answer.questionId);
                        return (
                          <div key={answer.questionId} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 truncate">
                              {question?.text.substring(0, 30)}...
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">
                                {answer.pointsEarned}/{question?.points}
                              </span>
                              <Badge
                                variant={answer.isCorrect ? 'success' : 'danger'}
                                size="sm"
                              >
                                {answer.isCorrect ? '✓' : '✗'}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = `/tests/${selectedTest.id}/start`}
                    >
                      Retake Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Select a result to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 