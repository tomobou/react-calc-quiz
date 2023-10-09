import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './domain/Quiz';
import AnswerResult from './domain/AnswerResult';
import Questioner from './components/Questioner';
import AnswerResultsView from './components/AnswerResultsView';
import NumberSelector from './components/NumberSelector';
import './index.css';

interface GameProps {}

interface GameStates {
    quizs: Quiz[],
    results: AnswerResult[],
    currentQuiz?: Quiz,
    whichQuiz: number,
    wrongCount: number,
    startTime?: number,
    endTime?: number
}

class Game extends React.Component<GameProps, GameStates> {
    constructor(props: GameProps | Readonly<GameProps>) {
        super(props);
        this.state = {
            quizs: [],
            results: [],
            currentQuiz: undefined,
            whichQuiz: -1,
            wrongCount: 0
        };
    }
    handleSelect(value: string) {
        if (this.state.currentQuiz) {
            if (this.state.currentQuiz.a === parseInt(value)) {
                const correctAnswerTime = Date.now();
                const results = this.state.results;
                const answerStartTime = (results.length > 0) ? results[results.length - 1].endTime : this.state.startTime;
                results.push({
                    quiz: this.state.currentQuiz,
                    wrongCount: this.state.wrongCount,
                    startTime: answerStartTime,
                    endTime: correctAnswerTime
                })
                if (this.state.whichQuiz + 1 === this.state.quizs.length) {
                    this.setState(state => ({
                        currentQuiz: undefined,
                        results: results,
                        whichQuiz: -1,
                        endTime: Date.now(),
                        wrongCount: 0
                    }));
                } else {
                    this.setState(state => ({
                        currentQuiz: this.state.quizs[this.state.whichQuiz + 1],
                        results: results,
                        whichQuiz: this.state.whichQuiz + 1,
                        wrongCount: 0
                    }));
                }
            } else {
                this.setState(state => ({ wrongCount: this.state.wrongCount + 1 }));
            }
        }
    }
    handleStart(quizs: Array<Quiz>) {
        this.setState(state => ({
            quizs: quizs,
            results: [],
            currentQuiz: (quizs.length>0) ? quizs[0] : undefined,
            whichQuiz: 0,
            startTime: Date.now(),
            endTime: undefined
        }));
    }
    render() {
        return (
            <div className="game">
                <Questioner quizs={this.state.quizs} currentQuiz={this.state.currentQuiz} whichQuiz={this.state.whichQuiz} setQuizs={(quizs) => this.handleStart(quizs)} wrongCount={this.state.wrongCount} />
                <NumberSelector onClick={(value) => this.handleSelect(value)} />
                {this.state.endTime && <AnswerResultsView totalLapTime={this.state.endTime!! - this.state.startTime!!} results={this.state.results} />}
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);



