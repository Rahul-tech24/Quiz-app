'use client';
import { ProcessedQuestion } from '../types/quiz';
import { useState } from 'react';
import Button from './Button';

interface Props {
  question: ProcessedQuestion;
  onAnswer: (selected: string) => void;
  questionNumber?: number;
  totalQuestions?: number;
  answered?: boolean;
}

export default function QuestionCard({ question, onAnswer, questionNumber, totalQuestions, answered = false }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    if (answered) return;
    setSelected(option);
  };

  const handleSubmit = () => {
    if (!selected || answered) return;
    onAnswer(selected);
  };

  const getOptionStyle = (option: string) => {
    if (!answered) {
      return selected === option 
        ? 'border-blue-600 bg-blue-50 text-blue-900' 
        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50';
    }
    
    if (option === question.correct_answer) {
      return 'border-green-600 bg-green-50 text-green-900';
    }
    
    if (selected === option && option !== question.correct_answer) {
      return 'border-red-600 bg-red-50 text-red-900';
    }
    
    return 'border-gray-300 bg-gray-50 text-gray-500';
  };

  const getOptionIcon = (option: string) => {
    if (!answered) return null;
    
    if (option === question.correct_answer) {
      return (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    
    if (selected === option && option !== question.correct_answer) {
      return (
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
      {/* Question Header */}
      <div className="mb-6">
        {questionNumber && totalQuestions && (
          <div className="text-sm text-gray-500 mb-2">
            Question {questionNumber} of {totalQuestions}
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {question.difficulty}
          </span>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {question.type === 'multiple' ? 'Multiple Choice' : 'True/False'}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={answered}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${getOptionStyle(option)} ${
              !answered ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <span className="font-medium">{option}</span>
            {getOptionIcon(option)}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      {!answered && (
        <Button
          onClick={handleSubmit}
          disabled={!selected}
          className={`w-full py-3 text-lg font-medium transition-all duration-200 ${
            selected 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Answer
        </Button>
      )}

      {/* Feedback */}
      {answered && (
        <div className={`p-4 rounded-lg ${
          selected === question.correct_answer 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center">
            {selected === question.correct_answer ? (
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className={`font-medium ${
              selected === question.correct_answer ? 'text-green-800' : 'text-red-800'
            }`}>
              {selected === question.correct_answer ? 'Correct!' : 'Incorrect!'}
            </span>
          </div>
          {selected !== question.correct_answer && (
            <p className="text-sm text-red-700 mt-1">
              The correct answer was: <strong>{question.correct_answer}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
