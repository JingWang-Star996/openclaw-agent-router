# Agent 实时扫描 Skill

**创建时间**: 2026-04-05  
**目的**: 实时扫描 `agents/` 文件夹，动态获取可用 Agent 列表

---

## 🎯 核心功能

1. **实时扫描** - 每次需要推荐时扫描 `agents/` 文件夹
2. **解析 agent.md** - 提取 Agent 名称、职责、能力
3. **智能匹配** - 根据任务类型匹配最相关的 Agent
4. **缓存优化** - 同一次对话中缓存结果，避免重复扫描

---

## 🔧 实现逻辑

### 1. 扫描文件夹

```javascript
async function scanAgents() {
  const agentsDir = '/home/z3129119/.openclaw/workspace/agents/';
  
  // 读取所有子目录
  const dirs = await fs.readdir(agentsDir, { withFileTypes: true });
  const agentDirs = dirs.filter(d => d.isDirectory());
  
  // 解析每个 Agent
  const agents = [];
  for (const dir of agentDirs) {
    const agentInfo = await parseAgent(agentsDir, dir.name);
    if (agentInfo) {
      agents.push(agentInfo);
    }
  }
  
  return agents;
}
```

### 2. 解析 agent.md

```javascript
async function parseAgent(baseDir, agentName) {
  const agentPath = `${baseDir}/${agentName}/agent.md`;
  
  try {
    const content = await fs.readFile(agentPath, 'utf-8');
    
    // 提取关键信息
    const info = {
      name: agentName,
      path: agentPath,
      description: extractDescription(content),
      capabilities: extractCapabilities(content),
      keywords: extractKeywords(content),
      category: extractCategory(agentName)
    };
    
    return info;
  } catch (e) {
    console.warn(`无法读取 ${agentName} 的 agent.md`);
    return null;
  }
}
```

### 3. 提取描述（从 agent.md）

```javascript
function extractDescription(content) {
  // 匹配 "# XXX - 描述" 或 "**职责**: XXX"
  const patterns = [
    /^#\s+(.+?)\s*[-:]\s*(.+)$/m,  // # Agent 名称 - 描述
    /\*\*职责\*\*:\s*(.+?)$/m,      // **职责**: XXX
    /^>\s*(.+?)$/m                  // > 引用格式描述
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[2] || match[1];
    }
  }
  
  // 默认：返回第一行非标题内容
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
  return lines[0]?.substring(0, 100) || '未知职责';
}
```

### 4. 提取关键词

```javascript
function extractKeywords(content) {
  const keywords = [];
  
  // 从"核心能力"、"使用场景"等部分提取
  const sections = [
    /核心能力 [:：]\s*([\s\S]*?)(?=\n\n|\n#|$)/i,
    /使用场景 [:：]\s*([\s\S]*?)(?=\n\n|\n#|$)/i,
    /职责 [:：]\s*([\s\S]*?)(?=\n\n|\n#|$)/i
  ];
  
  for (const section of sections) {
    const match = content.match(section);
    if (match) {
      // 提取关键词（名词、动词）
      const text = match[1];
      const words = text.match(/[\u4e00-\u9fa5a-zA-Z]{2,}/g) || [];
      keywords.push(...words);
    }
  }
  
  // 去重
  return [...new Set(keywords)];
}
```

### 5. 智能匹配

```javascript
function matchAgents(task, agents, limit = 5) {
  const taskLower = task.toLowerCase();
  
  // 计算每个 Agent 的相关性分数
  const scored = agents.map(agent => {
    let score = 0;
    
    // 关键词匹配
    for (const keyword of agent.keywords) {
      if (taskLower.includes(keyword.toLowerCase())) {
        score += 10;
      }
    }
    
    // 描述匹配
    if (agent.description.toLowerCase().includes(taskLower)) {
      score += 20;
    }
    
    // 分类匹配
    const category = agent.category.toLowerCase();
    if (
      (taskLower.includes('设计') && category.includes('策划')) ||
      (taskLower.includes('代码') && category.includes('程序')) ||
      (taskLower.includes('美术') && category.includes('美术')) ||
      (taskLower.includes('数据') && category.includes('数据')) ||
      (taskLower.includes('项目') && category.includes('管理')) ||
      (taskLower.includes('文章') && category.includes('编辑'))
    ) {
      score += 15;
    }
    
    return { agent, score };
  });
  
  // 排序并返回 top N
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.agent);
}
```

### 6. 分类规则

