import React from "react";

interface QuizButtonProps {
  name: string;
  remarks?: string;
  color: string;
  onClick: () => void;
}

export default function QuizButton({ name, remarks, color, onClick }: QuizButtonProps) {
  return (
    <div
      className="question-select-item"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <div className="question-select-item-name">{name}</div>
      <div className="question-select-item-remarks">{remarks}</div>
    </div>
  );
}
