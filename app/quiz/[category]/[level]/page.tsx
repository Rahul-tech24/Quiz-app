import { fetchQuestions, fetchCategories } from '../../../../lib/triviaService';
import Quiz from '../../../../components/Quiz';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { ProcessedQuestion, Category } from '../../../../types/quiz';
import { notFound } from 'next/navigation';

export default async function QuizPage({ 
  params 
}: { 
  params: Promise<{ category: string; level: string }> 
}) {
  const { category, level } = await params;
  
  // Validate category and level
  let categories: Category[] = [];
  try {
    categories = await fetchCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Use fallback categories for validation
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
  
  const categoryExists = categories.find(cat => cat.id.toString() === category);
  const validLevels = ['easy', 'medium', 'hard'];
  
  if (!categoryExists || !validLevels.includes(level)) {
    notFound();
  }

  try {
    const questions: ProcessedQuestion[] = await fetchQuestions(
      10, // 10 questions per quiz
      parseInt(category),
      level as 'easy' | 'medium' | 'hard'
    );

    if (questions.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Questions Available</h2>
            <p className="text-gray-600 mb-6">
              Sorry, no questions are available for this category and difficulty level at the moment.
            </p>
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Choose Another Quiz
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {categoryExists.name.replace('Entertainment: ', '').replace('Science: ', '')}
            </h1>
            <p className="text-lg text-gray-600 capitalize">
              Difficulty: {level} • {questions.length} Questions
            </p>
          </div>
          <ErrorBoundary>
            <Quiz questions={questions} />
          </ErrorBoundary>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading quiz:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Quiz</h2>
          <p className="text-gray-600 mb-6">
            Something went wrong while loading the quiz. Please try again.
          </p>
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }
}