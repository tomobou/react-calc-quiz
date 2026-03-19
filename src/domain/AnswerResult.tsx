import Quiz from "../domain/Quiz";

export interface AnswerResult {
  quiz: Quiz;
  wrongCount: number;
  startTime?: number;
  endTime?: number;
}

export function getTotalLapTime(results: AnswerResult[]): number {
  if (results.length === 0) return 0;

  const startTime =
    results.reduce((a, b) => ((a.startTime ?? 0) < (b.startTime ?? 0) ? a : b))
      .startTime ?? 0;
  const endTime =
    results.reduce((a, b) => ((a.endTime ?? 0) > (b.endTime ?? 0) ? a : b))
      .endTime ?? 0;

  return Math.max(0, endTime - startTime);
}
