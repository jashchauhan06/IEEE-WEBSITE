import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, eventName, baseColorClass }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Helper to get color classes based on baseColorClass prop
  const getColorClasses = (color) => {
    switch (color) {
      case 'red':
        return {
          bgGradient: 'from-red-500 to-red-600',
          borderColor: 'border-red-400',
          textColor: 'text-red-100',
        };
      case 'blue':
        return {
          bgGradient: 'from-blue-500 to-blue-600',
          borderColor: 'border-blue-400',
          textColor: 'text-blue-100',
        };
      // Default to a neutral color if no specific color is provided
      default:
        return {
          bgGradient: 'from-gray-500 to-gray-600',
          borderColor: 'border-gray-400',
          textColor: 'text-gray-100',
        };
    }
  };

  const { bgGradient, borderColor, textColor } = getColorClasses(baseColorClass);

  const isEventStarted = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isEventStarted) {
    return (
      <div className="bg-green-600 text-white p-3 rounded-lg text-center">
        <div className="text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
          🎉 Event Started!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-4 rounded-xl border border-gray-600 shadow-2xl">
      <div className="text-center mb-3">
        <div className="text-sm font-semibold text-cyan-300" style={{ fontFamily: 'Arial, sans-serif' }}>
          ⏰ Time Until {eventName}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-center">
        <div className={`bg-gradient-to-br ${bgGradient} rounded-lg p-2 md:p-3 shadow-lg ${borderColor}`}>
          <div className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
            {timeLeft.days}
          </div>
          <div className={`text-xs ${textColor} font-medium`} style={{ fontFamily: 'Arial, sans-serif' }}>
            Days
          </div>
        </div>
        <div className={`bg-gradient-to-br ${bgGradient} rounded-lg p-2 md:p-3 shadow-lg ${borderColor}`}>
          <div className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
            {timeLeft.hours}
          </div>
          <div className={`text-xs ${textColor} font-medium`} style={{ fontFamily: 'Arial, sans-serif' }}>
            Hours
          </div>
        </div>
        <div className={`bg-gradient-to-br ${bgGradient} rounded-lg p-2 md:p-3 shadow-lg ${borderColor}`}>
          <div className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
            {timeLeft.minutes}
          </div>
          <div className={`text-xs ${textColor} font-medium`} style={{ fontFamily: 'Arial, sans-serif' }}>
            Minutes
          </div>
        </div>
        <div className={`bg-gradient-to-br ${bgGradient} rounded-lg p-2 md:p-3 shadow-lg ${borderColor}`}>
          <div className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
            {timeLeft.seconds}
          </div>
          <div className={`text-xs ${textColor} font-medium`} style={{ fontFamily: 'Arial, sans-serif' }}>
            Seconds
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
