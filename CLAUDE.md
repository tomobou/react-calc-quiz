# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## よく使うコマンド
- **開発サーバ起動**: `npm start`（Viteでローカルサーバを立ち上げ、http://127.0.0.1:3000 で表示）
- **ビルド（本番用）**: `npm run build`（TypeScript をコンパイルし Vite でバンドル、出力先は `build/`）
- **Lint**: `npm run lint`（`src/` 配下の ESLint チェック）
- **Lint 修正**: `npm run lint:fix`
- **コード整形**: `npm run format`（Prettier を `src/` に適用）
- **整形チェック**: `npm run format:check`
- **ユニットテスト実行**: `npm test`（Jest で `src/` の TS/TSX を実行）
- **単一テストファイル実行**: `npm test -- path/to/test.tsx`
- **E2E テスト**: `npm run test:e2e`（Playwright）
- **E2E UI モード**: `npm run test:e2e:ui`
- **ビルド済みをサーブ**: `npm run serve`（Vite preview）
- **GitHub Pages へデプロイ**: `npm run deploy`（`gh-pages` ブランチへ `build/` をプッシュ）
- **デプロイ準備**: `npm run predeploy`（GitHub Pages 用にビルド）

## プロジェクト構成
- **src/** – アプリケーションコード
  - **components/** – React コンポーネント
  - **domain/** – TypeScript インターフェイスやドメインロジック（例：`Quiz`、`AnswerResult`）
  - **setupTests.ts** – Jest のセットアップファイル
  - **index.tsx** – エントリポイント（React アプリ）
- **public/** – 画像などの静的アセット（評価用画像）
- **vite.config.js** – Vite 設定（`mode === "github"` の場合 `base` が切り替わる）
- **jest.config.js** – Jest 設定
- **tsconfig.json** – TypeScript 設定
- **package.json** – 依存関係とスクリプト

## アーキテクチャ概要
- **QuizSelector** が静的な `Quiz` データを読み込み、質問リストを作成。
- **Questioner** が現在の質問を表示し、誤答数と時間を追跡。音声入力モードは `voiceEnabled` で切替可能。
- **AnswerResultsView** が結果を集計し、誤答率と平均ラップタイムから評価を算出し、グレード画像を表示。
- 時間計測は `AnswerResult` の `startTime` と `endTime` を使用。
- Vite + TypeScript で構築され、ESLint でコード品質を保つ。

## テスト戦略
- ユニットテストは `src/__tests__/` に配置。Jest でコンポーネント単体をテスト。
- E2E テストは Playwright を使用し、`npm run test:e2e` で実行。UI モードは `--ui` オプションで起動。

## デプロイ方法
1. `npm run predeploy` で GitHub Pages 用にビルド（`mode=github`）。
2. `npm run deploy` で `build/` を `gh-pages` ブランチへプッシュ。

## 便利情報
- `jest.config.js` の `testPathIgnorePatterns` は不要なテストファイルを除外。
- ESLint は `react-app` preset と `prettier` を組み合わせて使用。
- Node は 16.13.0、React は 19 をターゲット。
- ビルド後は `npm run serve` でローカルでプレビュー可能。

## 開発タスクのルール
Git を使った開発フロー（箇条書き）

  1. ローカルブランチ作成
  git checkout master
  git pull
  git checkout -b feature/〈説明〉
    - 既存ブランチの master から分岐させるため、masterの最新を取得してから作業を行う。ブランチ名は機能・修正内容を簡潔に示す（例: feature/add-voice-toggle）。
  2. コード変更
    - 必要なファイルを編集・追加。変更後に npm run lint:fix を実行し、コードを整形。
  3. 変更をステージ
  git add <変更ファイル>   # 必要ファイルを個別に追加
    - git add . は避け、意図しないファイルがステージされないようにする。
  4. コミット
  git commit -m "$(cat <<'EOF'
  add: voice toggle per question

  Co-Authored-By: Claude <noreply@anthropic.com>
  EOF
  )"
    - メッセージは「add / fix / update / refactor」などアクションを先頭にし、変更内容の簡潔な要約を記載。
    - 必要に応じて Co‑Authored‑By を追加。
  5. ローカルテスト・lint
  npm test
  npm run lint
    - すべてパスすることを確認。失敗した場合はステップ 2 に戻り、修正して再コミット。
  5. TODO.mdの更新
    - 実施したタスクについて実施済みとしてチェックしてコミットする。
  6. リモートへプッシュ
  git push -u origin feature/〈説明〉
    - -u で追跡設定を行い、以降は git push だけで更新可能。
  7. Pull Request（PR）作成
    - GitHub の UI か gh CLI で PR を作成。タイトルは 70文字以内で要約し、本文で実装内容・テスト結果・注意点を記述。
    - PR の本文に Co‑Authored‑By を入れ忘れないようにする。
  8. レビュー
    - 同僚にレビューを依頼し、コメントに対応。必要ならコミットを追加で作成。
  9. マージ
    - マージは人が行うため、マージ作業は実行しない。

  注意点
  - 変更前に必ず npm run lint:fix で整形し、テスト (npm test) を通過させる。
  - コミットメッセージは明確に書く。
  - PR では「概要」「実装詳細」「テスト結果」を本文に記載。
  - マージ前にレビューを必ず受け、承認を得ること。

## PR 作成ルール

## ブランチ作成・PR 自動化手順

以下のスクリプトとフローを利用すると、ブランチ作成から PR 作成までを 1 つのコマンドで実行できます。

1. **GitHub CLI の認証**
   ```bash
   gh auth login
   ```
2. **スクリプトの実行**（例: 新機能 `add-foo`）
   ```bash
   ./scripts/create_and_pr.sh feature/add-foo "add: new feature foo"
   ```
   このスクリプトは
   * `master` の最新を取得
   * 新ブランチを作成（既存ならスキップ）
   * 変更を全てステージ＆コミット
   * リモートへ push
   * PR を自動作成（`gh pr create --fill`）
3. **GitHub Actions**（任意）
   `feature/**` で始まるブランチが push されると、`auto-pr.yml` が自動で PR を作成します。

これにより、手動で `git push` → `gh pr create` を行う手間が省けます。
- PR 作成は必須です。変更を加えたブランチを GitHub にプッシュ後、PR を作成してください。
- PR テンプレート（`PULL_REQUEST_TEMPLATE.md`）に従い、以下の必須項目を記入してください。
  - Summary
  - Implementation Details
  - Test Plan
  - Notes
- テンプレートに沿わない PR はレビューで拒否します。