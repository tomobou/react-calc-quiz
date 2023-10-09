import Quiz from '../domain/Quiz';

export interface AnswerResult {
    quiz: Quiz,
    wrongCount: number,
    startTime?: number,
    endTime?: number
}

export function getTotalLapTime(results: AnswerResult[]): number {
    return results.reduce((a, b) => a.endTime!! > b.endTime!! ? a : b).endTime!!
        - results.reduce((a, b) => a.startTime!! < b.startTime!! ? a : b).startTime!!;
}
