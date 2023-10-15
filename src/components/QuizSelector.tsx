import React from 'react';
import Quiz from '../domain/Quiz';
import { QuizBook, tasizan1, hikizan2, tasizan3, hikizan4 } from '../domain/QuizBook';

interface QuizButton {
    name: string,
    remarks?: string,
    color: string,
    quizCount?: number,
    quizBook: QuizBook
}

interface QuizSelectorProps {
    setQuizs: (quizs: Array<Quiz>) => void
}

export default class QuizSelector extends React.Component<QuizSelectorProps> {
    private quizButtons = Array<QuizButton>();
    constructor(props: QuizSelectorProps | Readonly<QuizSelectorProps>) {
        super(props);
        this.quizButtons.push({ name: "れんしゅう", remarks: "３もん", color:"#D8898A", quizBook: tasizan1, quizCount: 3 });
        this.quizButtons.push({ name: "たしざん１", remarks: "ぜんぶ", color:"#D8898A", quizBook: tasizan1 });
        this.quizButtons.push({ name: "ひきざん２", remarks: "５もん", color:"#84B7DC", quizBook: hikizan2, quizCount: 5 });
        this.quizButtons.push({ name: "ひきざん２", remarks: "ぜんぶ", color:"#84B7DC", quizBook: hikizan2 });
        this.quizButtons.push({ name: "たしざん３", remarks: "５もん", color:"#F8BA62", quizBook: tasizan3, quizCount: 5 });
        this.quizButtons.push({ name: "たしざん３", remarks: "ぜんぶ", color:"#F8BA62", quizBook: tasizan3 });
        this.quizButtons.push({ name: "ひきざん４", remarks: "５もん", color:"#86A884", quizBook: hikizan4, quizCount: 5 });
        this.quizButtons.push({ name: "ひきざん４", remarks: "ぜんぶ", color:"#86A884", quizBook: hikizan4 });
    }
    render() {
        return (
            <div className="questioner">
                <h5>もんだいをえらんでね！</h5>
                <div className='question-select'>
                    {this.quizButtons.map((quizButton, index) => {
                        return (
                            <div key={"question-select-item-" + index} className="question-select-item" style={{ backgroundColor: quizButton.color}}
                              onClick={() => this.props.setQuizs(quizButton.quizBook.quizs(quizButton.quizCount))}>
                                <div className="question-select-item-name">{quizButton.name}</div>
                                <div className="question-select-item-remarks">{quizButton.remarks}</div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        )
    }
}
