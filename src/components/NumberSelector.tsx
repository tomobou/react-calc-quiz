import React from "react";

interface NumberSelectorProps {
  onClick: (value: string) => void;
}

interface NumberSelectorState {
  isListening: boolean;
  recognizedText: string;
}

const voiceToNumberMap: { [key: string]: string } = {
  ゼロ: "0",
  零: "0",
  おー: "0",
  おう: "0",
  "0": "0",
  一: "1",
  いち: "1",
  "1": "1",
  二: "2",
  に: "2",
  "2": "2",
  三: "3",
  さん: "3",
  "3": "3",
  四: "4",
  し: "4",
  よん: "4",
  "4": "4",
  五: "5",
  ご: "5",
  "5": "5",
  六: "6",
  ろく: "6",
  "6": "6",
  七: "7",
  しち: "7",
  なな: "7",
  "7": "7",
  八: "8",
  はち: "8",
  "8": "8",
  九: "9",
  きゅう: "9",
  く: "9",
  "9": "9",
  十: "10",
  じゅう: "10",
  "10": "10",
  十一: "11",
  じゅういち: "11",
  "11": "11",
  十二: "12",
  じゅうに: "12",
  "12": "12",
  十三: "13",
  じゅうさん: "13",
  "13": "13",
  十四: "14",
  じゅうし: "14",
  じゅうよん: "14",
  "14": "14",
  十五: "15",
  じゅうご: "15",
  "15": "15",
  十六: "16",
  じゅうろく: "16",
  "16": "16",
  十七: "17",
  じゅうしち: "17",
  じゅうなな: "17",
  "17": "17",
  十八: "18",
  じゅうはち: "18",
  "18": "18",
  十九: "19",
  じゅうきゅう: "19",
  "19": "19",
  二十: "20",
  にじゅう: "20",
  "20": "20",
};

export default class NumberSelector extends React.Component<
  NumberSelectorProps,
  NumberSelectorState
> {
  private recognition: any = null;

  constructor(props: NumberSelectorProps) {
    super(props);
    this.state = {
      isListening: false,
      recognizedText: "",
    };

    // Web Speech API の初期化
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "ja-JP";
      this.recognition.continuous = false;
      this.recognition.interimResults = true;

      this.recognition.onstart = () => {
        this.setState({ isListening: true, recognizedText: "" });
      };

      this.recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        this.setState({ recognizedText: transcript });

        if (event.results[event.results.length - 1].isFinal) {
          this.handleVoiceResult(transcript);
        }
      };

      this.recognition.onend = () => {
        this.setState({ isListening: false });
      };

      this.recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        this.setState({ isListening: false });
      };
    }
  }

  handleVoiceResult = (transcript: string) => {
    // 認識結果から数字を抽出
    for (const [voice, number] of Object.entries(voiceToNumberMap)) {
      if (transcript.includes(voice)) {
        this.props.onClick(number);
        return;
      }
    }
    // マッチしなかった場合
    console.warn(`Could not convert voice to number: ${transcript}`);
  };

  toggleVoiceInput = () => {
    if (this.recognition) {
      if (this.state.isListening) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
    } else {
      alert("お使いのブラウザでは音声認識がサポートされていません");
    }
  };

  render() {
    let allValues = [...Array(21)].map((_, i) => i.toString());
    let numberTables = Array<Array<string>>();
    let a = 0;
    let b = 0;
    numberTables[a] = [];
    for (let i = 0; i < allValues.length; i++) {
      numberTables[a][b] = allValues[i];
      b++;
      if (parseInt(allValues[i]) % 5 === 0) {
        a++;
        numberTables[a] = [];
        b = 0;
      }
    }
    return (
      <div className="number-selector">
        <div className="voice-input-container">
          <button
            className={`voice-input-button ${
              this.state.isListening ? "listening" : ""
            }`}
            onClick={this.toggleVoiceInput}
          >
            {this.state.isListening ? "🎤 リスニング中..." : "🎤 音声入力"}
          </button>
          {this.state.recognizedText && (
            <div className="recognized-text">
              認識中: {this.state.recognizedText}
            </div>
          )}
        </div>
        {numberTables.map((values, index) => {
          return (
            <div
              key={"number-selector-row-" + index}
              className="number-selector-row"
            >
              {values.map((value) => {
                return (
                  <button
                    key={"number-selector-item" + value}
                    className="number-selector-item"
                    onClick={() => this.props.onClick(value)}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
