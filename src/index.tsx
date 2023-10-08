import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


interface NumberSelectorProps {
    onClick: (value: string) => void
}

class NumberSelector extends React.Component<NumberSelectorProps> {
    render() {
        let values = [...Array(11)].map((_, i) => i.toString());
        return (
            <div>
                <div className="number-selector-row">
                    {values.slice(0,1).map((value) => {
                        return (
                            <button key={"number-selector-" + value} className="number-selector" onClick={() => this.props.onClick(value)}>{value}</button>
                        )
                    })}
                </div>
                <div className="number-selector-row">
                    {values.slice(1,6).map((value) => {
                        return (
                            <button key={"number-selector-" + value} className="number-selector" onClick={() => this.props.onClick(value)}>{value}</button>
                        )
                    })}
                </div>
                <div className="number-selector-row">
                    {values.slice(6,11).map((value) => {
                        return (
                            <button key={"number-selector-" + value} className="number-selector" onClick={() => this.props.onClick(value)}>{value}</button>
                        )
                    })}
                </div>
            </div>
        )
    }
}

interface QuestionerProps {
    quizs: Quiz[],
    currentQuiz?: Quiz,
    whichQuiz: number,
    onClick: (value: string, quizCount?:number) => void
    wrongCount: number
}

class Questioner extends React.Component<QuestionerProps> {
    render() {
        if(this.props.currentQuiz){
            return(
            <div className="questioner">
                <h3>
                    {this.props.whichQuiz+1}問目（ぜんぶで {this.props.quizs.length} 問）
                </h3>
                <div className="question-content">
                    {this.props.currentQuiz && this.props.currentQuiz.q}
                    {this.props.wrongCount > 0 && <div className='shake'>{"".padStart(this.props.wrongCount,"×")}</div>}
                </div>
            </div>
            )
        }else{
            return(
                <QuizSelector onClick={(value,quizCount)=>this.props.onClick(value,quizCount)}></QuizSelector>
                )
        }
    }
}

interface QuizSelectorProps {
    onClick: (value: string, quizCount?:number) => void
}

class QuizSelector extends React.Component<QuizSelectorProps> {
    render() {
        return(
            <div className="questioner">
                <h3>もんだいをえらんでね！</h3>
                <div className="question-content">
                <button onClick={() => this.props.onClick("tasizan1",3)}>れんしゅう</button>
                </div>
                <div className="question-content">
                  <button onClick={() => this.props.onClick("tasizan1")}>たしざん１</button>
                </div>
                <div className="question-content">
                  <button onClick={() => this.props.onClick("hikizan2")}>ひきざん２</button>
                </div>
            </div>
            )
    }
}

interface AnswerResultsViewProps {
    totalLapTime: number,
    results: AnswerResult[]
}

class AnswerResultsView extends React.Component<AnswerResultsViewProps> {
    render() {
        const results = this.props.results.sort((a,b)=> (a.wrongCount - b.wrongCount === 0)? (a.endTime!!-a.startTime!!)-(b.endTime!!-b.startTime!!): (a.wrongCount - b.wrongCount)).reverse();
        
        return(
            <div>
                <div>{this.props.totalLapTime/1000}秒でできたよ。</div>
                <table className="answer-results-view">
                    <thead>
                        <th>問題</th>
                        <th>間違えた数</th>
                        <th>回答時間</th>
                    </thead>
                    <tbody>
                    {results.map((result) => {
                        const lapTime=(result.endTime!! - result.startTime!!);
                        const wrongCountResult = result.wrongCount>0? "red":"";
                        const lapTimeResult = lapTime<=1200? "" : lapTime<3000? "yellow" : "red";
                            return (
                                <tr>
                                    <td>{result.quiz.q}</td>
                                    <td className={['align-right',wrongCountResult].join(' ')}>{result.wrongCount}回</td>
                                    <td className={['align-right',lapTimeResult].join(' ')}>{(lapTime/1000).toFixed(3)}秒</td>
                                </tr>        
                                )
                        })}
                    </tbody>
                </table>
            </div>
            )
    }
}


function shuffle<T>(arr: Array<T>):Array<T> {
    for (var i = arr.length - 1; i > 0; i = 0 | i - 1) {
        var j = 0 | Math.random() * (i + 1);
        var swap = arr[i];
        arr[i] = arr[j];
        arr[j] = swap;
    }
    return arr;
}

