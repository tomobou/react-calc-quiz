import React from "react";
import { render, screen } from "@testing-library/react";
import AnswerResultsView, { getGrade } from "../components/AnswerResultsView";
import { AnswerResult } from "../domain/AnswerResult";
import Quiz from "../domain/Quiz";

// Helper to create a mock quiz
const mockQuiz: Quiz = { q: "1+1", a: 2 };

describe("AnswerResultsView total time display", () => {
  it("renders total lap time with 3 decimal places", () => {
    const results: AnswerResult[] = [
      { quiz: mockQuiz, wrongCount: 0, startTime: 0, endTime: 1234 },
      { quiz: mockQuiz, wrongCount: 0, startTime: 0, endTime: 5678 },
    ];
    // totalLapTime = (1234+5678)/2 = 3456
    // 3456/1000 = 3.456 -> toFixed(3) => "3.456"
    render(<AnswerResultsView results={results} />);
    const totalText = screen.getByText(/秒でできたよ/);
    expect(totalText).toBeInTheDocument();
    expect(totalText).toHaveTextContent(/\d+\.\d{3}秒でできたよ/);
  });
});
