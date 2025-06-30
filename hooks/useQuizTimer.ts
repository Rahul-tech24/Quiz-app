'use client';
import { useState, useEffect } from 'react';

export function useQuizTimer(duration: number, onExpire: () => void, isPaused: boolean = false) {
  const [time, setTime] = useState(duration);
  
  useEffect(() => {
    if (isPaused) return;
    
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(id);
          onExpire();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    
    return () => clearInterval(id);
  }, [isPaused, onExpire]);
  
  return time;
}
