'use client';

import { useEffect, useState } from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const targetDate = new Date('2027-02-20T00:00:00');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeRemaining) {
    return (
      <div className="text-amber-500 text-lg sm:text-xl">
        Calculating stardate...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-amber-400 text-lg sm:text-xl font-bold">
        NEXT VOYAGE: FEBRUARY 20, 2027
      </div>
      
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
        <div className="bg-amber-900/30 border-2 border-amber-500 rounded-lg p-3 sm:p-4">
          <div className="text-3xl sm:text-5xl font-bold text-amber-400 mb-1">
            {timeRemaining.days}
          </div>
          <div className="text-xs sm:text-sm text-amber-600 tracking-widest">
            DAYS
          </div>
        </div>
        
        <div className="bg-amber-900/30 border-2 border-amber-500 rounded-lg p-3 sm:p-4">
          <div className="text-3xl sm:text-5xl font-bold text-amber-400 mb-1">
            {timeRemaining.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm text-amber-600 tracking-widest">
            HOURS
          </div>
        </div>
        
        <div className="bg-amber-900/30 border-2 border-amber-500 rounded-lg p-3 sm:p-4">
          <div className="text-3xl sm:text-5xl font-bold text-amber-400 mb-1">
            {timeRemaining.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm text-amber-600 tracking-widest">
            MINUTES
          </div>
        </div>
        
        <div className="bg-amber-900/30 border-2 border-amber-500 rounded-lg p-3 sm:p-4">
          <div className="text-3xl sm:text-5xl font-bold text-amber-400 mb-1">
            {timeRemaining.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm text-amber-600 tracking-widest">
            SECONDS
          </div>
        </div>
      </div>
    </div>
  );
}
