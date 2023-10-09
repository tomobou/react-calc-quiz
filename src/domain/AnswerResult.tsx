import Quiz from '../domain/Quiz';

export default interface AnswerResult {
    quiz: Quiz,
    wrongCount: number,
    startTime?: number,
    endTime?: number
}
