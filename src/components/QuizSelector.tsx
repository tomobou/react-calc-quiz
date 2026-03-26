import Quiz from "../domain/Quiz";

import {
  QuizBook,
  tasizan1,
  hikizan2,
  tasizan3,
  hikizan4,
} from "../domain/QuizBook";

interface QuizButtonInfo {
  id: string;
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
  const quizButtons: QuizButtonInfo[] = [
    {
      id: "101",
      name: "れんしゅう",
      remarks: "３もん",
      color: "#D8898A",
      quizBook: tasizan1,
      quizCount: 3,
    },
    {
      id: "100",
      name: "たしざん１",
      remarks: "ぜんぶ",
      color: "#D8898A",
      quizBook: tasizan1,
    },
    {
      id: "201",
      name: "ひきざん２",
      remarks: "５もん",
      color: "#84B7DC",
      quizBook: hikizan2,
      quizCount: 5,
    },
    {
      id: "200",
      name: "ひきざん２",
      remarks: "ぜんぶ",
      color: "#84B7DC",
      quizBook: hikizan2,
    },
    {
      id: "301",
      name: "たしざん３",
      remarks: "５もん",
      color: "#F8BA62",
      quizBook: tasizan3,
      quizCount: 5,
    },
    {
      id: "300",
      name: "たしざん３",
      remarks: "ぜんぶ",
      color: "#F8BA62",
      quizBook: tasizan3,
    },
    {
      id: "401",
      name: "ひきざん４",
      remarks: "５もん",
      color: "#86A884",
      quizBook: hikizan4,
      quizCount: 5,
    },
    {
      id: "400",
      name: "ひきざん４",
      remarks: "ぜんぶ",
      color: "#86A884",
      quizBook: hikizan4,
    },
  ];

  return (
    <div className="question-card">
      <h5>もんだいをえらんでね！</h5>
      <div className="question-select">
        {quizButtons.map((quizButton, _index) => (
          <div
            key={"question-select-item-" + quizButton.id}
            className="question-select-item"
            style={{ backgroundColor: quizButton.color }}
            onClick={() =>
              setQuizs(quizButton.quizBook.quizs(quizButton.quizCount))
            }
          >
            <div className="question-select-item-name">{quizButton.name}</div>
            <div className="question-select-item-remarks">
              {quizButton.remarks}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
