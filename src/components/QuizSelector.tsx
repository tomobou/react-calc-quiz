import React from 'react';
import Quiz from '../domain/Quiz';
import { QuizBook, tasizan1, hikizan2, tasizan3, hikizan4 } from '../domain/QuizBook';

interface QuizButton {
    name: string,
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
        this.quizButtons.push({ name: "れんしゅう", quizBook: tasizan1, quizCount: 3 });
        this.quizButtons.push({ name: "たしざん１（ぜんぶ）", quizBook: tasizan1 });
        this.quizButtons.push({ name: "ひきざん２（５もん）", quizBook: hikizan2, quizCount: 5 });
        this.quizButtons.push({ name: "ひきざん２（ぜんぶ）", quizBook: hikizan2 });
        this.quizButtons.push({ name: "たしざん３（５もん）", quizBook: tasizan3, quizCount: 5 });
        this.quizButtons.push({ name: "たしざん３（ぜんぶ）", quizBook: tasizan3 });
        this.quizButtons.push({ name: "ひきざん４（５もん）", quizBook: hikizan4, quizCount: 5 });
        this.quizButtons.push({ name: "ひきざん４（ぜんぶ）", quizBook: hikizan4 });
    }
    render() {
        return (
            <div className="questioner">
                <h5>もんだいをえらんでね！</h5>
                <div className='question-select'>
                    {this.quizButtons.map((quizButton, index) => {
                        return (
                            <div key={"question-select-content-" + index} className="question-select-content">
                                <button className="question-select-button" onClick={() => this.props.setQuizs(quizButton.quizBook.quizs(quizButton.quizCount))}>{quizButton.name}</button>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        )
    }
}
