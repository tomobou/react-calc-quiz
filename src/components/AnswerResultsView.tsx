import React from 'react';
import AnswerResult from '../domain/AnswerResult';

interface AnswerResultsViewProps {
    results: AnswerResult[]
}

export default class AnswerResultsView extends React.Component<AnswerResultsViewProps> {
    private totalLapTime = this.props.results.reduce((a, b) => a.endTime!! > b.endTime!! ? a : b).endTime!! - this.props.results.reduce((a, b) => a.startTime!! < b.startTime!! ? a : b).startTime!!;
    render() {
        const results = this.props.results.sort((a, b) => (a.wrongCount - b.wrongCount === 0) ? (a.endTime!! - a.startTime!!) - (b.endTime!! - b.startTime!!) : (a.wrongCount - b.wrongCount)).reverse();

        return (
            <div>
                <div>{this.totalLapTime / 1000}秒でできたよ。</div>
                <table className="answer-results-view">
                    <thead>
                        <th>問題</th>
                        <th>間違えた数</th>
                        <th>回答時間</th>
                    </thead>
                    <tbody>
                        {results.map((result) => {
                            const lapTime = (result.endTime!! - result.startTime!!);
                            const wrongCountResult = result.wrongCount > 0 ? "red" : "";
                            const lapTimeResult = lapTime <= 1200 ? "" : lapTime < 3000 ? "yellow" : "red";
                            return (
                                <tr>
                                    <td>{result.quiz.q}</td>
                                    <td className={['align-right', wrongCountResult].join(' ')}>{result.wrongCount}回</td>
                                    <td className={['align-right', lapTimeResult].join(' ')}>{(lapTime / 1000).toFixed(3)}秒</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
