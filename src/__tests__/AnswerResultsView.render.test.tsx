import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AnswerResultsView from "../components/AnswerResultsView";
import { AnswerResult } from "../domain/AnswerResult";
import Quiz from "../domain/Quiz";

// Helper to create mock answer result
const mockQuiz: Quiz = { q: "1+1", a: 2 };
const createResult = (
  wrongCount: number,
  start: number,
  end: number,
): AnswerResult => ({
  quiz: mockQuiz,
  wrongCount,
  startTime: start,
  endTime: end,
});

test("renders answer results and hides on click", () => {
  const results = [createResult(0, 0, 500), createResult(1, 600, 1500)];

  render(<AnswerResultsView results={results} />);

  // Check that the table rows are rendered
  const rows = screen.getAllByRole("row");
  // Header row + 2 data rows
  expect(rows).toHaveLength(3);

  // Check that the wrong count is displayed
  expect(screen.getByText("0回")).toBeInTheDocument();
  expect(screen.getByText("1回")).toBeInTheDocument();

  // Click to hide
  const container = screen.getByText("しゅうりょうー").parentElement;
  if (container) {
    fireEvent.click(container);
    // After clicking, the component should have class "hidden"
    expect(container).toHaveClass("hidden");
  }
});
