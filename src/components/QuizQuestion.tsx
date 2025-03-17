import React from 'react';
import type { QuizQuestion } from '../types/quiz';

interface QuizQuestionProps {
  question: QuizQuestion;
  selectedAnswer: string | undefined;
  isSubmitted: boolean;
  onSelectAnswer: (answer: string) => void;
}

export function QuizQuestion({
  question,
  selectedAnswer,
  isSubmitted,
  onSelectAnswer
}: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {question.question}
      </h2>
      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isCorrect = isSubmitted && option === question.correctAnswer;
          const isIncorrect = isSubmitted && option === selectedAnswer && option !== question.correctAnswer;
          
          const buttonClassName = [
            'w-full p-4 text-left rounded-lg transition-all border',
            selectedAnswer === option
              ? isCorrect
                ? 'bg-green-100 border-green-500'
                : isIncorrect
                ? 'bg-red-100 border-red-500'
                : 'bg-blue-100 border-blue-500'
              : 'bg-white hover:bg-gray-50',
            isSubmitted ? 'cursor-default' : 'cursor-pointer'
          ].join(' ');
          
          return (
            <button
              key={index}
              onClick={() => !isSubmitted && onSelectAnswer(option)}
              className={buttonClassName}
              disabled={isSubmitted}
            >
              {option}
            </button>
          );
        })}
      </div>
      {isSubmitted && selectedAnswer !== question.correctAnswer && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-sm text-red-800">
            <span className="font-semibold">Correct Answer: </span>
            {question.correctAnswer}
          </p>
          <p className="text-sm text-red-800 mt-2">
            <span className="font-semibold">Explanation: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}