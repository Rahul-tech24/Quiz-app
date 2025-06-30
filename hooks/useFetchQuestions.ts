'use client';
import { useState, useEffect } from 'react';
import { ProcessedQuestion } from '../types/quiz';
import { fetchQuestions } from '../lib/triviaService';

export function useFetchQuestions(
  category: number, 
  difficulty: 'easy' | 'medium' | 'hard',
  amount: number = 10
) {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedQuestions = await fetchQuestions(amount, category, difficulty);
        setQuestions(fetchedQuestions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [category, difficulty, amount]);

  return { questions, loading, error };
}