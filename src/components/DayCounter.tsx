import React, { useState, useEffect } from 'react';
import { Heart, Infinity } from 'lucide-react';

export default function DayCounter() {
  const [timeData, setTimeData] = useState({
    days: 32,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateTime = () => {
      const startDate = new Date('2024-08-08T00:00:00'); // Exactly 32 days ago base
      const now = new Date();
      const timeDiff = now.getTime() - startDate.getTime();
      
      const days = 32; // Fixed at 32 days
      const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
      const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      setTimeData({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-6 px-8 romantic-card rounded-xl mx-4 mb-6 shadow-lg">
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-3">
          <Heart className="h-6 w-6 text-red-500 animate-pulse" />
          <h2 className="text-2xl font-bold romantic-heading">
            We became "us"
          </h2>
          <Heart className="h-6 w-6 text-red-500 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{timeData.days}</div>
            <div className="text-sm text-muted-foreground">Days</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{timeData.hours}</div>
            <div className="text-sm text-muted-foreground">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{timeData.minutes}</div>
            <div className="text-sm text-muted-foreground">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{timeData.seconds}</div>
            <div className="text-sm text-muted-foreground">Seconds</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-lg romantic-heading">And we will be together</span>
          <Infinity className="h-5 w-5 text-gold animate-pulse" />
          <span className="text-lg romantic-heading">Forever</span>
        </div>
      </div>
    </div>
  );
}