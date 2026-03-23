import { getGrade } from "../components/AnswerResultsView";
import { AnswerResult } from "../domain/AnswerResult";
import Quiz from "../domain/Quiz";

// Helper to create a mock Quiz
const mockQuiz: Quiz = { q: "1+1", a: 2 };

describe("getGrade", () => {
  it("should return grade 5 for perfect score", () => {
    const results: AnswerResult[] = [
      { quiz: mockQuiz, wrongCount: 0, startTime: 0, endTime: 1000 },
    ];
    expect(getGrade(results)).toBe("5");
  });

  it("should downgrade grade based on wrong rate", () => {
    const results: AnswerResult[] = [
      { quiz: mockQuiz, wrongCount: 1, startTime: 0, endTime: 1000 },
    ];
    // wrong rate 100% => grade 1
    expect(getGrade(results)).toBe("1");
  });

  it("should downgrade grade based on avg lap time", () => {
    const results: AnswerResult[] = [
      { quiz: mockQuiz, wrongCount: 0, startTime: 0, endTime: 8000 },
    ];
    // avg lap time 8s => grade 1
    expect(getGrade(results)).toBe("1");
  });
});
