# 快速开始指南

**5 分钟上手 OpenClaw Agent Router**

---

## 🎯 第一步：安装（2 分钟）

### 1.1 克隆项目

```bash
cd /home/z3129119/.openclaw/workspace
git clone https://github.com/YOUR_USERNAME/openclaw-agent-router.git
```

### 1.2 复制 Skills

```bash
cp -r openclaw-agent-router/skills/* ~/.openclaw/workspace/skills/
```

### 1.3 验证安装

```bash
ls ~/.openclaw/workspace/skills/ | grep -E "auto-agent-router|agent-scanner"
# 应该看到：
# auto-agent-router/
# agent-scanner/
```

---

## 🚀 第二步：配置（1 分钟）

### 2.1 更新 OpenClaw 配置

编辑 `~/.openclaw/openclaw.json`，在 `tools` 部分添加：

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

### 2.2 重启 OpenClaw（如果需要）

```bash
openclaw gateway restart
```

---

## 💡 第三步：测试（2 分钟）

### 3.1 测试自动调用

发送消息：
```
分析下次留为什么只有 30%
```

**预期结果**：
```
我正在调用 AI 数据分析师和 AI 数值策划，请稍等...
```

### 3.2 测试智能推荐

发送消息：
```
我想优化游戏的新手引导
```

**预期结果**：
```
这个任务我可以自己处理，但以下 Agent 可能更专业：

1. **AI 系统策划**（策划）
   负责系统设计、需求分析、文档撰写

2. **AI 关卡策划**（策划）
   负责关卡设计、节奏控制、数据驱动

3. **AI UX 设计师**（运营）
   负责交互设计、用户研究、原型设计

需要我调用哪个？
```

### 3.3 测试实时扫描

发送消息：
```
列出所有可用的策划 Agent
```

**预期结果**：
```
实时扫描 agents/ 文件夹，发现以下策划类 Agent：

1. AI 主策划
2. AI 数值策划
3. AI 系统策划
4. AI 关卡策划
...
```

---

## 📋 常见使用场景

### 场景 1：游戏设计

```
用户：设计一个宠物养成系统

自动调用：
- AI 主策划（统筹）
- AI 数值策划（成长数值）
- AI 系统策划（界面/功能）
```

### 场景 2：数据分析

```
用户：为什么付费率这么低？

自动调用：
- AI 数据分析师（数据分析）
- AI 变现设计师（付费设计）
- AI 数值策划（数值平衡）
```

### 场景 3：文章写作

```
用户：写一篇关于战斗系统的文章

自动调用：
- 编辑部 - 总编辑（把控方向）
- 编辑部 - 资深撰稿人（撰写正文）
- 编辑部 - 技术审核编辑（技术审查）
- 编辑部 - 文字编辑（语言打磨）
- 编辑部 - 终审官（发布决策）
```

### 场景 4：项目管理

```
用户：安排下个月的测试排期

自动调用：
- PMO 项目经理（排期协调）
- AI QA 主管（测试计划）
```

---

## 🔧 自定义配置

### 添加自动调用规则

在 `skills/auto-agent-router/SKILL.md` 中添加：

```markdown
| 新任务类型 | 自动调用 |
|-----------|---------|
| 你的关键词 | 你的 Agent |
```

### 修改推荐数量

编辑 `src/router.js`：
```javascript
const matched = matchAgents(task, agents, { 
  limit: 5  // 改为 3 或 10
});
```

### 调整缓存时间

编辑 `src/scanner.js`：
```javascript
this.cacheTTL = options.cacheTTL || 10 * 60 * 1000; // 改为 10 分钟
```

---

## ❓ 常见问题

### Q1: 为什么没有自动调用 Agent？

**A**: 检查任务是否包含自动调用关键词。如果不包含，会进入推荐模式。

### Q2: 新增的 Agent 为什么不生效？

**A**: 实时扫描会自动识别新 Agent。如果没生效，检查：
1. `agent.md` 文件格式是否正确
2. 文件夹是否在 `agents/` 下
3. 缓存是否过期（等待 5 分钟或重启）

### Q3: 如何禁用自动调用？

**A**: 在任务前加 "我自己处理：" 前缀，例如：
```
我自己处理：分析留存数据
```

### Q4: 如何查看路由日志？

**A**: 启用 verbose 模式：
```javascript
const router = new AgentRouter({ verbose: true });
```

---

## 📚 下一步

- [架构设计](./ARCHITECTURE.md) - 深入了解系统架构
- [API 文档](./API.md) - 完整 API 参考
- [使用示例](./EXAMPLES.md) - 更多实际案例

---

**需要帮助？**
- GitHub Issues: https://github.com/YOUR_USERNAME/openclaw-agent-router/issues
- 文档：https://github.com/YOUR_USERNAME/openclaw-agent-router/tree/main/docs

**最后更新**: 2026-04-05
