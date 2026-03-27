import React from "react";
import { useGame } from "./useGame";
import { useGame } from "./useGame";
import QuizSelector from "../components/QuizSelector";

interface QuestionerProps {
  quizs: Quiz[];
  currentQuiz?: Quiz;
  whichQuiz: number;
  setQuizs: (quizs: Quiz[]) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  wrongCount: number;
}

export default function Questioner() {
  const {
    quizs,
    currentQuiz,
    whichQuiz,
    wrongCount,
    voiceEnabled,
    toggleVoice,
    startGame,
  } = useGame();
  if (currentQuiz) {
    return (
      <div className="question-card">
        <h5 className="question-count">
          {whichQuiz + 1}問目（ぜんぶで {quizs.length} 問）
        </h5>
        <div className="question-content">
          {currentQuiz.q}
          {wrongCount > 0 && (
            <div className="shake">
              {"".padStart(Math.min(wrongCount, 5), "×")}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <QuizSelector setQuizs={startGame} />;
  }
}
