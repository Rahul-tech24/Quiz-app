'use client';
import { useEffect } from 'react';
import { saveScore, emailScore } from '../../../actions';

export default function ResultsPage({ searchParams }: { searchParams: { score: string } }) {
  const score = Number(searchParams.score || 0);
  useEffect(() => {
    const data = new FormData();
    data.set('score', score.toString());
    saveScore(data);
  }, [score]);

  return (
    <div className="max-w-lg mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold">Your Score: {score}</h1>
      <button
        onClick={() => {
          const data = new FormData();
          data.set('score', score.toString());
          emailScore(data);
        }}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Email Me My Score
      </button>
    </div>
  );
}