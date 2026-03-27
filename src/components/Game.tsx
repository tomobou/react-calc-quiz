import React from "react";
import Questioner from "./Questioner";
import NumberSelector from "./NumberSelector";
import AnswerResultsView from "./AnswerResultsView";
import { GameProvider } from "./GameProvider";
import { useGame } from "./useGame";

const Game: React.FC = () => {
  const { endTime, results, resetGame } = useGame();

  return (
    <GameProvider>
      <div className="game">
        <Questioner />
        <NumberSelector />
        {endTime && (
          <div onClick={resetGame} style={{ cursor: "pointer" }}>
            <AnswerResultsView results={results} />
          </div>
        )}
      </div>
    </GameProvider>
  );
};

export default Game;
