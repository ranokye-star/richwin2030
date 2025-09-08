import React from 'react';
import { Heart } from 'lucide-react';

export default function DayCounter() {
  const startDate = new Date('2025-08-08');
  const today = new Date();
  const timeDiff = today.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  return (
    <div className="text-center py-4 px-6 romantic-card rounded-lg mx-4 mb-6">
      <div className="flex items-center justify-center gap-2 text-lg font-semibold">
        <Heart className="h-5 w-5 text-red-500 animate-pulse" />
        <span className="romantic-heading">
          We have been together for {daysDiff} days
        </span>
        <Heart className="h-5 w-5 text-red-500 animate-pulse" />
      </div>
    </div>
  );
}