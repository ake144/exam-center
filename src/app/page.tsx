import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import {Button} from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
    
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">ExamCenter</span>
            </h1>

            

            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Your trusted platform for online assessments. Take your exams with confidence 
              and showcase your knowledge in a supportive environment.
            </p>
            
            {/* Confidence Boosting Message */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-3">💪 You&apos;re Ready for This!</h2>
              <p className="text-green-700 text-lg mb-4">
                Remember: Every test is an opportunity to demonstrate your learning and growth. 
                Trust in your preparation and abilities.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-green-600">
                <span>✅ You&apos;ve studied hard</span>
                <span>✅ You understand the material</span>
                <span>✅ You can do this</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                <Link href="/tests">
                  View Available Tests
                </Link>
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4">
                <Link href="/results">
                  Check Your Results
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ExamCenter?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Test Preview</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Preview your tests before starting to understand the format and feel more confident.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Instant Results</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get immediate feedback on your performance with detailed results and explanations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Secure & Reliable</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your data is protected with industry-standard security measures and reliable infrastructure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Encouragement Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Remember: You&apos;re More Than a Test Score
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every exam is just one step in your learning journey. Whether you ace it or need to try again, 
              you&apos;re growing and developing valuable skills. Focus on the process, not just the outcome.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Before Your Test</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li>• Take deep breaths and stay calm</li>
                  <li>• Read instructions carefully</li>
                  <li>• Trust your preparation</li>
                  <li>• Remember: you&apos;ve got this!</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🌟 After Your Test</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li>• Celebrate your effort</li>
                  <li>• Review what you learned</li>
                  <li>• Plan your next steps</li>
                  <li>• Be proud of yourself</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ready to Get Started?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">📚</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Browse Tests</h3>
                <p className="text-sm text-gray-600 mb-4">Find available exams in your subjects</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Link href="/tests">View Tests</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Check Results</h3>
                <p className="text-sm text-gray-600 mb-4">Review your past performance</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Link href="/results">View Results</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Practice Tests</h3>
                <p className="text-sm text-gray-600 mb-4">Generate personalized practice questions</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Link href="/practice/ai">Create Test</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🆘</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">Get support when you need it</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Link href="/help">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
