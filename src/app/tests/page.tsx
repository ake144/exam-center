'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { tests } from '@/data/mockData';
import TestCard from '@/components/TestCard';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function TestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  // Get unique subjects and difficulties for filters
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(tests.map(test => test.subject.name))];
    return uniqueSubjects;
  }, []);

  const difficulties = useMemo(() => {
    const allDifficulties = tests.flatMap(test => 
      test.questions.map(q => q.difficulty)
    );
    const uniqueDifficulties = [...new Set(allDifficulties)];
    return uniqueDifficulties;
  }, []);

  // Filter tests based on search and filters
  const filteredTests = useMemo(() => {
    return tests.filter(test => {
      const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.topic.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubject = !selectedSubject || test.subject.name === selectedSubject;
      
      const matchesDifficulty = !selectedDifficulty || 
        test.questions.some(q => q.difficulty === selectedDifficulty);
      
      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }, [searchTerm, selectedSubject, selectedDifficulty]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubject('');
    setSelectedDifficulty('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Available Tests</h1>
              <p className="text-gray-600 mt-2">
                Browse and take tests from various subjects and topics
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link href="/practice/ai">
                🤖 Create AI Practice Test
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Tests
                </label>
                <input
                  type="text"
                  placeholder="Search by title, subject, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Difficulties</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredTests.length} of {tests.length} tests
            </p>
            {searchTerm || selectedSubject || selectedDifficulty ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {searchTerm && (
                  <Badge variant="info" size="sm">
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {selectedSubject && (
                  <Badge variant="info" size="sm">
                    Subject: {selectedSubject}
                  </Badge>
                )}
                {selectedDifficulty && (
                  <Badge variant="info" size="sm">
                    Difficulty: {selectedDifficulty}
                  </Badge>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tests found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
                <div className="mt-6">
                  <Button onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 