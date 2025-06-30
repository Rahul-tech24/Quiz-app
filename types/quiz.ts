export interface TriviaQuestion {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizApiResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export interface ProcessedQuestion {
  id: string;
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options: string[];
  selected_answer?: string;
  is_correct?: boolean;
}

export interface QuizSession {
  id: string;
  questions: ProcessedQuestion[];
  current_question: number;
  score: number;
  total_questions: number;
  start_time: number;
  end_time?: number;
  category?: string;
  difficulty?: string;
  completed: boolean;
}

export interface QuizResult {
  session_id: string;
  score: number;
  total_questions: number;
  percentage: number;
  time_taken: number;
  category: string;
  difficulty: string;
  correct_answers: number;
  incorrect_answers: number;
  timestamp: number;
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface LeaderboardEntry {
  id: string;
  player_name: string;
  score: number;
  total_questions: number;
  percentage: number;
  category: string;
  difficulty: string;
  time_taken: number;
  timestamp: number;
}

export type QuizDifficulty = 'easy' | 'medium' | 'hard';
export type QuizType = 'multiple' | 'boolean';
export type AnswerOption = string;