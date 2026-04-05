#!/usr/bin/env node

/**
 * Agent Router - 智能路由核心
 * 
 * 功能：
 * 1. 判断任务是否满足自动调用条件
 * 2. 不满足条件时推荐相关 Agent
 * 3. 调用 sessions_spawn 执行 Agent
 */

const { AgentScanner } = require('./scanner');
const { matchAgents } = require('./matcher');

class AgentRouter {
  constructor(options = {}) {
    this.scanner = new AgentScanner(options.scanner);
    this.autoCallRules = options.autoCallRules || getDefaultRules();
    this.verbose = options.verbose || false;
  }

  /**
   * 处理任务
   */
  async handleTask(task) {
    const agents = await this.scanner.scan();
    
    // 1. 判断是否满足自动调用条件
    if (this._shouldAutoCall(task)) {
      return await this._autoCall(task, agents);
    }
    
    // 2. 不满足条件，评估任务复杂度并推荐
    const complexity = this._evaluateComplexity(task);
    
    if (complexity === 'simple') {
      return {
        action: 'self_handle',
        message: '这个任务我可以自己处理。',
        agents: []
      };
    }
    
    // 3. 中等/复杂任务，推荐 Agent
    const matched = matchAgents(task, agents, { limit: complexity === 'complex' ? 5 : 3 });
    
    if (matched.length > 0) {
      return {
        action: 'recommend',
        message: this._generateRecommendation(task, matched, complexity),
        agents: matched
      };
    }
    
    // 4. 没有匹配，自己处理
    return {
      action: 'self_handle',
      message: '这个任务我可以自己处理。',
      agents: []
    };
  }

  /**
   * 判断是否满足自动调用条件
   */
  _shouldAutoCall(task) {
    const taskLower = task.toLowerCase();
    
    for (const rule of this.autoCallRules) {
      for (const keyword of rule.keywords) {
        if (taskLower.includes(keyword.toLowerCase())) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * 评估任务复杂度
   */
  _evaluateComplexity(task) {
    // 简单任务特征
    const simplePatterns = [
      /天气/, /翻译/, /hello\s*world/, /你好/, /谢谢/,
      /几点了/, /日期/, /你是谁/
    ];
    
    for (const pattern of simplePatterns) {
      if (pattern.test(task)) {
        return 'simple';
      }
    }
    
    // 复杂任务特征
    const complexPatterns = [
      /设计.*系统/, /完整.*方案/, /多.*协作/, /分析.*原因/,
      /为什么.*这么.*\?/, /怎么.*提升/, /如何.*优化/
    ];
    
    for (const pattern of complexPatterns) {
      if (pattern.test(task)) {
        return 'complex';
      }
    }
    
    // 默认中等
    return 'medium';
  }

  /**
   * 自动生成推荐
   */
  _generateRecommendation(task, matched, complexity) {
    if (matched.length === 0) {
      return '这个任务我可以自己处理。';
    }
    
    let response = '这个任务我可以自己处理，但以下 Agent 可能更专业：\n\n';
    
    matched.forEach((agent, i) => {
      response += `${i + 1}. **${agent.name}**（${agent.category}）\n`;
      response += `   ${agent.description}\n\n`;
    });
    
    if (complexity === 'complex') {
      response += '这是复杂任务，建议调用多个 Agent 协作。需要我调用吗？';
    } else {
      response += '需要我调用哪个？';
    }
    
    return response;
  }

  /**
   * 自动调用 Agent
   */
  async _autoCall(task, agents) {
    const matched = matchAgents(task, agents, { limit: 5 });
    
    if (matched.length === 0) {
      return {
        action: 'self_handle',
        message: '未找到合适的 Agent，我将自己处理。',
        agents: []
      };
    }
    
    // 返回调用的 Agent 列表
    return {
      action: 'auto_call',
      message: `正在调用 ${matched.length} 个 Agent 处理任务...`,
      agents: matched
    };
  }
}

/**
 * 默认自动调用规则
 */
function getDefaultRules() {
  return [
    {
      name: '游戏设计',
      keywords: ['设计', '玩法', '系统', '数值', '战斗', '抽卡', '宠物', '养成'],
      category: '策划'
    },
    {
      name: '数据分析',
      keywords: ['留存', '付费', 'cvr', 'arpu', 'ltv', '数据', '分析'],
      category: '运营'
    },
    {
      name: '项目管理',
      keywords: ['排期', '进度', '资源', '外包', '采购', '项目'],
      category: '管理'
    },
    {
      name: '文章写作',
      keywords: ['文章', '文档', '周报', '总结', '分享', '写作'],
      category: '编辑'
    },
    {
      name: '代码技术',
      keywords: ['代码', 'bug', '架构', '技术', '实现', '程序'],
      category: '程序'
    },
    {
      name: '美术 UX',
      keywords: ['美术', 'ui', 'ux', '界面', '视觉', '设计稿'],
      category: '美术'
    },
    {
      name: '人力资源',
      keywords: ['招聘', '绩效', '薪酬', '培训', '员工', '人力'],
      category: '人力'
    },
    {
      name: '质量管理',
      keywords: ['测试', 'qa', '质量', 'bug'],
      category: '质量'
    },
    {
      name: '运营活动',
      keywords: ['活动', '运营', '用户', '社区', '市场'],
      category: '运营'
    }
  ];
}

// 导出
module.exports = { AgentRouter, getDefaultRules };

// CLI 模式
if (require.main === module) {
  (async () => {
    const router = new AgentRouter({ verbose: true });
    const task = process.argv[2] || '分析下次留为什么只有 30%';
    console.log(`\n任务：${task}\n`);
    const result = await router.handleTask(task);
    console.log(`动作：${result.action}`);
    console.log(`消息：${result.message}`);
    if (result.agents.length > 0) {
      console.log(`\n推荐 Agent:`);
      result.agents.forEach(a => console.log(`  - ${a.name} (${a.category})`));
    }
  })();
}
