import React from "react";
import { useGame } from "./useGame";
import VoiceNumberSelector from "./VoiceNumberSelector";

interface NumberSelectorProps {
  voiceEnabled: boolean;
  onClick: (value: string) => void;
  onToggleVoice: () => void;
}

export default function NumberSelector() {
  const { voiceEnabled, toggleVoice, selectAnswer } = useGame();

  let allValues = [...Array(21)].map((_, i) => i.toString());
  let numberTables = Array<Array<string>>();
  let a = 0;
  let b = 0;
  numberTables[a] = [];
  for (let i = 0; i < allValues.length; i++) {
    numberTables[a][b] = allValues[i];
    b++;
    if (parseInt(allValues[i]) % 5 === 0) {
      a++;
      numberTables[a] = [];
      b = 0;
    }
  }
  return (
    <div className="number-selector">
      {voiceEnabled && <VoiceNumberSelector onClick={selectAnswer} />}
      {numberTables.map((values, index) => (
        <div
          key={"number-selector-row-" + index}
          className="number-selector-row"
        >
          {values.map((value) => (
            <button
              key={"number-selector-item" + value}
              className="number-selector-item"
              onClick={() => selectAnswer(value)}
            >
              {value}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
