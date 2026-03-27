import React, { createContext, useState, useCallback } from "react";
import Quiz from "../domain/Quiz";
import { AnswerResult } from "../domain/AnswerResult";

export interface GameContextValue {
  quizs: Quiz[];
  currentQuiz?: Quiz;
  whichQuiz: number;
  results: AnswerResult[];
  startTime?: number;
  endTime?: number;
  wrongCount: number;
  voiceEnabled: boolean;
  // actions
  startGame: (quizzes: Quiz[]) => void;
  selectAnswer: (value: string) => void;
  toggleVoice: () => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextValue | undefined>(
  undefined,
);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quizs, setQuizs] = useState<Quiz[]>([]);
  const [whichQuiz, setWhichQuiz] = useState(-1);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [startTime, setStartTime] = useState<number | undefined>();
  const [endTime, setEndTime] = useState<number | undefined>();
  const [wrongCount, setWrongCount] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const startGame = useCallback((qs: Quiz[]) => {
    setQuizs(qs);
    setResults([]);
    setWhichQuiz(qs.length > 0 ? 0 : -1);
    setStartTime(Date.now());
    setEndTime(undefined);
    setWrongCount(0);
  }, []);

  const selectAnswer = useCallback(
    (value: string) => {
      if (whichQuiz < 0) return;
      const current = quizs[whichQuiz];
      if (!current) return;

      const correct = current.a === parseInt(value, 10);
      if (correct) {
        const answerStart =
          results.length > 0 ? results[results.length - 1].endTime : startTime;
        const newResult: AnswerResult = {
          quiz: current,
          wrongCount,
          startTime: answerStart,
          endTime: Date.now(),
        };
        setResults((r) => [...r, newResult]);

        if (whichQuiz + 1 === quizs.length) {
          setWhichQuiz(-1);
          setEndTime(Date.now());
        } else {
          setWhichQuiz((q) => q + 1);
        }
        setWrongCount(0);
      } else {
        setWrongCount((c) => c + 1);
      }
    },
    [quizs, whichQuiz, results, startTime, wrongCount],
  );

  const toggleVoice = useCallback(() => {
    setVoiceEnabled((v) => !v);
  }, []);

  const resetGame = useCallback(() => {
    setQuizs([]);
    setResults([]);
    setWhichQuiz(-1);
    setStartTime(undefined);
    setEndTime(undefined);
    setWrongCount(0);
  }, []);

  const value: GameContextValue = {
    quizs,
    currentQuiz: quizs[whichQuiz],
    whichQuiz,
    results,
    startTime,
    endTime,
    wrongCount,
    voiceEnabled,
    startGame,
    selectAnswer,
    toggleVoice,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
