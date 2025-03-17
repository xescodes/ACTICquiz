import React from 'react';
import type { QuizResults } from '../types/quiz';
import { Printer } from 'lucide-react';

interface QuizResultsProps {
  results: QuizResults;
  onRetry: () => void;
}

export function QuizResults({ results, onRetry }: QuizResultsProps) {
  const percentage = Math.round((results.score / results.totalQuestions) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Quiz Results</h2>
        <div className="mt-4 text-5xl font-bold">
          {percentage}%
        </div>
        <p className="mt-2 text-gray-600">
          You got {results.score} out of {results.totalQuestions} questions correct
        </p>
      </div>

      {results.incorrectAnswers.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Review Incorrect Answers</h3>
          <div className="space-y-6">
            {results.incorrectAnswers.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800 mb-2">
                  {item.question.question}
                </p>
                <p className="text-red-600">
                  Your answer: {item.userAnswer}
                </p>
                <p className="text-green-600">
                  Correct answer: {item.question.correctAnswer}
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  {item.question.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center print:hidden">
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <Printer size={18} />
          Print Results
        </button>
      </div>
    </div>
  );
}