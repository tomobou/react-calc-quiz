import React from "react";
import QuizButton from "./QuizButton";
import {
  QuizBook,
  tasizan1,
  hikizan2,
  tasizan3,
  hikizan4,
} from "../domain/QuizBook";

interface QuizButton {
  name: string;
  remarks?: string;
  color: string;
  quizCount?: number;
  quizBook: QuizBook;
}

interface QuizSelectorProps {
  setQuizs: (quizs: Array<Quiz>) => void;
}

export default function QuizSelector({ setQuizs }: QuizSelectorProps) {
  const quizButtons: QuizButton[] = [
    {
      name: "れんしゅう",
      remarks: "３もん",
      color: "#D8898A",
      quizBook: tasizan1,
      quizCount: 3,
    },
    {
      name: "たしざん１",
      remarks: "ぜんぶ",
      color: "#D8898A",
      quizBook: tasizan1,
    },
    {
      name: "ひきざん２",
      remarks: "５もん",
      color: "#84B7DC",
      quizBook: hikizan2,
      quizCount: 5,
    },
    {
      name: "ひきざん２",
      remarks: "ぜんぶ",
      color: "#84B7DC",
      quizBook: hikizan2,
    },
    {
      name: "たしざん３",
      remarks: "５もん",
      color: "#F8BA62",
      quizBook: tasizan3,
      quizCount: 5,
    },
    {
      name: "たしざん３",
      remarks: "ぜんぶ",
      color: "#F8BA62",
      quizBook: tasizan3,
    },
    {
      name: "ひきざん４",
      remarks: "５もん",
      color: "#86A884",
      quizBook: hikizan4,
      quizCount: 5,
    },
    {
      name: "ひきざん４",
      remarks: "ぜんぶ",
      color: "#86A884",
      quizBook: hikizan4,
    },
  ];

  return (
    <div className="questioner">
      <h5>もんだいをえらんでね！</h5>
      <div className="question-select">
        {quizButtons.map((quizButton, index) => (
          <QuizButton
            key={"question-select-item-" + index}
            name={quizButton.name}
            remarks={quizButton.remarks}
            color={quizButton.color}
            onClick={() => setQuizs(quizButton.quizBook.quizs(quizButton.quizCount))}
          />
        ))}
      </div>
    </div>
  );
}
