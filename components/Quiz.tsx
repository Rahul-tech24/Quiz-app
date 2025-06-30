'use client';
import { ProcessedQuestion } from '../types/quiz';
import QuestionCard from './QuestionCard';
import TimerDisplay from './TimerDisplay';
import { useState, useEffect } from 'react';
import Button from './Button';
import { calculateScore } from '../lib/triviaService';
import { useParams } from 'next/navigation';

interface Props { 
  questions: ProcessedQuestion[]; 
}

export default function Quiz({ questions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<ProcessedQuestion[]>(questions);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [answered, setAnswered] = useState(false);
  const params = useParams();

  // Handle empty questions array
  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">No questions available for this quiz.</h2>
        <Button 
          onClick={() => window.history.back()} 
          className="mt-4 bg-blue-600 text-white"
        >
          Go Back
        </Button>
      </div>
    );
  }

  const handleAnswer = (selected: string) => {
    console.log('Answer selected:', selected, 'for question:', currentIndex);
    
    // Update the answer
    const updatedQuestions = [...answers];
    updatedQuestions[currentIndex] = {
      ...updatedQuestions[currentIndex],
      selected_answer: selected,
      is_correct: selected === updatedQuestions[currentIndex].correct_answer
    };
    
    setAnswers(updatedQuestions);
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    console.log('Moving to next question. Current:', currentIndex, 'Total:', questions.length);
    
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleTimeExpire = () => {
    setCompleted(true);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const getProgressPercentage = () => {
    return ((currentIndex + 1) / questions.length) * 100;
  };

  const getScore = () => {
    return answers.filter(q => q.is_correct).length;
  };

  if (completed) {
    const { score, total, percentage, correct, incorrect } = calculateScore(answers);
    const timeTaken = 300 - timeLeft; // 5 minutes - time left
    
    // Use URL parameters for navigation instead of question object properties
    const category = params.category as string;
    const level = params.level as string;
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
            <p className="text-gray-600">Great job! Here's how you performed:</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{correct}</div>
              <div className="text-sm text-green-600">Correct</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{incorrect}</div>
              <div className="text-sm text-red-600">Incorrect</div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="text-4xl font-bold text-blue-600 mb-2">{percentage}%</div>
            <div className="text-lg text-gray-600">Final Score</div>
          </div>
          
          <div className="text-sm text-gray-500 mb-8">
            Time taken: {Math.floor(timeTaken / 60)}m {timeTaken % 60}s
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={() => window.location.href = `/quiz/${category}/${level}/results?score=${score}&total=${total}&percentage=${percentage}&time=${timeTaken}&category=${encodeURIComponent(questions[0].category)}&difficulty=${encodeURIComponent(questions[0].difficulty)}`} 
              className="w-full bg-blue-600 text-white py-3 text-lg"
            >
              View Detailed Results
            </Button>
            <Button 
              onClick={() => window.location.href = '/'} 
              className="w-full bg-gray-600 text-white py-3"
            >
              Take Another Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = answers[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(getProgressPercentage())}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      {/* Timer and Controls */}
      <div className="flex justify-between items-center mb-6">
        <TimerDisplay 
          duration={timeLeft} 
          onExpire={handleTimeExpire}
          isPaused={isPaused}
        />
        <div className="flex space-x-2">
          <Button
            onClick={handlePause}
            className={`px-4 py-2 rounded-lg text-sm ${
              isPaused 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-600 text-white'
            }`}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <div className="px-4 py-2 bg-blue-100 rounded-lg">
            <span className="text-sm font-medium text-blue-800">
              Score: {getScore()}
            </span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard 
        question={currentQuestion} 
        onAnswer={handleAnswer}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        answered={answered}
      />

      {/* Next Button - Only show when question is answered */}
      {answered && (
        <div className="mt-6 text-center">
          <Button
            onClick={handleNextQuestion}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </div>
      )}
    </div>
  );
}
