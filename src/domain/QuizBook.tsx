import Quiz from '../domain/Quiz';


export interface QuizBook{
    name: String
    quizs(quizCount?: number): Array<Quiz>
}

class Tasizan1 implements QuizBook{
    name = "たしざん１"
    quizs(quizCount?: number): Array<Quiz>{
        let quizs = Array<Quiz>();
        // 答えが10までのたしざん
        for (let a = 0; a < 10; a++) {
            for (let b = 0; b < 10; b++) {
                quizs.push({ q: `${a} + ${b} =`, a: (a + b) })
            }
        }
        quizs = shuffle(quizs.filter(quiz => quiz.a <= 10));
        return (quizCount) ? quizs.slice(0, Math.min(quizCount, quizs.length)) : quizs;
    }
}
export const tasizan1 = new Tasizan1();

class Hikizan2 implements QuizBook{
    name = "ひきざん２"
    quizs(quizCount?: number): Array<Quiz>{
        let quizs = Array<Quiz>();
        // 10から0までのひきざん
        for (let a = 0; a < 10; a++) {
            for (let b = 0; b < 10; b++) {
                quizs.push({ q: `${a} - ${b} =`, a: (a - b) })
            }
        }
        quizs = shuffle(quizs.filter(quiz => quiz.a >= 0));
        return (quizCount) ? quizs.slice(0, Math.min(quizCount, quizs.length)) : quizs;
    }
}
export const hikizan2 = new Hikizan2();


function shuffle<T>(arr: Array<T>): Array<T> {
    for (var i = arr.length - 1; i > 0; i = 0 | i - 1) {
        var j = 0 | Math.random() * (i + 1);
        var swap = arr[i];
        arr[i] = arr[j];
        arr[j] = swap;
    }
    return arr;
}
