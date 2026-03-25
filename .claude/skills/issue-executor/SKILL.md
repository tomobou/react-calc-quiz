---
name: issue-executor
description: execute issue, ISSUE実施 
---

# ISSUE Executor

- 開発の準備としてmasterブランチの最新を取得します。
- `gh issue list --state open --limit 1`を確認し、取得できたissueの対応を行います。issueを取得できなかった場合はissueはありませんでしたと回答して完了とします。
- 対応内容に沿ったブランチを作成し、内容の修正を行い、コミットして、PRを作成します。
- 内容の修正時にテストも合わせて修正し、テストが通ることを確認してください。
- PRを作成した旨とPRのURLを連絡して作業完了とします。
