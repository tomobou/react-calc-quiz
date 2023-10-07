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
            <div className="number-selector-row">
                {values.map((value) => {
                    return (
                        <button key={"number-selector-" + value} className="number-selector" onClick={() => this.props.onClick(value)}>{value}</button>
                    )
                })}
            </div>
        )
    }
}

interface QuestionerProps {
    quizs: Quiz[],
    currentQuiz?: Quiz,
    whichQuiz: number,
    onClick: (value: string) => void
    wrong?: boolean
}

class Questioner extends React.Component<QuestionerProps> {
    render() {
        if(this.props.currentQuiz){
        return(
        <div className="questioner">
            <h3>
                {this.props.whichQuiz+1}問目（ぜんぶで {this.props.quizs.length} 問）
            </h3>
            <div>
                {this.props.currentQuiz && this.props.currentQuiz.q}
                {this.props.wrong === true && <div className='shake'>x</div>}
            </div>
        </div>
        )
        }else{
            return(
                <div className="questioner">
                    <h3>もんだいをえらんでね！</h3>
                    <button onClick={() => this.props.onClick("tasizan1")}>たしざん１</button>
                </div>
                )
        }
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

interface GameProps {

}
interface GameStates {
    quizs: Quiz[],
    currentQuiz?: Quiz,
    whichQuiz: number,
    wrong?: boolean,
    startTime?: number,
    endTime?: number
}


class Game extends React.Component<GameProps, GameStates> {
    constructor(props: GameProps | Readonly<GameProps>) {
        super(props);

        // 答えが10までのたしざん
        let quizLevel1 = Array<Quiz>();
        for(let a = 0; a < 10; a++){
            for(let b = 0; b < 10; b++){
                quizLevel1.push({q:`${a} + ${b} =`, a:(a+b)})
            }
        }
        quizLevel1 = shuffle(quizLevel1.filter(quiz => quiz.a <= 10));

        //quizLevel1 = quizLevel1.slice(0,3);// テスト用に3問にする
        this.state = {
            quizs: quizLevel1,
            currentQuiz: undefined,
            whichQuiz: -1
        };
    }
    handleSelect(value: string) {
        if(this.state.currentQuiz){  
            this.setState(state => ({wrong:false}));
            if(this.state.currentQuiz.a === parseInt(value)) {
                    if(this.state.whichQuiz+1 === this.state.quizs.length){
                        this.setState(state => ({
                            currentQuiz: undefined,
                            whichQuiz: -1,
                            endTime: Date.now()
                        }));
                    }else{
                        this.setState(state => ({
                            currentQuiz: this.state.quizs[this.state.whichQuiz+1],
                            whichQuiz: this.state.whichQuiz + 1
                        }));
                    }
            }else{
                this.setState(state => ({wrong:true}));
            }
        }
    }
    handleStart(value: string){
        this.setState(state => ({
            currentQuiz: this.state.quizs[0],
            whichQuiz: 0,
            startTime: Date.now(),
            endTime: undefined
        }));
    }
    render() {

        return (
            <div className="game">
                <Questioner quizs={this.state.quizs} currentQuiz={this.state.currentQuiz} whichQuiz={this.state.whichQuiz} onClick={(value) => this.handleStart(value)} wrong={this.state.wrong}/>
                <div>　{this.state.endTime && (this.state.endTime - this.state.startTime!!)/1000 + "秒でできたよ。"}</div>
                <NumberSelector onClick={(value) => this.handleSelect(value)} />
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);



