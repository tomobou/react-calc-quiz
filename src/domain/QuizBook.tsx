import Quiz from '../domain/Quiz';


export interface QuizBook {
    name: String,
    quizs(quizCount?: number): Array<Quiz>
}

function shuffle<T>(arr: Array<T>): Array<T> {
    for (var i = arr.length - 1; i > 0; i = 0 | i - 1) {
        var j = 0 | Math.random() * (i + 1);
        var swap = arr[i];
        arr[i] = arr[j];
        arr[j] = swap;
    }
    return arr;
}

class Tasizan1 implements QuizBook {
    name = "答えが10までのたしざん"
    quizs(quizCount?: number): Array<Quiz> {
        let quizs = Array<Quiz>();
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                quizs.push({ q: `${x} + ${y} =`, a: (x + y) })
            }
        }
        quizs = shuffle(quizs.filter(quiz => quiz.a <= 10));
        return (quizCount) ? quizs.slice(0, Math.min(quizCount, quizs.length)) : quizs;
    }
}
export const tasizan1 = new Tasizan1();

class Hikizan2 implements QuizBook {
    name = "10から0までのひきざん"
    quizs(quizCount?: number): Array<Quiz> {
        let quizs = Array<Quiz>();
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                quizs.push({ q: `${x} - ${y} =`, a: (x - y) })
            }
        }
        quizs = shuffle(quizs.filter(quiz => quiz.a >= 0));
        return (quizCount) ? quizs.slice(0, Math.min(quizCount, quizs.length)) : quizs;
    }
}
export const hikizan2 = new Hikizan2();
