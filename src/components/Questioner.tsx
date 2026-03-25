import React from "react";
import Quiz from "../domain/Quiz";
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

export default function Questioner(props: QuestionerProps) {
  if (props.currentQuiz) {
    return (
      <div className="question-card">
        <h5 className="question-count">
          {props.whichQuiz + 1}問目（ぜんぶで {props.quizs.length} 問）
        </h5>
        <div className="question-content">
          {props.currentQuiz && props.currentQuiz.q}
          {props.wrongCount > 0 && (
            <div className="shake">{"".padStart(props.wrongCount, "×")}</div>
          )}
        </div>
        <div className="controls-section">
          <button
            className={props.voiceEnabled ? "voice-enabled" : "voice-disabled"}
            aria-pressed={props.voiceEnabled}
            onClick={props.onToggleVoice}
          >
            {props.voiceEnabled ? "音声入力 ON" : "音声入力 OFF"}
          </button>
        </div>
      </div>
    );
  } else {
    return <QuizSelector setQuizs={(quizs) => props.setQuizs(quizs)} />;
  }
}
