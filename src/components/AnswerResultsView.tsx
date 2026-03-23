import React from "react";
import { AnswerResult, getTotalLapTime } from "../domain/AnswerResult";

interface AnswerResultsViewProps {
  results: AnswerResult[];
}
interface AnswerResultsViewStates {
  active: string;
}
export function getGrade(results: AnswerResult[]): string {
  const wrongRate =
    (results.reduce(
      (sum, result) => (sum += result.wrongCount > 0 ? 1 : 0),
      0,
    ) /
      results.length) *
    100;
  let wrongGrade = 5;
  if (wrongRate <= 5) {
    wrongGrade = 5;
  } else if (wrongRate <= 15) {
    wrongGrade = 4;
  } else if (wrongRate <= 20) {
    wrongGrade = 3;
  } else if (wrongRate <= 30) {
    wrongGrade = 2;
  } else {
    wrongGrade = 1;
  }
  //console.log("wrongRate,Grade="+ wrongRate + "," + wrongGrade)

  const avgLapTime =
    results.reduce(
      (sum, result) => (sum += result.endTime! - result.startTime!),
      0,
    ) / results.length;
  let lapTimeGrade = 5;
  if (avgLapTime <= 1200) {
    lapTimeGrade = 5;
  } else if (avgLapTime <= 2000) {
    lapTimeGrade = 4;
  } else if (avgLapTime <= 5000) {
    lapTimeGrade = 3;
  } else if (avgLapTime <= 7000) {
    lapTimeGrade = 2;
  } else {
    lapTimeGrade = 1;
  }
  //console.log("avgLapTime,Grade="+ avgLapTime + "," + lapTimeGrade)

  return Math.min(wrongGrade, lapTimeGrade).toString();
}

export default class AnswerResultsView extends React.Component<
  AnswerResultsViewProps,
  AnswerResultsViewStates
> {
  constructor(
    props: AnswerResultsViewProps | Readonly<AnswerResultsViewProps>,
  ) {
    super(props);
    this.state = {
      active: "",
    };
  }

  hiddenResult() {
    this.setState({ active: "hidden" });
  }

  render() {
    const results = [...this.props.results]
      .sort((a, b) =>
        a.wrongCount - b.wrongCount === 0
          ? (a.endTime ?? 0) -
            (a.startTime ?? 0) -
            ((b.endTime ?? 0) - (b.startTime ?? 0))
          : a.wrongCount - b.wrongCount,
      )
      .reverse();

    const totalLapTime = getTotalLapTime(results);
    const grade = getGrade(results);

    return (
      <div
        className={["answer-result", this.state.active].join(" ")}
        onClick={() => this.hiddenResult()}
      >
        <div>しゅうりょうー</div>
        <div>{(totalLapTime / 1000).toFixed(2)}秒でできたよ。</div>
        <img src={`/img/grade${grade}.png`} alt="grade" />
        <table className="answer-results-view">
          <thead>
            <tr>
              <th>問題</th>
              <th>間違えた数</th>
              <th>回答時間</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => {
              const lapTime = (result.endTime ?? 0) - (result.startTime ?? 0);
              const wrongCountResult = result.wrongCount > 0 ? "red" : "";
              const lapTimeResult =
                lapTime <= 1200 ? "" : lapTime < 3000 ? "yellow" : "red";
              return (
                <tr key={"answer-results-row-" + index}>
                  <td>{result.quiz.q}</td>
                  <td className={["align-right", wrongCountResult].join(" ")}>
                    {result.wrongCount}回
                  </td>
                  <td className={["align-right", lapTimeResult].join(" ")}>
                    {(lapTime / 1000).toFixed(3)}秒
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
