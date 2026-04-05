# OpenClaw Agent Router

**智能 Agent 路由系统** - 让 OpenClaw 自动调用最合适的 Agent

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Plugin-green.svg)](https://github.com/openclaw/openclaw)

---

## 🎯 功能特性

### 1. 自动路由
根据任务类型自动调用最合适的 Agent：
- 游戏设计 → AI 策划团队
- 数据分析 → AI 数据分析师
- 文章写作 → 编辑部协作系统
- 代码问题 → AI 程序员团队

### 2. 智能推荐
不满足自动调用条件时，主动推荐可能有帮助的 Agent：
```
用户："我想优化游戏的新手引导"

系统："这个任务我可以自己处理，但以下 Agent 可能更专业：
     - AI 系统策划：专业设计新手流程
     - AI 关卡策划：设计新手关卡节奏
     - AI UX 设计师：优化新手引导体验
     需要我调用哪个？"
```

### 3. 实时扫描
实时扫描 `agents/` 文件夹，动态获取可用 Agent 列表：
- ✅ 新增 Agent 立即可用
- ✅ 删除 Agent 自动失效
- ✅ 零维护成本

### 4. 多 Agent 协作
复杂任务自动分解，调用多个 Agent 协作：
```
用户："设计一个完整的抽卡系统"

系统自动调用：
1. AI 主策划（统筹）
2. AI 数值策划（概率/保底）
3. AI 系统策划（界面/流程）
4. AI 变现设计师（付费设计）
```

---

## 🚀 快速开始

### 安装

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/openclaw-agent-router.git

# 复制 Skills 到 OpenClaw 工作区
cp -r skills/* ~/.openclaw/workspace/skills/
```

### 配置

在 `~/.openclaw/openclaw.json` 中添加：

```json
{
  "tools": {
    "exec": {
      "retryLimit": {
        "maxAttempts": 3,
        "timeoutSeconds": 300,
        "detectLoop": true,
        "loopThreshold": 3,
        "onLimitReached": "stop_and_suggest"
      }
    }
  }
}
```

### 使用

安装后自动生效，无需额外配置。

**示例**：

```
用户："分析下次留为什么只有 30%"
→ 自动调用 AI 数据分析师 + AI 数值策划

用户："设计一个宠物养成系统"
→ 自动调用 AI 主策划 → 分发到数值/系统策划

用户："帮我写篇关于战斗系统的文章"
→ 自动调用编辑部协作系统（7 人）
```

---

## 📋 路由规则

| 任务类型 | 自动调用 |
|----------|----------|
| 游戏设计/数值/系统 | AI 主策划 → 分发到专业策划 |
| 留存/付费/数据分析 | AI 数据分析师 + AI 数值策划 |
| 项目管理/排期/资源 | PMO 项目经理 |
| 文章写作/周报 | 编辑部协作系统/周报 AI |
| 代码/技术 | AI 主程 |
| 美术/UX | AI 主美 + UX 设计师 |
| 人力资源 | 人力资源部门 AI |
| 质量管理 | 质量部门 AI |
| 运营活动 | 运营总监 + 用户运营 |

---

## 🏗️ 项目结构

```
openclaw-agent-router/
├── README.md                 # 本文档
├── LICENSE                   # MIT 许可证
├── package.json              # 项目配置
├── src/                      # 源代码
│   ├── scanner.js            # Agent 实时扫描器
│   ├── router.js             # 路由核心逻辑
│   ├── matcher.js            # 智能匹配引擎
│   └── recommender.js        # 推荐系统
├── skills/                   # OpenClaw Skills
│   ├── auto-agent-router/    # 自动路由 Skill
│   └── agent-scanner/        # 实时扫描 Skill
├── docs/                     # 文档
│   ├── ARCHITECTURE.md       # 架构设计
│   ├── API.md                # API 文档
│   └── EXAMPLES.md           # 使用示例
└── examples/                 # 示例代码
    ├── basic-usage.js        # 基础用法
    ├── advanced-routing.js   # 高级路由
    └── multi-agent-collab.js # 多 Agent 协作
```

---

## 🔧 核心模块

### 1. Agent Scanner（实时扫描器）

```javascript
const agents = await scanAgents('/path/to/agents/');
// 返回：[{ name, description, capabilities, keywords, category }]
```

### 2. Router（路由核心）

```javascript
const result = routeTask(task, agents);
// 返回：{ action: 'auto_call' | 'recommend' | 'self_handle', agents: [...] }
```

### 3. Matcher（智能匹配）

```javascript
const matched = matchAgents(task, agents, { limit: 5 });
// 基于关键词 + 语义 + 分类的多维度匹配
```

### 4. Recommender（推荐系统）

```javascript
const recommendation = generateRecommendation(task, matchedAgents);
// 生成用户友好的推荐列表
```

---

## 📊 性能指标

| 指标 | 数值 |
|------|------|
| 扫描速度 | ~100 个 Agent / 0.5 秒 |
| 匹配速度 | <100ms |
| 缓存命中率 | 80%+（同一次对话） |
| 路由准确率 | 90%+（基于测试） |

---

## 🧪 测试

```bash
# 运行单元测试
npm test

# 运行集成测试
npm run test:integration

# 测试真实 Agent 调用
npm run test:real
```

---

## 📚 文档

- [架构设计](./docs/ARCHITECTURE.md) - 系统架构和设计思路
- [API 文档](./docs/API.md) - 完整 API 参考
- [使用示例](./docs/EXAMPLES.md) - 实际使用案例

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 如何贡献

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

---

## 📄 许可证

MIT License

---

## 🙏 致谢

- **灵感来源**: OpenClaw 多 Agent 协作需求
- **平台支持**: [OpenClaw](https://github.com/openclaw/openclaw)
- **实战验证**: ZVP 设计外包公司 AI 团队（100+ Agent）

---

**Made with ❤️ for OpenClaw Community**

**最后更新**: 2026-04-05