interface Quiz {
  q: string,
  a: number
}
interface AnswerResult {
    quiz: Quiz,
    wrongCount: number,
    startTime?: number,
    endTime?: number
  }


interface GameProps {

}
interface GameStates {
    quizs: Quiz[],
    results: AnswerResult[]
    currentQuiz?: Quiz,
    whichQuiz: number,
    wrongCount: number,
    startTime?: number,
    endTime?: number
}

function craeteQuizs(quizLevel: string, quizCount?:number): Array<Quiz>{
    let quizs = Array<Quiz>();
    if(quizLevel.startsWith("tasizan1")){
        // 答えが10までのたしざん
        for(let a = 0; a < 10; a++){
            for(let b = 0; b < 10; b++){
                quizs.push({q:`${a} + ${b} =`, a:(a+b)})
            }
        }
        quizs = shuffle(quizs.filter(quiz => quiz.a <= 10));
    }else if(quizLevel.startsWith("hikizan2")){
        // 10から0までのひきざん
        for(let a = 0; a < 10; a++){
            for(let b = 0; b < 10; b++){
                quizs.push({q:`${a} - ${b} =`, a:(a-b)})
            }
        }
        quizs = shuffle(quizs.filter(quiz => quiz.a >= 0));
    }
    // else if(quizLevel.startsWith("tasizan3")){
    //     // 答えが10より大きいたしざん
    //     for(let a = 0; a < 10; a++){
    //         for(let b = 0; b < 10; b++){
    //             quizs.push({q:`${a} + ${b} =`, a:(a+b)})
    //         }
    //     }
    //     quizs = shuffle(quizs.filter(quiz => quiz.a > 10));
    // }else if(quizLevel.startsWith("hikizan4")){
    //     // 10から0までのひきざん
    //     for(let a = 0; a < 10; a++){
    //         for(let b = 0; b < 10; b++){
    //             quizs.push({q:`${a} - ${b} =`, a:(a-b)})
    //         }
    //     }
    //     quizs = shuffle(quizs.filter(quiz => quiz.a >= 0));
    // }

    return (quizCount) ? quizs.slice(0,Math.min(quizCount,quizs.length)) : quizs;
}

class Game extends React.Component<GameProps, GameStates> {
    constructor(props: GameProps | Readonly<GameProps>) {
        super(props);
        //quizLevel1 = quizLevel1.slice(0,3);// テスト用に3問にする
        this.state = {
            quizs: [],
            results: [],
            currentQuiz: undefined,
            whichQuiz: -1,
            wrongCount: 0
        };
    }
    handleSelect(value: string) {
        if(this.state.currentQuiz){  
            if(this.state.currentQuiz.a === parseInt(value)) {
                const correctAnswerTime = Date.now();
                const results = this.state.results;
                const answerStartTime = (results.length>0)? results[results.length-1].endTime : this.state.startTime;
                results.push({    quiz: this.state.currentQuiz,
                    wrongCount: this.state.wrongCount,
                    startTime: answerStartTime,
                    endTime: correctAnswerTime
                })
                if(this.state.whichQuiz+1 === this.state.quizs.length){
                        this.setState(state => ({
                            currentQuiz: undefined,
                            results: results,
                            whichQuiz: -1,
                            endTime: Date.now(),
                            wrongCount: 0
                        }));
                    }else{
                        this.setState(state => ({
                            currentQuiz: this.state.quizs[this.state.whichQuiz+1],
                            results: results,
                            whichQuiz: this.state.whichQuiz + 1,
                            wrongCount: 0
                        }));
                    }
            }else{
                this.setState(state => ({wrongCount:this.state.wrongCount+1}));
            }
        }
    }
    handleStart(value: string, quizCount?:number){
        const quizs = craeteQuizs(value, quizCount)
        this.setState(state => ({
            quizs: quizs,
            results: [],
            currentQuiz: quizs[0],
            whichQuiz: 0,
            startTime: Date.now(),
            endTime: undefined
        }));
    }
    render() {
        return (
            <div className="game">
                <Questioner quizs={this.state.quizs} currentQuiz={this.state.currentQuiz} whichQuiz={this.state.whichQuiz} onClick={(value,quizCount) => this.handleStart(value,quizCount)} wrongCount={this.state.wrongCount}/>
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



