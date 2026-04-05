# AGR 自动安装 Skill

**触发条件**：用户发送 AGR 的 GitHub 链接

**功能**：自动下载并安装 OpenClaw Agent Router

---

## 🎯 触发规则

当用户消息包含以下任一关键词时触发：

1. GitHub 链接：`https://github.com/JingWang-Star996/openclaw-agent-router`
2. 安装请求："安装 AGR"、"安装 Agent Router"、"帮我安装"
3. 链接 + 请求：任何包含 GitHub 链接的消息

---

## 🔧 安装流程

### Step 1: 克隆项目

```bash
cd /home/z3129119/.openclaw/workspace
git clone https://github.com/JingWang-Star996/openclaw-agent-router.git
```

### Step 2: 运行一键安装脚本

```bash
cd /home/z3129119/.openclaw/workspace/openclaw-agent-router
chmod +x scripts/one-click-install.sh
./scripts/one-click-install.sh
```

### Step 3: 验证安装

检查以下项目：
- ✅ `~/.openclaw/workspace/skills/auto-agent-router/` 存在
- ✅ `~/.openclaw/workspace/skills/agent-scanner/` 存在
- ✅ `~/.openclaw/workspace/SOUL.md` 包含"Agent 自动调用规则"

### Step 4: 汇报用户

```
✅ OpenClaw Agent Router 已安装完成！

安装内容：
1. ✅ auto-agent-router Skill
2. ✅ agent-scanner Skill
3. ✅ SOUL.md 已更新（添加自动调用规则）

现在可以测试自动调用：
- "写四个平台的发布帖" → 自动调用编辑部
- "设计一个抽卡系统" → 自动调用 AI 策划团队
- "分析下次留为什么 30%" → 自动调用 AI 数据分析师

查看详细文档：
- GitHub: https://github.com/JingWang-Star996/openclaw-agent-router
- 多语言文档：README.md (中文), README.en.md (English), README.ja.md (日本語) 等
```

---

## 📋 错误处理

### 错误 1：Git 未安装

```bash
# 检测 git 是否可用
if ! command -v git &> /dev/null; then
    echo "❌ Git 未安装，请先安装 Git"
    # 提供安装指南
fi
```

### 错误 2：网络问题

```bash
# 克隆失败时重试
for i in {1..3}; do
    git clone ... && break || echo "重试 $i/3..."
done
```

### 错误 3：权限问题

```bash
# 使用 sudo 如果需要
sudo ./scripts/one-click-install.sh
```

---

## 💬 用户对话示例

### 示例 1：发送链接

```
用户：https://github.com/JingWang-Star996/openclaw-agent-router

AI: 收到！我正在为您自动安装 OpenClaw Agent Router...

[执行安装脚本]

✅ 安装完成！

现在您可以：
- "写四个平台的发布帖" → 自动调用编辑部
- "设计一个抽卡系统" → 自动调用 AI 策划团队
- "分析下次留为什么 30%" → 自动调用 AI 数据分析师

无需任何配置，直接开始使用！
```

### 示例 2：请求安装

```
用户：帮我安装 AGR

AI: 好的！我正在从 GitHub 下载并安装 OpenClaw Agent Router...

[执行安装脚本]

✅ 安装完成！自动调用规则已生效。

测试一下：
"写个文章" → 会自动调用编辑部协作系统
```

### 示例 3：已安装

```
用户：https://github.com/JingWang-Star996/openclaw-agent-router

AI: 检测到 OpenClaw Agent Router 已安装！

✅ auto-agent-router Skill 已存在
✅ SOUL.md 已包含自动调用规则

无需重新安装，直接开始使用！

测试命令：
"写四个平台的发布帖"
```

---

## 🔒 安全说明

**安装脚本保证**：
- ✅ 不覆盖用户原有文件（增量注入 SOUL.md）
- ✅ 不修改用户配置
- ✅ 只添加 Skills 和自动调用规则
- ✅ 可验证、可回滚

**回滚方法**：
```bash
# 删除 Skills
rm -rf ~/.openclaw/workspace/skills/auto-agent-router
rm -rf ~/.openclaw/workspace/skills/agent-scanner

# 恢复 SOUL.md（如果有备份）
mv ~/.openclaw/workspace/SOUL.md.bak ~/.openclaw/workspace/SOUL.md
```

---

## 🌍 多语言支持

根据用户语言自动切换回复：

| 用户语言 | AI 回复 |
|---------|--------|
| 中文 | 中文回复 |
| English | English reply |
| 日本語 | 日本語で返信 |
| 한국어 | 한국어로 답변 |
| Français | Réponse en français |
| Español | Respuesta en español |

---

**优先级**: 最高（用户发送链接即自动触发）
