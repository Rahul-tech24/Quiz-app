'use client';
import { useQuizTimer } from '../hooks/useQuizTimer';

interface TimerDisplayProps {
  duration: number;
  onExpire: () => void;
  isPaused?: boolean;
}

export default function TimerDisplay({ duration, onExpire, isPaused = false }: TimerDisplayProps) {
  const time = useQuizTimer(duration, onExpire, isPaused);
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  const getTimeColor = () => {
    if (time <= 30) return 'text-red-600';
    if (time <= 60) return 'text-yellow-600';
    return 'text-gray-700';
  };

  return (
    <div className={`text-xl font-mono ${getTimeColor()} ${isPaused ? 'opacity-50' : ''}`}>
      <span className="bg-white px-3 py-2 rounded-lg shadow-sm border">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
      {isPaused && <span className="ml-2 text-sm text-gray-500">(Paused)</span>}
    </div>
  );
}
