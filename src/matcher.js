#!/usr/bin/env node

/**
 * Agent Matcher - 智能匹配引擎
 * 
 * 功能：
 * 1. 基于关键词匹配
 * 2. 基于语义匹配
 * 3. 基于分类匹配
 * 4. 返回相关性评分
 */

/**
 * 匹配 Agent
 * @param {string} task - 任务描述
 * @param {Array} agents - Agent 列表
 * @param {Object} options - 配置
 * @returns {Array} 匹配的 Agent（按相关性排序）
 */
function matchAgents(task, agents, options = {}) {
  const limit = options.limit || 5;
  const taskLower = task.toLowerCase();
  
  // 计算每个 Agent 的相关性分数
  const scored = agents.map(agent => {
    let score = 0;
    const reasons = [];
    
    // 1. 关键词匹配（权重：10 分/词）
    for (const keyword of agent.keywords) {
      if (taskLower.includes(keyword.toLowerCase())) {
        score += 10;
        reasons.push(`关键词匹配：${keyword}`);
      }
    }
    
    // 2. 描述匹配（权重：20 分）
    if (agent.description.toLowerCase().includes(taskLower)) {
      score += 20;
      reasons.push('描述完全匹配');
    }
    
    // 3. 分类匹配（权重：15 分）
    const categoryMatch = matchCategory(task, agent.category);
    if (categoryMatch) {
      score += 15;
      reasons.push(`分类匹配：${agent.category}`);
    }
    
    // 4. 能力匹配（权重：5 分/能力）
    for (const capability of agent.capabilities) {
      if (taskLower.includes(capability.toLowerCase())) {
        score += 5;
        reasons.push(`能力匹配：${capability}`);
      }
    }
    
    return { agent, score, reasons };
  });
  
  // 过滤并排序
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => ({ ...s.agent, score: s.score, reasons: s.reasons }));
}

/**
 * 匹配分类
 */
function matchCategory(task, category) {
  const taskLower = task.toLowerCase();
  
  const categoryKeywords = {
    '策划': ['设计', '玩法', '系统', '数值', '战斗', '抽卡', '宠物', '养成', '关卡', '剧情', '经济', '活动'],
    '程序': ['代码', 'bug', '架构', '技术', '实现', '程序', '服务器', '客户端'],
    '美术': ['美术', 'ui', 'ux', '界面', '视觉', '设计稿', '原画', '模型', '动作', '特效'],
    '运营': ['运营', '数据', '分析', '产品', '市场', '社区', '用户', '商业化', '留存', '付费'],
    '管理': ['管理', '排期', '进度', '资源', '外包', '采购', '项目', '团队'],
    '编辑': ['文章', '文档', '周报', '总结', '分享', '写作', '编辑', '审核'],
    '人力': ['人力', '招聘', '绩效', '薪酬', '培训', '员工', 'hr'],
    '质量': ['测试', 'qa', '质量', 'bug'],
    '影视': ['纪录片', '导演', '摄像', '剪辑', '视频']
  };
  
  const keywords = categoryKeywords[category] || [];
  for (const keyword of keywords) {
    if (taskLower.includes(keyword.toLowerCase())) {
      return true;
    }
  }
  
  return false;
}

/**
 * 生成推荐文本
 */
function generateRecommendationText(task, matched) {
  if (matched.length === 0) {
    return '这个任务我可以自己处理。';
  }
  
  let text = '这个任务我可以自己处理，但以下 Agent 可能更专业：\n\n';
  
  matched.forEach((agent, i) => {
    text += `${i + 1}. **${agent.name}**（${agent.category}）\n`;
    text += `   ${agent.description}\n`;
    text += `   匹配度：${agent.score}分\n\n`;
  });
  
  text += '需要我调用哪个？';
  
  return text;
}

// 导出
module.exports = { matchAgents, matchCategory, generateRecommendationText };

// CLI 模式
if (require.main === module) {
  const { AgentScanner } = require('./scanner');
  
  (async () => {
    const scanner = new AgentScanner();
    const agents = await scanner.scan();
    
    const task = process.argv[2] || '分析下次留为什么只有 30%';
    console.log(`\n任务：${task}\n`);
    
    const matched = matchAgents(task, agents, { limit: 5 });
    
    console.log('匹配的 Agent:');
    matched.forEach((a, i) => {
      console.log(`\n${i + 1}. ${a.name} (${a.category}) - ${a.score}分`);
      console.log(`   职责：${a.description}`);
      console.log(`   原因：${a.reasons.join(', ')}`);
    });
  })();
}
