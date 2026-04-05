# OpenClaw Agent Router 集成指南

**将 AGR 集成到 Main Agent，实现自动调用**

---

## 🎯 问题

**现状**：
- Main Agent（"main"）不自动调用其他 Agent
- 所有任务都自己处理
- 违背了创建 AGR 的初衷

**原因**：
- Main Agent 没有集成 AGR 的路由逻辑
- 没有任务类型判断
- 没有自动调用机制

---

## ✅ 解决方案

### 方案 A：在 Main Agent 中集成路由逻辑（推荐）

**修改位置**：`~/.openclaw/agents/main/agent/` 的提示词或系统配置

**添加路由规则**：
```markdown
## Agent 自动调用规则

接到任务后，先判断类型，自动调用对应 Agent：

### 自动调用条件（满足任一即调用）

| 任务类型 | 关键词 | 调用 Agent |
|----------|--------|-----------|
| 游戏设计 | 设计/玩法/系统/数值/战斗/抽卡/宠物 | AI 主策划 → 分发到专业策划 |
| 数据分析 | 留存/付费/CVR/ARPU/LTV/ 数据/分析 | AI 数据分析师 + AI 数值策划 |
| 项目管理 | 排期/进度/资源/外包/采购/项目 | PMO 项目经理 |
| 文章写作 | 文章/文档/周报/总结/分享/写作 | 编辑部协作系统 |
| 代码技术 | 代码/Bug/ 架构/技术/实现/程序 | AI 主程 |
| 美术 UX | 美术/UI/UX/界面/视觉/设计稿 | AI 主美 + UX 设计师 |
| 人力资源 | 招聘/绩效/薪酬/培训/员工/人力 | 人力资源部门 AI |
| 质量管理 | 测试/QA/ 质量/Bug | 质量部门 AI |
| 运营活动 | 活动/运营/用户/社区/市场 | 运营总监 + 用户运营 |

### 推荐机制（不满足自动调用条件时）

1. 评估任务复杂度
2. 实时扫描 agents/ 文件夹
3. 解析每个 Agent 的 agent.md
4. 智能匹配任务
5. 主动询问 + 推荐可能有帮助的 Agent
6. 用户确认后调用

**示例**：
```
用户："我想优化游戏的新手引导"

我："这个任务我可以自己处理，但以下 Agent 可能更专业：
     - AI 系统策划：专业设计新手流程
     - AI 关卡策划：设计新手关卡节奏
     - AI UX 设计师：优化新手引导体验
     需要我调用哪个？"
```

### 简单任务（自己处理，不调用）

- 日常对话（"你好"、"谢谢"）
- 简单查询（"今天天气如何"、"现在几点了"）
- 翻译任务
- 简单计算

### 复杂任务（必须调用）

- 游戏系统设计（>30 分钟工作量）
- 数据分析报告
- 完整文章写作
- 跨部门协调
```

---

### 方案 B：使用 AGR 的 router.js（技术实现）

**步骤**：

1. **在 Main Agent 中调用 AGR**

```javascript
const { AgentRouter } = require('/home/z3129119/.openclaw/workspace/openclaw-agent-router/src/router');

const router = new AgentRouter({
  scanner: {
    agentsDir: '/home/z3129119/.openclaw/workspace/agents',
    cacheTTL: 5 * 60 * 1000
  },
  verbose: true
});

// 处理任务
const result = await router.handleTask(task);

if (result.action === 'auto_call') {
  // 自动调用 Agent
  for (const agent of result.agents) {
    await sessions_spawn({
      agentId: agent.name,
      task: task,
      mode: 'run',
      runtime: 'subagent'
    });
  }
} else if (result.action === 'recommend') {
  // 推荐 Agent
  console.log(result.message);
} else {
  // 自己处理
  handleBySelf(task);
}
```

2. **修改 Main Agent 的回复逻辑**

在回复前，先调用 AGR 判断是否需要调用其他 Agent。

---

### 方案 C：配置层集成（最简单）

**修改**：`~/.openclaw/openclaw.json`

```json
{
  "agents": {
    "defaults": {
      "autoRoute": {
        "enabled": true,
        "routerPath": "/home/z3129119/.openclaw/workspace/openclaw-agent-router/src/router.js",
        "agentsDir": "/home/z3129119/.openclaw/workspace/agents",
        "rules": [
          {
            "name": "游戏设计",
            "keywords": ["设计", "玩法", "系统", "数值", "战斗", "抽卡", "宠物"],
            "category": "策划"
          },
          {
            "name": "数据分析",
            "keywords": ["留存", "付费", "cvr", "arpu", "ltv", "数据", "分析"],
            "category": "运营"
          }
          // ... 更多规则
        ]
      }
    }
  }
}
```

---

## 📋 实施步骤

### Step 1: 更新 AGR 文档

- [x] 创建 INTEGRATION-GUIDE.md
- [ ] 更新 README.md 添加集成说明
- [ ] 更新 QUICKSTART.md 添加 Main Agent 集成示例

### Step 2: 修改 Main Agent 提示词

- [ ] 编辑 `~/.openclaw/agents/main/agent/agent.md`
- [ ] 添加 Agent 自动调用规则
- [ ] 添加推荐机制说明

### Step 3: 测试

- [ ] 测试自动调用："设计一个抽卡系统"
- [ ] 测试智能推荐："我想优化新手引导"
- [ ] 测试简单任务："今天天气如何"

### Step 4: 更新 AGR 版本

- [ ] 更新 CHANGELOG.md
- [ ] 更新版本号到 v1.1.0
- [ ] 推送到 GitHub

---

## 🎯 预期效果

**之前**：
```
用户："写四个平台的发布帖"
→ Main Agent 自己写（没有调用编辑部）
```

**之后**：
```
用户："写四个平台的发布帖"
→ 判断：文章写作 → 自动调用编辑部协作系统
→ 编辑部 - 总编辑 → 选题策划 → 资深撰稿人 → 技术审核 → 文字编辑 → UX 编辑 → 终审官
→ 返回完整发布帖
```

---

## 📊 集成检查清单

| 检查项 | 状态 |
|--------|------|
| AGR 已安装 | ✅ |
| AGR 已测试 | ✅ |
| Main Agent 提示词已更新 | ❌ |
| 自动调用规则已添加 | ❌ |
| 推荐机制已添加 | ❌ |
| 测试通过 | ❌ |
| 版本已更新 | ❌ |
| GitHub 已推送 | ❌ |

---

**最后更新**: 2026-04-05
