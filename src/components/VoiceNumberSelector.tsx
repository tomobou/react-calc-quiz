import React from "react";

interface VoiceNumberSelectorProps {
  onClick: (value: string) => void;
}

interface VoiceNumberSelectorState {
  isListening: boolean;
  recognizedText: string;
}

export default class VoiceNumberSelector extends React.Component<
  VoiceNumberSelectorProps,
  VoiceNumberSelectorState
> {
  private recognition: any = null;

  constructor(props: VoiceNumberSelectorProps) {
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
      this.recognition.continuous = true;
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
          // 認識完了後、次の入力に備えてテキストをクリア
          this.setState({ recognizedText: "" });
        }
      };

      this.recognition.onend = () => {
        // リスニング中の場合は自動的に再開
        if (this.state.isListening) {
          this.recognition.start();
        } else {
          this.setState({ isListening: false });
        }
      };

      this.recognition.onerror = (_event: any) => {
        /* Speech recognition error: */
        if (this.state.isListening) {
          // エラーが発生してもリスニング状態を保持して再開
          this.recognition.start();
        }
      };
    }
  }

  handleVoiceResult = (transcript: string) => {
    /* Voice recognition result: */

    // 認識結果から数字を抽出 - より長いキーワードから優先的にマッチング
    const sortedVoiceKeys = Object.keys(voiceToNumberMap).sort(
      (a, b) => b.length - a.length,
    );

    for (const voice of sortedVoiceKeys) {
      if (transcript.includes(voice)) {
        const number = voiceToNumberMap[voice];
        /* Matched voice to number */
        this.props.onClick(number);
        return;
      }
    }

    // マッチしなかった場合
    /* Could not convert voice to number: */
  };

  toggleVoiceInput = () => {
    if (this.recognition) {
      if (this.state.isListening) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
    } else {
      alert("音声認識がサポートされていません");
    }
  };

  render() {
    return (
      <div className="voice-input-container">
        <button
          className={`
            ${this.state.isListening ? "voice-enabled" : "voice-disabled"}
            `}
          onClick={this.toggleVoiceInput}
        >
          {this.state.isListening
            ? `🎤 リスニング中...  ${this.state.recognizedText}`
            : "🎤 音声入力 ON"}
        </button>
      </div>
    );
  }
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
