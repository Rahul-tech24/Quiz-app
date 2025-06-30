import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back Home
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try one of these popular quizzes:</p>
            <div className="mt-3 space-y-2">
              <Link
                href="/quiz/9/easy"
                className="block text-blue-600 hover:text-blue-800 transition-colors"
              >
                General Knowledge (Easy)
              </Link>
              <Link
                href="/quiz/17/medium"
                className="block text-blue-600 hover:text-blue-800 transition-colors"
              >
                Science & Nature (Medium)
              </Link>
              <Link
                href="/quiz/23/hard"
                className="block text-blue-600 hover:text-blue-800 transition-colors"
              >
                History (Hard)
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            If you believe this is an error, please check the URL and try again.
          </p>
        </div>
      </div>
    </div>
  );
} 