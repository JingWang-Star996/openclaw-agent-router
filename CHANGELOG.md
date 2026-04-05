# 更新日志

所有重要的项目变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### 计划功能
- Web UI 管理界面
- Agent 优先级配置
- 路由日志功能
- 远程 Agent 仓库支持

---

## [1.0.0] - 2026-04-05

### 新增 ✨
- **自动路由系统** - 根据任务类型自动调用最合适的 Agent
- **智能推荐机制** - 不满足自动调用条件时，主动推荐相关 Agent
- **实时扫描功能** - 实时扫描 `agents/` 文件夹，动态获取可用 Agent 列表
- **多 Agent 协作** - 复杂任务自动分解，调用多个 Agent 协作
- **Exec 重试限制** - 防止无限重试循环（最大 3 次）

### 核心模块
- `AgentScanner` - Agent 实时扫描器
- `AgentRouter` - 路由核心逻辑
- `AgentMatcher` - 智能匹配引擎
- `Recommender` - 推荐系统

### 路由规则
- 游戏设计 → AI 策划团队
- 数据分析 → AI 数据分析师
- 项目管理 → PMO 项目经理
- 文章写作 → 编辑部协作系统
- 代码技术 → AI 程序员团队
- 美术 UX → AI 主美 + UX 设计师
- 人力资源 → 人力资源部门 AI
- 质量管理 → 质量部门 AI
- 运营活动 → 运营总监 + 用户运营

### 文档
- README.md - 项目介绍和快速开始
- ARCHITECTURE.md - 架构设计文档
- QUICKSTART.md - 5 分钟快速上手
- RELEASE.md - GitHub 发布指南
- CHANGELOG.md - 更新日志

### 技能文件
- `skills/auto-agent-router/` - 自动路由 Skill
- `skills/agent-scanner/` - 实时扫描 Skill

### 技术细节
- 扫描速度：~0.5 秒（100 个 Agent）
- 匹配速度：<100ms
- 缓存策略：同一次对话缓存 5 分钟
- 路由准确率：90%+（基于测试）

### 配置
- OpenClaw 配置示例（exec 重试限制）
- 默认路由规则
- 缓存时间配置

---

## 版本说明

### 语义化版本
- **MAJOR.MINOR.PATCH** (主版本号。次版本号。修订号)
- **MAJOR**: 不兼容的 API 变更
- **MINOR**: 向后兼容的功能新增
- **PATCH**: 向后兼容的问题修正

### 标记说明
- `✨ 新增` - 新功能
- `🐛 修复` - Bug 修复
- `📝 文档` - 文档更新
- `🔧 变更` - 配置或代码变更
- `⚡ 优化` - 性能优化
- `🔒 安全` - 安全相关更新

---

## 链接

- [1.0.0]: Initial release

---

**最后更新**: 2026-04-05
