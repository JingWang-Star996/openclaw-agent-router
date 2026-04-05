#!/usr/bin/env node

/**
 * Agent Scanner - 实时扫描 agents/ 文件夹
 * 
 * 功能：
 * 1. 扫描 agents/ 文件夹下所有子目录
 * 2. 解析每个 Agent 的 agent.md 文件
 * 3. 提取名称、职责、核心能力、关键词
 * 4. 返回结构化 Agent 信息
 */

const fs = require('fs');
const path = require('path');

class AgentScanner {
  constructor(options = {}) {
    this.agentsDir = options.agentsDir || '/home/z3129119/.openclaw/workspace/agents';
    this.cache = null;
    this.cacheTimestamp = 0;
    this.cacheTTL = options.cacheTTL || 5 * 60 * 1000; // 5 分钟
  }

  /**
   * 扫描所有 Agent（带缓存）
   */
  async scan() {
    const now = Date.now();
    
    // 检查缓存是否有效
    if (this.cache && now - this.cacheTimestamp < this.cacheTTL) {
      return this.cache;
    }
    
    // 刷新缓存
    this.cache = await this._scanAll();
    this.cacheTimestamp = now;
    
    return this.cache;
  }

  /**
   * 强制刷新缓存
   */
  async refresh() {
    this.cache = null;
    this.cacheTimestamp = 0;
    return await this.scan();
  }

  /**
   * 扫描所有 Agent（不带缓存）
   */
  async _scanAll() {
    if (!fs.existsSync(this.agentsDir)) {
      console.warn(`agents/ 文件夹不存在：${this.agentsDir}`);
      return [];
    }

    const dirs = fs.readdirSync(this.agentsDir, { withFileTypes: true })
      .filter(d => d.isDirectory());

    const agents = [];
    for (const dir of dirs) {
      const agentInfo = await this._parseAgent(dir.name);
      if (agentInfo) {
        agents.push(agentInfo);
      }
    }

    console.log(`[AgentScanner] 扫描完成：${agents.length} 个 Agent`);
    return agents;
  }

  /**
   * 解析单个 Agent
   */
  async _parseAgent(agentName) {
    const agentPath = path.join(this.agentsDir, agentName, 'agent.md');
    
    try {
      const content = fs.readFileSync(agentPath, 'utf-8');
      
      return {
        name: agentName,
        path: agentPath,
        description: this._extractDescription(content),
        capabilities: this._extractCapabilities(content),
        keywords: this._extractKeywords(content),
        category: this._extractCategory(agentName),
        rawContent: content
      };
    } catch (e) {
      console.warn(`[AgentScanner] 无法读取 ${agentName} 的 agent.md: ${e.message}`);
      return null;
    }
  }

  /**
   * 提取描述
   */
  _extractDescription(content) {
    // 匹配 "# XXX - 描述" 或 "**职责**: XXX" 或 "**岗位**：XXX"
    const patterns = [
      /\*\*岗位\*\*[:：]\s*(.+?)$/m,
      /\*\*职责\*\*[:：]\s*(.+?)$/m,
      /^#\s+(.+?)\s*[-:：]\s*(.+?)$/m,
      />\s*(.+?)$/m
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return (match[2] || match[1]).trim().substring(0, 200);
      }
    }

    // 默认：返回第一行非标题内容
    const lines = content.split('\n')
      .filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('---'));
    return lines[0]?.substring(0, 200) || '未知职责';
  }

  /**
   * 提取核心能力
   */
  _extractCapabilities(content) {
    const capabilities = [];
    
    // 匹配 "### X. XXX 能力" 或 "- XXX 能力"
    const patterns = [
      /###\s*\d*\.?\s*(.+?能力 [^#\n]*)/g,
      /^-\s*(.+?能力 [^#\n]*)/gm
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        capabilities.push(match[1].trim());
      }
    }

    return capabilities.length > 0 ? capabilities : ['通用能力'];
  }

  /**
   * 提取关键词
   */
  _extractKeywords(content) {
    const keywords = new Set();
    
    // 从"核心能力"、"使用场景"、"职责"等部分提取
    const sections = [
      /核心能力 [:：]\s*([\s\S]*?)(?=\n\n|\n##|\n#|$)/i,
      /使用场景 [:：]\s*([\s\S]*?)(?=\n\n|\n##|\n#|$)/i,
      /职责 [:：]\s*([\s\S]*?)(?=\n\n|\n##|\n#|$)/i,
      /工作方式 [:：]\s*([\s\S]*?)(?=\n\n|\n##|\n#|$)/i
    ];

    for (const section of sections) {
      const match = content.match(section);
      if (match) {
        const text = match[1];
        // 提取中文名词/动词（2 字以上）
        const words = text.match(/[\u4e00-\u9fa5a-zA-Z]{2,}/g) || [];
        words.forEach(w => keywords.add(w));
      }
    }

    return Array.from(keywords);
  }

  /**
   * 提取分类
   */
  _extractCategory(agentName) {
    const categories = {
      '策划': ['策划', '主策划', '数值', '系统', '关卡', '剧情', '战斗', '经济', '活动'],
      '程序': ['程序', '主程', '客户端', '服务器', '技术', 'AI'],
      '美术': ['美术', '主美', '原画', '模型', '动作', '特效', 'UI'],
      '运营': ['运营', '数据', '产品', '市场', '社区', '用户', '商业化'],
      '管理': ['CEO', '制作人', '总监', '经理', '主管', 'PMO'],
      '编辑': ['编辑', '编辑部', '撰稿', '审核', '终审'],
      '人力': ['人力', 'HR', '招聘', '培训', '薪酬', '绩效', '员工'],
      '质量': ['质量', 'QA', '测试'],
      '影视': ['纪录片', '导演', '摄像', '剪辑']
    };

    const nameLower = agentName.toLowerCase();
    for (const [category, keywords] of Object.entries(categories)) {
      for (const keyword of keywords) {
        if (nameLower.includes(keyword.toLowerCase())) {
          return category;
        }
      }
    }

    return '其他';
  }
}

// 导出
module.exports = { AgentScanner };

// CLI 模式
if (require.main === module) {
  (async () => {
    const scanner = new AgentScanner();
    const agents = await scanner.scan();
    console.log('\n=== 发现的 Agent ===\n');
    agents.forEach(a => {
      console.log(`${a.name} (${a.category})`);
      console.log(`  职责：${a.description}`);
      console.log(`  关键词：${a.keywords.slice(0, 10).join(', ')}...`);
      console.log();
    });
  })();
}
