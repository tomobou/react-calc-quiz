# TODO.md

## 1. コンポーネントの型定義と修正
- [x] **Questioner コンポーネントの props に `wrongCount` を追加**
  - 現在 `Questioner` では `this.props.wrongCount` を参照しているが、`QuestionerProps` に定義がない。これを追加し、型チェックと実装を合わせる。

## 2. クラスコンポーネントのフック化
- [x] **Questioner, AnswerResultsView, QuizSelector** を関数コンポーネントへ変換
  - `React.Component` を `React.FC` で置き換え、`useState`, `useEffect` で状態管理。
  - ライフサイクルメソッドの代替を実装。

## 3. ユニットテストの拡張
- [x] **AnswerResultsView の `getGrade` 関数をテスト**
  - さまざまな入力に対して正しいグレードが返るか検証。
- [x] **AnswerResultsView のレンダリングテスト**
  - 正しい結果行が表示されるか、クリックで非表示になるかを確認。

## 4. ESLint/Prettier ルールの強化
- [x] **プロジェクト全体に `no-undef`、`no-unused-vars`** などのルールを追加
  - ルールを `.eslintrc.js` へ追加し、CI でチェック。

## 5. CI/CD の設定
- [x] **GitHub Actions ワークフローを追加** (`.github/workflows/ci.yml`)
  - npm install → lint → test → build のステップを実行。

## 6. ドキュメントの充実
- [x] **README.md を更新**
  - アプリの概要、セットアップ手順、デプロイ手順、テスト実行方法を明記。
  - 現在記載している内容を削除しないこと。ただし誤りの訂正はOK。

## 7. コード品質の向上
- [x] **console.log の削除**（例：`AnswerResultsView.tsx` のコメントアウトされたデバッグログ）
- [x] **重複コードの抽象化**（例：`Quiz` データ取得ロジックを共通 Hook にまとめる）

## 8. ユーザー体験の改善
- [x] **音声入力 UI のアクセシビリティ改善**
  - ボタンに `aria-pressed` を追加、キーボード操作をサポート。
- [x] **ラウンドタイム表示のフォーマット統一**（ミリ秒を小数点以下3桁で固定）

## 9. バグ修正
- [x] **音声入力ボタンの表示が`wrongCount`>0の場合に表示されるが、問題回答中常に表示されるのが正しい**

---
> **備考**
> - タスク開始時に`master`ブランチの最新を取得してから作業を開始してください。
> - すべてのタスクは `git` ブランチを切って作業し、テストと lint を通過したら PR を作成してレビューを依頼してください。
> - タスクの完了時はチェックボックスを `- [x]` に変更し、PR コメントで「完了」と報告してください。