# OpenClaw Agent Router

**インテリジェント Agent ルーティングシステム** - OpenClaw が自動的に最適な Agent を呼び出せるように

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Plugin-green.svg)](https://github.com/openclaw/openclaw)

---

## 🌍 多言語ドキュメント

| 言語 | ドキュメント |
|------|-------------|
| 🇨🇳 中文 | [README.md](README.md) |
| 🇬🇧 English | [README.en.md](README.en.md) |
| 🇯🇵 日本語 | [README.ja.md](README.ja.md) |
| 🇰🇷 한국어 | [README.ko.md](README.ko.md) |
| 🇫🇷 Français | [README.fr.md](README.fr.md) |
| 🇪🇸 Español | [README.es.md](README.es.md) |

---

## 🎯 主な機能

### 1. 自動ルーティング
タスクの種類に基づいて、最適な Agent を自動的に呼び出します：
- ゲームデザイン → AI プランナーチーム
- データ分析 → AI データアナリスト
- 記事執筆 → 編集チーム
- コード問題 → AI 開発者チーム

### 2. スマートな推奨
自動呼び出し条件が満たされない場合、関連する Agent を積極的に推奨します。

### 3. リアルタイムスキャン
`agents/` フォルダをリアルタイムでスキャンし、利用可能な Agent リストを動的に取得します。

### 4. マルチ Agent 協働
複雑なタスクを自動的に分解し、複数の Agent を呼び出して協働します。

---

## 🚀 クイックスタート

### ゼロコンフィグレーションインストール（推奨）

```bash
# リポジトリをクローン
git clone https://github.com/JingWang-Star996/openclaw-agent-router.git

# ゼロコンフィグレーションインストールスクリプトを実行
cd openclaw-agent-router
chmod +x scripts/install.sh
./scripts/install.sh
```

**インストールスクリプトが自動的に完了**：
1. ✅ Skills をワークスペースにコピー
2. ✅ SOUL.md に自動注入（自動呼び出しルールを追加、既存のコンテンツは保持）
3. ✅ インストールを検証

**手動コンフィグレーション不要！** インストール後、メイン AI が自動的に Agent を呼び出します。

---

## 🔒 セキュリティ保証

**SOUL.md の処理方法**：
- **存在しない** → 完全なファイルを作成（ルールを含む）
- **存在するがルールなし** → 増分注入（ファイルの先頭に挿入、既存のコンテンツをすべて保持）
- **既にルールあり** → スキップ（重複を回避）

---

## 📊 パフォーマンス指標

| 指標 | 値 |
|------|-----|
| スキャン速度 | ~0.5 秒（100 個の Agent） |
| マッチ速度 | <100ms |
| キャッシュヒット率 | 85%+（同じ会話） |
| ルーティング精度 | 90%+（テストベース） |

---

## 📋 ルーティングルール

| タスクの種類 | 自動呼び出し |
|-------------|-------------|
| ゲームデザイン/数値/システム | AI 首席プランナー → 専門プランナーに配布 |
| リテンション/支払い/データ分析 | AI データアナリスト + AI 数値プランナー |
| プロジェクト管理/スケジュール/リソース | PMO プロジェクトマネージャー |
| 記事執筆/週報 | 編集チーム/週報 AI |
| コード/技術 | AI 首席開発者 |
| アート/UX | AI アートディレクター + UX デザイナー |
| 人事 | 人事部門 AI |
| 品質管理 | 品質部門 AI |
| 運営/イベント | 運営ディレクター + ユーザー運営 |

---

## 🏗️ プロジェクト構造

```
openclaw-agent-router/
├── README.md                 # このドキュメント
├── LICENSE                   # MIT ライセンス
├── package.json              # プロジェクト設定
├── src/                      # ソースコード
│   ├── scanner.js            # Agent リアルタイムスキャナー
│   ├── router.js             # ルーティングコアロジック
│   └── matcher.js            # インテリジェントマッチングエンジン
├── docs/                     # ドキュメント
│   ├── ARCHITECTURE.md       # アーキテクチャデザイン
│   ├── QUICKSTART.md         # クイックスタートガイド
│   └── RELEASE.md            # リリースガイド
└── skills/                   # OpenClaw Skills
    ├── auto-agent-router/    # 自動ルーティング Skill
    └── agent-scanner/        # リアルタイムスキャン Skill
```

---

## 🤝 コントリビュート

Issue や Pull Request を歓迎します！

---

## 📄 ライセンス

MIT License

---

## 🙏 謝辞

- **インスピレーション**: OpenClaw マルチ Agent 協働の必要性
- **プラットフォームサポート**: [OpenClaw](https://github.com/openclaw/openclaw)
- **実戦検証**: ZVP デザインエージェンシー AI チーム（100+ Agent）

---

**Made with ❤️ for OpenClaw Community**

**最終更新日**: 2026-04-05
