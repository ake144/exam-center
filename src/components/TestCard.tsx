'use client';

import React from 'react';
import Link from 'next/link';
import { Test } from '@/types';
import { formatTime, getDifficultyColor } from '@/utils/helpers';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface TestCardProps {
  test: Test;
  showActions?: boolean;
}

const TestCard: React.FC<TestCardProps> = ({ test, showActions = true }) => {
  const getSubjectColor = (subjectName: string) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'Science': 'bg-green-100 text-green-800',
      'English': 'bg-purple-100 text-purple-800'
    };
    return colors[subjectName as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{test.subject.name} • {test.topic.name}</p>
          </div>
          <Badge variant="info" className={getSubjectColor(test.subject.name)}>
            {test.subject.name}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{formatTime(test.duration)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Questions:</span>
            <span className="font-medium">{test.questions.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Points:</span>
            <span className="font-medium">{test.totalPoints}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Passing Score:</span>
            <span className="font-medium">{test.passingScore}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Created:</span>
            <span className="font-medium">{test.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {test.questions.map((question) => (
            <Badge key={question.id} size="sm" className={getDifficultyColor(question.difficulty)}>
              {question.difficulty}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter>
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1">
              <Link href={`/tests/${test.id}/preview`}>
                Preview
              </Link>
            </Button>
            <Button className="flex-1">
              <Link href={`/tests/${test.id}/start`}>
                Start Test
              </Link>
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default TestCard; 