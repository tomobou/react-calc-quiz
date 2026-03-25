import React from "react";
import { createRoot } from "react-dom/client";
import Quiz from "./domain/Quiz";
import { AnswerResult } from "./domain/AnswerResult";
import Questioner from "./components/Questioner";
import AnswerResultsView from "./components/AnswerResultsView";
import NumberSelector from "./components/NumberSelector";
import "./index.css";

interface GameProps {}

interface GameStates {
  quizs: Quiz[];
  results: AnswerResult[];
  currentQuiz?: Quiz;
  whichQuiz: number;
  wrongCount: number;
  startTime?: number;
  endTime?: number;
  voiceEnabled: boolean;
}

class Game extends React.Component<GameProps, GameStates> {
  constructor(props: GameProps | Readonly<GameProps>) {
    super(props);
    this.state = {
      quizs: [],
      results: [],
      currentQuiz: undefined,
      whichQuiz: -1,
      wrongCount: 0,
      voiceEnabled: true,
    };
  }
  handleSelect(value: string) {
    if (this.state.currentQuiz) {
      if (this.state.currentQuiz.a === parseInt(value)) {
        const correctAnswerTime = Date.now();
        const results = this.state.results;
        const answerStartTime =
          results.length > 0
            ? results[results.length - 1].endTime
            : this.state.startTime;
        results.push({
          quiz: this.state.currentQuiz,
          wrongCount: this.state.wrongCount,
          startTime: answerStartTime,
          endTime: correctAnswerTime,
        });
        if (this.state.whichQuiz + 1 === this.state.quizs.length) {
          this.setState({
            currentQuiz: undefined,
            results,
            whichQuiz: -1,
            endTime: Date.now(),
            wrongCount: 0,
          });
        } else {
          this.setState({
            currentQuiz: this.state.quizs[this.state.whichQuiz + 1],
            results,
            whichQuiz: this.state.whichQuiz + 1,
            wrongCount: 0,
          });
        }
      } else {
        this.setState({ wrongCount: this.state.wrongCount + 1 });
      }
    }
  }
  handleStart(quizs: Array<Quiz>) {
    this.setState({
      quizs,
      results: [],
      currentQuiz: quizs.length > 0 ? quizs[0] : undefined,
      whichQuiz: 0,
      startTime: Date.now(),
      endTime: undefined,
    });
  }

  toggleVoiceEnabled = () => {
    this.setState({ voiceEnabled: !this.state.voiceEnabled });
  };
  resetGame = () => {
    this.setState({
      quizs: [],
      results: [],
      currentQuiz: undefined,
      whichQuiz: -1,
      wrongCount: 0,
      startTime: undefined,
      endTime: undefined,
    });
  };

  render() {
    return (
      <div className="game">
        <Questioner
          quizs={this.state.quizs}
          currentQuiz={this.state.currentQuiz}
          whichQuiz={this.state.whichQuiz}
          wrongCount={this.state.wrongCount}
          voiceEnabled={this.state.voiceEnabled}
          onToggleVoice={this.toggleVoiceEnabled}
          setQuizs={(quizs) => this.handleStart(quizs)}
        />
        <NumberSelector
          onClick={(value: string) => this.handleSelect(value)}
          voiceEnabled={
            this.state.voiceEnabled && this.state.currentQuiz !== undefined
          }
          onToggleVoice={this.toggleVoiceEnabled}
        />
        {this.state.endTime && (
          <div onClick={this.resetGame} style={{ cursor: "pointer" }}>
            <AnswerResultsView results={this.state.results} />
            <button onClick={this.resetGame} style={{ marginTop: "10px" }}>
              再挑戦
            </button>
          </div>
        )}
      </div>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Game />);
