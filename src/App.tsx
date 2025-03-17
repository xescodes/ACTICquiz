import React, { useEffect, useState } from 'react';
import { fetchQuizData } from './services/quizService';
import { QuizProgress } from './components/QuizProgress';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import type { QuizState, QuizResults as QuizResultsType } from './types/quiz';
import { Brain } from 'lucide-react';

function App() {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: new Map(),
    isSubmitted: false,
    isLoading: true,
    error: null,
  });

  const [results, setResults] = useState<QuizResultsType | null>(null);

  useEffect(() => {
    loadQuizData();
  }, []);

  async function loadQuizData() {
    try {
      const questions = await fetchQuizData();
      setState(prev => ({ ...prev, questions, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load quiz data. Please try again later.',
      }));
    }
  }

  const handleAnswerSelect = (answer: string) => {
    setState(prev => ({
      ...prev,
      userAnswers: new Map(prev.userAnswers).set(prev.currentQuestionIndex, answer),
    }));
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex:
        direction === 'next'
          ? Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1)
          : Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  };

  const handleSubmit = () => {
    const incorrectAnswers = [];
    let score = 0;

    for (let i = 0; i < state.questions.length; i++) {
      const question = state.questions[i];
      const userAnswer = state.userAnswers.get(i);

      if (userAnswer === question.correctAnswer) {
        score++;
      } else {
        incorrectAnswers.push({
          question,
          userAnswer: userAnswer || '',
        });
      }
    }

    setResults({
      score,
      totalQuestions: state.questions.length,
      incorrectAnswers,
    });

    setState(prev => ({ ...prev, isSubmitted: true }));
  };

  const handleRetry = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      userAnswers: new Map(),
      isSubmitted: false,
    }));
    setResults(null);
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin text-blue-500">
          <Brain size={48} />
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{state.error}</p>
          <button
            onClick={loadQuizData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <QuizResults results={results} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const selectedAnswer = state.userAnswers.get(state.currentQuestionIndex);
  const isFirstQuestion = state.currentQuestionIndex === 0;
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
  const hasAnsweredAll = state.userAnswers.size === state.questions.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <QuizProgress
            current={state.currentQuestionIndex}
            total={state.questions.length}
          />

          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isSubmitted={state.isSubmitted}
            onSelectAnswer={handleAnswerSelect}
          />

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => handleNavigation('prev')}
              disabled={isFirstQuestion}
              className={`px-4 py-2 rounded ${
                isFirstQuestion
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!hasAnsweredAll}
                className={`px-6 py-2 rounded ${
                  hasAnsweredAll
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => handleNavigation('next')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;