```javascript
function extractCategory(agentName) {
  const categories = {
    '策划': ['策划', '主策划', '数值', '系统', '关卡', '剧情', '战斗', '经济', '活动'],
    '程序': ['程序', '主程', '客户端', '服务器', '技术', 'AI'],
    '美术': ['美术', '主美', '原画', '模型', '动作', '特效', 'UI'],
    '运营': ['运营', '数据', '产品', '市场', '社区', '用户', '商业化'],
    '管理': ['CEO', '制作人', '总监', '经理', '主管', 'PMO'],
    '编辑': ['编辑', '编辑部', '撰稿', '审核', '终审'],
    '人力': ['人力', 'HR', '招聘', '培训', '薪酬', '绩效', '员工'],
    '质量': ['质量', 'QA', '测试']
  };
  
  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      if (agentName.toLowerCase().includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  return '其他';
}
```

---

## 📋 使用示例

### 示例 1：扫描所有 Agent

```javascript
const agents = await scanAgents();
console.log(`发现 ${agents.length} 个 Agent`);
// 发现 107 个 Agent
```

### 示例 2：匹配任务

```javascript
const task = "分析下次留为什么只有 30%";
const matched = matchAgents(task, agents);

console.log(matched.map(a => ({
  name: a.name,
  description: a.description,
  category: a.category
})));

// 输出：
// [
//   { name: 'AI 数据分析师', description: '...', category: '运营' },
//   { name: 'AI 数值策划', description: '...', category: '策划' },
//   ...
// ]
```

### 示例 3：生成推荐列表

```javascript
function generateRecommendation(task, matchedAgents) {
  if (matchedAgents.length === 0) {
    return "这个任务我可以自己处理。";
  }
  
  let response = `这个任务我可以自己处理，但以下 Agent 可能更专业：\n\n`;
  
  matchedAgents.forEach((agent, i) => {
    response += `${i + 1}. **${agent.name}** (${agent.category})\n`;
    response += `   ${agent.description}\n\n`;
  });
  
  response += `需要我调用哪个？`;
  
  return response;
}
```

---

## 🚀 集成到路由系统

### 修改 auto-agent-router/SKILL.md

```javascript
// 在路由流程中添加
async function handleTask(task) {
  // 1. 判断是否满足自动调用条件
  if (shouldAutoCall(task)) {
    return autoCall(task);
  }
  
  // 2. 不满足条件，实时扫描并推荐
  const agents = await scanAgents();
  const matched = matchAgents(task, agents);
  
  if (matched.length > 0) {
    return generateRecommendation(task, matched);
  }
  
  // 3. 没有匹配，自己处理
  return handleBySelf(task);
}
```

---

## 📊 性能优化

### 缓存策略

```javascript
const cache = {
  agents: null,
  timestamp: 0,
  ttl: 5 * 60 * 1000  // 5 分钟
};

async function getCachedAgents() {
  const now = Date.now();
  
  // 缓存未过期
  if (cache.agents && now - cache.timestamp < cache.ttl) {
    return cache.agents;
  }
  
  // 刷新缓存
  cache.agents = await scanAgents();
  cache.timestamp = now;
  
  return cache.agents;
}
```

### 懒加载

```javascript
// 只在需要推荐时扫描，不是每次对话
let agentsCache = null;

async function getAgentsIfNeeded() {
  if (!agentsCache) {
    agentsCache = await scanAgents();
  }
  return agentsCache;
}
```

---

## 🎯 执行流程

```
接收任务
    ↓
判断：满足自动调用条件吗？
    ↓
┌───────────────────────────────────────┐
│ ✅ 满足            │ ❌ 不满足          │
├───────────────────────────────────────┤
│ 直接调用 Agent    │ 实时扫描 agents/  │
│                  │       ↓            │
│                  │ 解析 agent.md      │
│                  │       ↓            │
│                  │ 智能匹配           │
│                  │       ↓            │
│                  │ 生成推荐列表       │
└───────────────────────────────────────┘
    ↓
返回用户
```

---

## 📝 输出格式

### 推荐列表格式

```
这个任务我可以自己处理，但以下 Agent 可能更专业：

1. **AI 数据分析师**（运营）
   专业分析游戏数据，包括留存/付费/用户行为等

2. **AI 数值策划**（策划）
   负责数值建模、平衡性设计、付费数值设计

3. **AI 系统策划**（策划）
   负责系统设计、需求分析、文档撰写

需要我调用哪个？
```

---

## 🔒 错误处理

```javascript
// 1. agents/ 文件夹不存在
if (!fs.existsSync(agentsDir)) {
  console.warn('agents/ 文件夹不存在');
  return [];
}

// 2. agent.md 读取失败
try {
  const content = await fs.readFile(agentPath, 'utf-8');
} catch (e) {
  console.warn(`无法读取 ${agentName} 的 agent.md`);
  return { name: agentName, description: '未知职责', keywords: [] };
}

// 3. 扫描超时
const timeout = setTimeout(() => {
  console.warn('Agent 扫描超时，使用缓存');
}, 5000);
```

---

**优先级**: 高（用户要求实时扫描）
