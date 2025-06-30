import Link from 'next/link';
import { fetchCategories } from '../lib/triviaService';
import { Category } from '../types/quiz';

const difficulties = [
  { id: 'easy', name: 'Easy', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
  { id: 'medium', name: 'Medium', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' },
  { id: 'hard', name: 'Hard', color: 'bg-red-500', hoverColor: 'hover:bg-red-600' }
];

export default async function HomePage() {
  let categories: Category[] = [];
  
  try {
    categories = await fetchCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Use fallback categories if API fails
    categories = [
      { id: 9, name: 'General Knowledge', count: 0 },
      { id: 10, name: 'Entertainment: Books', count: 0 },
      { id: 11, name: 'Entertainment: Film', count: 0 },
      { id: 12, name: 'Entertainment: Music', count: 0 },
      { id: 14, name: 'Entertainment: Television', count: 0 },
      { id: 15, name: 'Entertainment: Video Games', count: 0 },
      { id: 17, name: 'Science & Nature', count: 0 },
      { id: 18, name: 'Science: Computers', count: 0 },
      { id: 19, name: 'Science: Mathematics', count: 0 },
      { id: 20, name: 'Mythology', count: 0 },
      { id: 21, name: 'Sports', count: 0 },
      { id: 22, name: 'Geography', count: 0 },
      { id: 23, name: 'History', count: 0 },
      { id: 24, name: 'Politics', count: 0 },
      { id: 25, name: 'Art', count: 0 },
      { id: 27, name: 'Animals', count: 0 },
      { id: 28, name: 'Vehicles', count: 0 },
      { id: 29, name: 'Entertainment: Comics', count: 0 },
      { id: 30, name: 'Science: Gadgets', count: 0 },
      { id: 32, name: 'Entertainment: Cartoon & Animations', count: 0 }
    ];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trivia Master
              </h1>
              <p className="text-gray-600 mt-1">Test your knowledge with thousands of questions</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/leaderboard" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Leaderboard
              </Link>
              <Link 
                href="/admin" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Challenge
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a category and difficulty level to start your trivia adventure. 
            Challenge yourself with questions from the Open Trivia Database.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {category.name.replace('Entertainment: ', '').replace('Science: ', '')}
                </h3>
                <div className="space-y-3">
                  {difficulties.map((difficulty) => (
                    <Link
                      key={difficulty.id}
                      href={`/quiz/${category.id}/${difficulty.id}`}
                      className={`block w-full py-3 px-4 rounded-lg text-white font-medium text-center transition-all duration-200 ${difficulty.color} ${difficulty.hoverColor} transform hover:scale-105`}
                    >
                      {difficulty.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/quiz/9/easy"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <h4 className="text-xl font-semibold mb-2">General Knowledge</h4>
              <p className="text-blue-100">Easy questions to get started</p>
            </Link>
            <Link
              href="/quiz/17/medium"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
            >
              <h4 className="text-xl font-semibold mb-2">Science & Nature</h4>
              <p className="text-green-100">Medium difficulty science questions</p>
            </Link>
            <Link
              href="/quiz/23/hard"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              <h4 className="text-xl font-semibold mb-2">History</h4>
              <p className="text-purple-100">Challenging historical facts</p>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Questions</h3>
            <p className="text-gray-600">Curated questions from the Open Trivia Database</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600">Get immediate feedback and detailed explanations</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your performance and compete on leaderboards</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400">
              Powered by the{' '}
              <a 
                href="https://opentdb.com/api.php" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Open Trivia Database
              </a>
            </p>
            <p className="text-gray-400 mt-2">
              project build by Rahul Kumar
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}