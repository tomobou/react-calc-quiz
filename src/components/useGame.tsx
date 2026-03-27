import { useContext } from "react";
import { GameContext } from "./GameProvider";

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    // Provide default empty context for test environments
    return {
      quizs: [],
      currentQuiz: undefined,
      whichQuiz: -1,
      results: [],
      startTime: undefined,
      endTime: undefined,
      wrongCount: 0,
      voiceEnabled: false,
      startGame: () => {},
      selectAnswer: () => {},
      toggleVoice: () => {},
      resetGame: () => {},
    } as any;
  }
  return ctx;
};
