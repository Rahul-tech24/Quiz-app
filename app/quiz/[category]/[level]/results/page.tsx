'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const score = Number(searchParams.get('score') || 0);
  const total = Number(searchParams.get('total') || 10);
  const percentage = Number(searchParams.get('percentage') || 0);
  const time = Number(searchParams.get('time') || 0);
  const category = searchParams.get('category') || 'Quiz';
  const difficulty = searchParams.get('difficulty') || 'Mixed';

  const correct = score;
  const incorrect = total - score;

  const getScoreMessage = () => {
    if (percentage >= 90) return "Excellent! You're a trivia master! 🏆";
    if (percentage >= 80) return "Great job! You really know your stuff! 🎉";
    if (percentage >= 70) return "Good work! You have solid knowledge! 👍";
    if (percentage >= 60) return "Not bad! Keep learning and improving! 📚";
    if (percentage >= 50) return "You're getting there! Practice makes perfect! 💪";
    return "Keep studying! Every expert was once a beginner! 🌱";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Results</h1>
            <p className="text-lg text-gray-600">{getScoreMessage()}</p>
          </div>

          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{percentage}%</div>
              <div className="text-sm text-blue-600">Final Score</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{correct}</div>
              <div className="text-sm text-green-600">Correct Answers</div>
            </div>
            <div className="bg-red-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{incorrect}</div>
              <div className="text-sm text-red-600">Incorrect Answers</div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quiz Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2 font-medium">{category}</span>
              </div>
              <div>
                <span className="text-gray-600">Difficulty:</span>
                <span className="ml-2 font-medium capitalize">{difficulty}</span>
              </div>
              <div>
                <span className="text-gray-600">Total Questions:</span>
                <span className="ml-2 font-medium">{total}</span>
              </div>
              <div>
                <span className="text-gray-600">Time Taken:</span>
                <span className="ml-2 font-medium">
                  {Math.floor(time / 60)}m {time % 60}s
                </span>
              </div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Analysis</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Accuracy Rate</span>
                <span className={`font-semibold ${getScoreColor()}`}>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    percentage >= 80 ? 'bg-green-500' : 
                    percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500">
                {percentage >= 80 ? 'Outstanding performance!' :
                 percentage >= 60 ? 'Good performance, room for improvement.' :
                 'Keep practicing to improve your score!'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-700 transition-colors font-medium"
            >
              Take Another Quiz
            </Link>
            <Link
              href="/leaderboard"
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg text-center hover:bg-gray-700 transition-colors font-medium"
            >
              View Leaderboard
            </Link>
          </div>

          {/* Quick Start */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/quiz/9/easy"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                <div className="font-semibold">General Knowledge</div>
                <div className="text-sm opacity-90">Easy Level</div>
              </Link>
              <Link
                href="/quiz/17/medium"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                <div className="font-semibold">Science & Nature</div>
                <div className="text-sm opacity-90">Medium Level</div>
              </Link>
              <Link
                href="/quiz/23/hard"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
              >
                <div className="font-semibold">History</div>
                <div className="text-sm opacity-90">Hard Level</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 