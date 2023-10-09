import React from 'react';
import Quiz from '../domain/Quiz';
import QuizSelector from '../components/QuizSelector';

interface QuestionerProps {
    quizs: Quiz[],
    currentQuiz?: Quiz,
    whichQuiz: number,
    setQuizs: (quizs: Quiz[]) => void
    wrongCount: number
}

export default class Questioner extends React.Component<QuestionerProps> {
    render() {
        if (this.props.currentQuiz) {
            return (
                <div className="questioner">
                    <h3>
                        {this.props.whichQuiz + 1}問目（ぜんぶで {this.props.quizs.length} 問）
                    </h3>
                    <div className="question-content">
                        {this.props.currentQuiz && this.props.currentQuiz.q}
                        {this.props.wrongCount > 0 && <div className='shake'>{"".padStart(this.props.wrongCount, "×")}</div>}
                    </div>
                </div>
            )
        } else {
            return (
                <QuizSelector setQuizs={(quizs) => this.props.setQuizs(quizs)}></QuizSelector>
            )
        }
    }
}
