import React from 'react';
import Quiz from '../domain/Quiz';
import { QuizBook, tasizan1, hikizan2 } from '../domain/QuizBook';

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
        this.quizButtons.push({ name: "ひきざん２（１０もん）", quizBook: hikizan2, quizCount: 10 });
        this.quizButtons.push({ name: "ひきざん２（ぜんぶ）", quizBook: hikizan2 });
    }
    render() {
        return (
            <div className="questioner">
                <h3>もんだいをえらんでね！</h3>
                {this.quizButtons.map((quizButton) => {
                    return (
                        <div className="question-content">
                            <button onClick={() => this.props.setQuizs(quizButton.quizBook.quizs(quizButton.quizCount))}>{quizButton.name}</button>
                        </div>
                    )
                }
                )}
            </div>
        )
    }
}
