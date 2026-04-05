# 零配置安装指南

**面向小白用户：只需发送链接，AI 自动完成所有操作！**

---

## 🎯 安装方式对比

| 安装方式 | 用户需要做什么 | 适合人群 |
|----------|--------------|---------|
| **零配置安装** | 发送 GitHub 链接给 AI | 小白用户 ✅ |
| 手动安装 | 执行 3-4 个命令 | 开发者 |

---

## 🚀 零配置安装（推荐）

### 步骤 1：复制链接

```text
https://github.com/JingWang-Star996/openclaw-agent-router
```

### 步骤 2：发送给您的 OpenClaw AI

在飞书/微信/或其他聊天工具中，发送链接给您的 AI 助手。

### 步骤 3：AI 自动完成

AI 会自动执行以下操作：

```
✅ 检测链接 → 
✅ 克隆项目 → 
✅ 运行安装脚本 → 
✅ 配置 SOUL.md → 
✅ 验证安装 → 
✅ 汇报结果
```

### 步骤 4：开始使用

AI 会告诉您：

```
✅ OpenClaw Agent Router 已安装完成！

现在可以测试自动调用：
- "写四个平台的发布帖" → 自动调用编辑部
- "设计一个抽卡系统" → 自动调用 AI 策划团队
- "分析下次留为什么 30%" → 自动调用 AI 数据分析师
```

**完成！无需任何手动操作！** 🎉

---

## 📋 详细流程

### AI 内部执行的操作

**1. 检测链接**
```
识别到用户发送了 AGR GitHub 链接
→ 触发自动安装流程
```

**2. 克隆项目**
```bash
cd /home/z3129119/.openclaw/workspace
git clone https://github.com/JingWang-Star996/openclaw-agent-router.git
```

**3. 运行安装脚本**
```bash
cd openclaw-agent-router
chmod +x scripts/one-click-install.sh
./scripts/one-click-install.sh
```

**4. 安装脚本自动完成**
```
✅ 复制 Skills 到工作区
✅ 检查 SOUL.md
   - 不存在 → 创建完整文件
   - 存在但无规则 → 增量注入规则
   - 已有规则 → 跳过
✅ 验证安装
✅ 输出安装报告
```

**5. 汇报用户**
```
✅ 安装完成！

安装内容：
1. ✅ auto-agent-router Skill
2. ✅ agent-scanner Skill  
3. ✅ SOUL.md 已更新（添加自动调用规则）

现在可以直接使用！
```

---

## 🔒 安全保证

**安装过程保证**：
- ✅ 不覆盖用户原有文件（增量注入 SOUL.md）
- ✅ 不修改用户配置
- ✅ 只添加 Skills 和自动调用规则
- ✅ 可验证、可回滚

**SOUL.md 处理方式**：
- **不存在** → 创建完整文件（包含规则）
- **存在但无规则** → 增量注入（在文件开头插入，保留所有原有内容）
- **已有规则** → 跳过（避免重复）

---

## ❓ 常见问题

### Q1: 我需要安装 Git 吗？

**A**: 如果您的 OpenClaw AI 已经配置好 Git，则不需要。AI 会自动使用内置的 Git。

如果 Git 未安装，AI 会提示您：
```
❌ Git 未安装，请先安装 Git

安装指南：
- macOS: brew install git
- Linux: sudo apt-get install git
- Windows: 下载 https://git-scm.com/download/win
```

### Q2: 安装需要多长时间？

**A**: 通常 10-30 秒，取决于网络速度。

### Q3: 安装失败怎么办？

**A**: AI 会自动重试 3 次。如果仍然失败，会提供详细的错误信息和解决方案。

### Q4: 我可以手动安装吗？

**A**: 可以！如果您喜欢手动控制：

```bash
# 克隆项目
git clone https://github.com/JingWang-Star996/openclaw-agent-router.git

# 运行一键安装脚本
cd openclaw-agent-router
chmod +x scripts/one-click-install.sh
./scripts/one-click-install.sh
```

### Q5: 安装后可以卸载吗？

**A**: 可以！回滚方法：

```bash
# 删除 Skills
rm -rf ~/.openclaw/workspace/skills/auto-agent-router
rm -rf ~/.openclaw/workspace/skills/agent-scanner

# 恢复 SOUL.md（如果有备份）
mv ~/.openclaw/workspace/SOUL.md.bak ~/.openclaw/workspace/SOUL.md
```

---

## 🌍 多语言支持

AI 会根据您的语言自动切换回复：

| 您使用的语言 | AI 回复语言 |
|-------------|-----------|
| 中文 | 中文 ✅ |
| English | English ✅ |
| 日本語 | 日本語 ✅ |
| 한국어 | 한국어 ✅ |
| Français | Français ✅ |
| Español | Español ✅ |

---

## 📞 需要帮助？

如果遇到任何问题：

1. **GitHub Issues**: https://github.com/JingWang-Star996/openclaw-agent-router/issues
2. **Discord**: https://discord.com/invite/clawd
3. **邮件**: 联系项目维护者

---

**最后更新**: 2026-04-05

**Made with ❤️ for OpenClaw Community**
