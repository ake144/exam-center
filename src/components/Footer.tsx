import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main Message */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">🌟 Believe in Yourself</h3>
            <p className="text-blue-100 mb-4 leading-relaxed">
              Every exam is a step forward in your learning journey. Remember that your worth 
              isn't measured by a single test score. You're capable, you're growing, and you're doing great!
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-blue-200">
              <span>💪 You've got this!</span>
              <span>📚 Knowledge is power</span>
              <span>🎯 Focus on progress</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/tests" className="hover:text-white transition-colors">
                  Available Tests
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-white transition-colors">
                  Your Results
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Need Help?
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Resources */}
          <div>
            <h4 className="text-lg font-medium mb-4">Support & Resources</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/study-tips" className="hover:text-white transition-colors">
                  Study Tips
                </Link>
              </li>
              <li>
                <Link href="/stress-management" className="hover:text-white transition-colors">
                  Stress Management
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Encouraging Quote */}
        <div className="mt-8 pt-8 border-t border-blue-700">
          <div className="text-center">
            <blockquote className="text-lg italic text-blue-100 mb-2">
              "Success is not final, failure is not fatal: it is the courage to continue that counts."
            </blockquote>
            <p className="text-sm text-blue-200">- Winston Churchill</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-blue-700 flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} Exam Center. Empowering students to succeed.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 