'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface PracticePreferences {
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  questionTypes: string[];
  focusAreas: string[];
}

const AIPracticeTest = () => {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState<PracticePreferences>({
    subject: '',
    topic: '',
    difficulty: 'medium',
    questionCount: 10,
    questionTypes: ['multiple_choice'],
    focusAreas: []
  });

  const subjects = [
    { id: 'math', name: 'Mathematics', topics: ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry'] },
    { id: 'science', name: 'Science', topics: ['Physics', 'Chemistry', 'Biology', 'Earth Science'] },
    { id: 'english', name: 'English', topics: ['Grammar', 'Literature', 'Writing', 'Vocabulary'] },
    { id: 'history', name: 'History', topics: ['World History', 'US History', 'Ancient History', 'Modern History'] },
    { id: 'computer-science', name: 'Computer Science', topics: ['Programming', 'Data Structures', 'Algorithms', 'Web Development'] }
  ];

  const questionTypes = [
    { id: 'multiple_choice', name: 'Multiple Choice', description: 'Choose the best answer from options' },
    { id: 'true_false', name: 'True/False', description: 'Determine if a statement is true or false' },
    { id: 'fill_blank', name: 'Fill in the Blank', description: 'Complete the sentence with the correct answer' },
    { id: 'short_answer', name: 'Short Answer', description: 'Provide a brief written response' }
  ];

  const focusAreas = [
    'Problem Solving', 'Critical Thinking', 'Conceptual Understanding', 
    'Application', 'Analysis', 'Synthesis', 'Evaluation'
  ];

  const handlePreferenceChange = (field: keyof PracticePreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuestionTypeToggle = (typeId: string) => {
    setPreferences(prev => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(typeId)
        ? prev.questionTypes.filter(t => t !== typeId)
        : [...prev.questionTypes, typeId]
    }));
  };

  const handleFocusAreaToggle = (area: string) => {
    setPreferences(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const generatePracticeTest = async () => {
    try{
    setIsGenerating(true);

      const response = await fetch('/api/generateQuiz', {
        method: 'POST',
        body: JSON.stringify(preferences)
      });

      const data = await response.json();
      console.log(data);  
      setIsGenerating(false);
      
      if (data.error) {
        console.error('Quiz generation failed:', data.error);
        // You might want to show an error message to the user here
        return;
      }
      
      // Store the quiz data in session storage for the test page
      sessionStorage.setItem('aiPracticeTest', JSON.stringify(data.quiz));
      router.push(`/practice/ai/test/${data.id}`);
      return;
    }
    catch(error){
      console.error(error);
      setIsGenerating(false);
      return;
    }
  };

    
  //   // Simulate AI generation delay
  //   await new Promise(resolve => setTimeout(resolve, 2000));
    
  //   // In a real app, this would call an AI API
  //   const generatedTest = {
  //     id: `ai-${Date.now()}`,
  //     title: `AI Generated ${preferences.subject} Practice Test`,
  //     subject: preferences.subject,
  //     topic: preferences.topic,
  //     difficulty: preferences.difficulty,
  //     questionCount: preferences.questionCount,
  //     preferences: preferences
  //   };

  //   // Store in session storage for the test page
  //   sessionStorage.setItem('aiPracticeTest', JSON.stringify(generatedTest));
    
  //   setIsGenerating(false);
  //   router.push(`/practice/ai/test/${generatedTest.id}`);
  // };

  const selectedSubject = subjects.find(s => s.id === preferences.subject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤖 AI Practice Test Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create personalized practice tests tailored to your learning needs. 
            Our AI will generate questions based on your preferences and focus areas.
          </p>
        </div>

        {/* Confidence Boosting Message */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">🎯 Personalized Learning</h3>
              <p className="text-green-700 mb-4">
                Customize your practice experience to focus on areas where you need the most improvement. 
                This targeted approach will help you build confidence and master difficult concepts.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preferences Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Test Preferences</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={preferences.subject}
                    onChange={(e) => handlePreferenceChange('subject', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic Selection */}
                {selectedSubject && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topic *
                    </label>
                    <select
                      value={preferences.topic}
                      onChange={(e) => handlePreferenceChange('topic', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a topic</option>
                      {selectedSubject.topics.map(topic => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <div className="flex gap-3">
                    {['easy', 'medium', 'hard'].map(difficulty => (
                      <button
                        key={difficulty}
                        onClick={() => handlePreferenceChange('difficulty', difficulty)}
                        className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                          preferences.difficulty === difficulty
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <select
                    value={preferences.questionCount}
                    onChange={(e) => handlePreferenceChange('questionCount', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                    <option value={20}>20 Questions</option>
                    <option value={25}>25 Questions</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Question Types */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Question Types</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {questionTypes.map(type => (
                    <label key={type.id} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.questionTypes.includes(type.id)}
                        onChange={() => handleQuestionTypeToggle(type.id)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Focus Areas and Preview */}
          <div className="space-y-6">
            {/* Focus Areas */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Focus Areas (Optional)</h3>
                <p className="text-sm text-gray-600">Select areas you want to focus on</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map(area => (
                    <button
                      key={area}
                      onClick={() => handleFocusAreaToggle(area)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        preferences.focusAreas.includes(area)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Test Preview */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Test Preview</h3>
              </CardHeader>
              <CardContent>
                {preferences.subject && preferences.topic ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subject:</span>
                      <span className="font-medium">{subjects.find(s => s.id === preferences.subject)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Topic:</span>
                      <span className="font-medium">{preferences.topic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <Badge className={
                        preferences.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        preferences.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {preferences.difficulty.charAt(0).toUpperCase() + preferences.difficulty.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-medium">{preferences.questionCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Question Types:</span>
                      <span className="font-medium">{preferences.questionTypes.length}</span>
                    </div>
                    {preferences.focusAreas.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Focus Areas:</span>
                        <span className="font-medium">{preferences.focusAreas.length}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Select a subject and topic to see preview
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Card>
              <CardContent className="pt-6">
                <Button
                  onClick={generatePracticeTest}
                  disabled={!preferences.subject || !preferences.topic || isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating Questions...
                    </div>
                  ) : (
                    '🤖 Generate Practice Test'
                  )}
                </Button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Our AI will create personalized questions based on your preferences
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPracticeTest; 