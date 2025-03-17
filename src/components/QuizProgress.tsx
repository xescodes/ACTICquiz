import React from 'react';

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}