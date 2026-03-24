import React from "react";
import { render, screen } from "@testing-library/react";
import AnswerResultsView, { getGrade } from "../components/AnswerResultsView";
import { AnswerResult } from "../domain/AnswerResult";
import Quiz from "../domain/Quiz";

const mockQuiz: Quiz = { q: "1+1", a: 2 };

const results: AnswerResult[] = [
  { quiz: mockQuiz, wrongCount: 0, startTime: 0, endTime: 800 },
  { quiz: mockQuiz, wrongCount: 1, startTime: 1000, endTime: 3000 },
  { quiz: mockQuiz, wrongCount: 0, startTime: 4000, endTime: 5000 },
];

describe("AnswerResultsView rendering", () => {
  it("renders grade image and table rows", () => {
    render(<AnswerResultsView results={results} />);
    const grade = getGrade(results);
    // grade image
    const img = screen.getByAltText("grade");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", `/img/grade${grade}.png`);
    // table rows
    const rows = screen.getAllByRole("row");
    // header row + 3 data rows
    expect(rows).toHaveLength(4);
    // check content of first data row
    const cells = screen.getAllByText(mockQuiz.q, { selector: "td" });
    expect(cells).toHaveLength(3);
    // const firstCell = screen.getByText(mockQuiz.q, { selector: "td" });
  });
});
