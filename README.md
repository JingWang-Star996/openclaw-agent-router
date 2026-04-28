# ⚠️ Archived — openclaw-agent-router

> **This project is archived.** Superseded by OpenClaw native multi-agent support.

## Why Archived

OpenClaw's native capabilities now cover all functionality this project provided:

| Agent Router Feature | OpenClaw Native Replacement |
|---|---|
| Scan `agents/` folder | `<available_skills>` auto-injection at startup |
| Keyword-based routing | LLM semantic matching via skill descriptions |
| Return spawn instructions | Direct `sessions_spawn` from main session |
| Department routing | `data/context-isolation/routing-rules.md` |
| Team building | Manual spawn of multiple sub-agents |
| Auto-call rules | SOUL.md / AGENTS.md commander-mode rules |

**Core insight**: Agent Router solved "how to do multi-agent collaboration when OpenClaw doesn't support it." That problem no longer exists.

## What Remains Valuable

- **Multi-language READMEs** (en/ja/ko/fr/es) — reference for future project documentation
- **`src/matcher.js`** — multi-dimensional scoring (keyword + semantic + category) as a deterministic matching reference

## Original Project

This project was created on 2026-04-05 as an intelligent agent routing system for OpenClaw, featuring:
- Real-time agent scanning
- Department-based routing
- Multi-agent team building
- Zero-config installation

It served its purpose well during the transition from single-agent to native multi-agent workflows.

---

**Last Updated**: 2026-04-28
**Status**: ⚠️ Archived
